from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from fastapi.middleware.cors import CORSMiddleware
import os
import logging
import time
import threading
import requests


# Load environment variables
load_dotenv()

# Initialize logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Log environment variables
logger.info("CDP_API_KEY_NAME: %s", os.getenv("CDP_API_KEY_NAME"))
logger.info("CDP_API_KEY_PRIVATE_KEY: %s", os.getenv("CDP_API_KEY_PRIVATE_KEY"))
logger.info("OPENAI_API_KEY: %s", os.getenv("OPENAI_API_KEY"))
logger.info("NETWORK_ID: %s", os.getenv("NETWORK_ID"))

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent_executor = None
toolkit = None
autonomous_config = None
autonomous_thread = None
autonomous_running = False


class WalletInitRequest(BaseModel):
    wallet_data: str


class WalletCreationResponse(BaseModel):
    wallet_data: str


# Modify the initialize_agent function
def initialize_agent(cdp_wallet_data=None):
    """Initialize the agent with CDP Agentkit using optional provided wallet data."""
    # Initialize LLM
    llm = ChatOpenAI(model="gpt-4o-mini")

    # Configure CDP Agentkit Langchain Extension
    values = {"cdp_wallet_data": cdp_wallet_data} if cdp_wallet_data else {}
    agentkit = CdpAgentkitWrapper(**values)

    # Export and persist wallet data if desired
    updated_wallet_data = agentkit.export_wallet()
    with open("wallet_data.txt", "w") as f:
        f.write(updated_wallet_data)

    # Initialize CDP Agentkit Toolkit and get tools
    tkit = CdpToolkit.from_cdp_agentkit_wrapper(agentkit)
    tools = tkit.get_tools()
    logger.info("Available tools: %s", [tool.name for tool in tools])

    # Store buffered conversation history in memory
    memory = MemorySaver()

    # Ensure a unique thread_id is generated
    import uuid

    config = {
        "configurable": {
            "thread_id": str(uuid.uuid4()),  # Generate a unique thread ID
            "checkpoint_ns": "cdp_agent",  # Optional: add a namespace
        }
    }

    # Create ReAct Agent using LLM and CDP tools
    agent_exec = create_react_agent(
        llm,
        tools=tools,
        checkpointer=memory,
        # Remove the config argument
        state_modifier=(
            "You are a highly reliable and transparent agent for DeFi investments. You manage wallets, "
            "optimize yield, swap tokens, transfer assets, and provide insights to users while ensuring safety and efficiency. "
            "You are empowered to interact onchain using the Coinbase Developer Platform Agentkit. You handle transactions with precision, "
            "provide gas fee transparency, and guide users for failed transactions."
        ),
    )

    return agent_exec, tkit, config


@app.on_event("startup")
def startup_event():
    # If a wallet_data.txt exists, initialize with that, otherwise initialize empty
    cdp_wallet_data = None
    if os.path.exists("wallet_data.txt"):
        with open("wallet_data.txt", "r") as f:
            cdp_wallet_data = f.read()

    global agent_executor, toolkit, autonomous_config
    agent_executor, toolkit, autonomous_config = initialize_agent(
        cdp_wallet_data=cdp_wallet_data
    )


@app.get("/")
def read_root():
    return {"message": "Welcome to the DeFi AI Agent API!"}


@app.post("/create-wallet/", response_model=WalletCreationResponse)
def create_wallet():
    """Create a new wallet if user doesn't have one, and return its data."""
    try:
        # Instantiate without cdp_wallet_data to create a new wallet
        agentkit = CdpAgentkitWrapper()
        wallet_data = agentkit.export_wallet()
        return {"wallet_data": wallet_data}
    except Exception as e:
        logger.error("Error creating wallet: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/initialize-wallet/")
def initialize_wallet(payload: WalletInitRequest):
    """Initialize or re-initialize the agent with user-provided wallet data."""
    global agent_executor, toolkit, autonomous_config
    try:
        agent_executor, toolkit, autonomous_config = initialize_agent(
            cdp_wallet_data=payload.wallet_data
        )
        return {"status": "Wallet initialized successfully."}
    except Exception as e:
        logger.error("Error initializing wallet: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))


class ChatRequest(BaseModel):
    message: str


@app.post("/chat/")
async def chat(request: ChatRequest):
    """Handle chat interactions."""
    if not request.message:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    if agent_executor is None:
        raise HTTPException(
            status_code=400, detail="Agent not initialized with wallet yet."
        )
    try:
        response_chunks = []
        for chunk in agent_executor.stream(
            {"messages": [HumanMessage(content=request.message)]},
            config=autonomous_config,  # Pass config here
        ):
            logger.info("Chunk received: %s", chunk)
            if "agent" in chunk:
                response_chunks.append(chunk["agent"]["messages"][0].content)
        return {"response": " ".join(response_chunks)}
    except Exception as e:
        logger.error("Error during chat: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/autonomous-trading/start/")
def start_autonomous_trading():
    """Start the autonomous trading agent."""
    global autonomous_running, autonomous_thread

    if autonomous_running:
        raise HTTPException(
            status_code=400, detail="Autonomous trading is already running."
        )

    if agent_executor is None or autonomous_config is None:
        raise HTTPException(
            status_code=400, detail="Agent not initialized with wallet yet."
        )

    # def run_autonomous_mode():
    #     """Autonomous trading loop that only buys ETH when market is down and sells ETH when market is up."""
    #     global autonomous_running
    #     autonomous_running = True
    #     logger.info("Starting autonomous mode...")

    #     # Define target thresholds or logic
    #     # For example, threshold: if ETH < $1,000 -> BUY, if ETH > $1,500 -> SELL
    #     #  price feed tool. Here we assume the agent can use a tool to get price.
    #     buy_threshold = 1000
    #     sell_threshold = 1500

    #     try:
    #         while autonomous_running:
    #             # The prompt instructs the agent to:
    #             # 1. Fetch the current ETH price (assuming there's a tool for that, e.g. "get_current_price").
    #             # 2. If price < buy_threshold, buy ETH.
    #             # 3. If price > sell_threshold, sell ETH.
    #             # 4. Otherwise, hold.

    #             thought = (
    #                 f"Your goal: Only engage in actions related to buying or selling ETH based on market conditions.\n"
    #                 f"1. Use the tools available to get the current ETH price.\n"
    #                 f"2. If the price is below ${buy_threshold}, buy ETH.\n"
    #                 f"3. If the price is above ${sell_threshold}, sell ETH.\n"
    #                 f"4. If the price is between ${buy_threshold} and ${sell_threshold}, do nothing (hold) and wait.\n"
    #                 f"Do not deploy NFTs, tokens, or perform any other actions.\n"
    #                 f"Execute the appropriate action now."
    #             )

    #             # Send the prompt to the agent
    #             for chunk in agent_executor.stream(
    #                 {"messages": [HumanMessage(content=thought)]}, autonomous_config
    #             ):
    #                 if "agent" in chunk:
    #                     agent_response = chunk["agent"]["messages"][0].content
    #                     logger.info(agent_response)
    #                 elif "tools" in chunk:
    #                     tools_response = chunk["tools"]["messages"][0].content
    #                     logger.info(tools_response)

    #             # Wait some time before the next action
    #             time.sleep(30)
    #     except Exception as e:
    #         logger.error("Error during autonomous trading: %s", str(e))
    #     finally:
    #         autonomous_running = False
    #         logger.info("Autonomous trading stopped.")
    def run_autonomous_mode():
        global autonomous_running
        autonomous_running = True
        logger.info("Starting autonomous mode...")

        # Define thresholds
        buy_threshold = 1000
        sell_threshold = 1500

        try:
            while autonomous_running:
                # Directly fetch ETH price from Coingecko
                url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
                response = requests.get(url)
                if response.status_code == 200:
                    data = response.json()
                    current_price = data["ethereum"]["usd"]
                    logger.info(f"Current ETH Price: {current_price} USD")

                    # Decide based on thresholds
                    if current_price < buy_threshold:
                        logger.info("Price below threshold, buying ETH...")
                        # Insert your buy action code here using the agent's 'trade' tool if appropriate
                    elif current_price > sell_threshold:
                        logger.info("Price above threshold, selling ETH...")
                        logger.info(
                            "Apologies selling ETH is not supported on testnet, please switch to mainet..."
                        )

                    else:
                        logger.info("Price within hold range, no action taken.")
                else:
                    logger.error("Error fetching ETH price from Coingecko.")

                # Wait before next check
                time.sleep(30)
        except Exception as e:
            logger.error("Error during autonomous trading: %s", str(e))
        finally:
            autonomous_running = False
            logger.info("Autonomous trading stopped.")

    # Start autonomous trading in a separate thread
    autonomous_thread = threading.Thread(target=run_autonomous_mode)
    autonomous_thread.start()
    return {"status": "Autonomous trading started successfully."}


@app.post("/autonomous-trading/stop/")
def stop_autonomous_trading():
    """Stop the autonomous trading agent."""
    global autonomous_running

    if not autonomous_running:
        raise HTTPException(
            status_code=400, detail="Autonomous trading is not running."
        )

    autonomous_running = False
    if autonomous_thread:
        autonomous_thread.join()

    return {"status": "Autonomous trading stopped successfully."}
