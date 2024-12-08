from fastapi import FastAPI, HTTPException
from services.data_fetcher import fetch_historical_data
from services.data_preprocessor import prepare_data
from models.lstm_model import train_model, predict_prices
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Web3 AI Portfolio Manager", description="RAG Predictive Analysis API", version="1.0.0")

origins = ["*"]  
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

secret_key = "CG-1q5bQrHYLfqMJjMXgkZdq8E4"
apiList = [
"CG-rkP7KskgM1x3UvQyVCjUKMJp",
"CG-cbmGWAcGL4CW3XjW5LG3Stoz",
"CG-zXqfPPvkQUGw4H9eVrZJ3K78",
"CG-4DPmM3kcXAAtLZfB3hAsWCVX",
"CG-BptfJLXGVQha9rsm57JDyBaw",
"CG-RMZUKwDyPMb75riGCvWvqpJw",
"CG-8QfFEHxs7r84S6EqyFqv1wUv",
"CG-QiUf2jszn9AtZu2JQhKfvhnz",
"CG-d1LWsaxYixArugw5xXEPmH2z",
"CG-RSmFp6DttcPjrZKo76RkeRSS",
"CG-1q5bQrHYLfqMJjMXgkZdq8E4",
"CG-qKv37zoVERnnBEnTnbxy93rq",
"CG-f2MbZw4nqJmdniC7Nenzkjef",
"CG-Jjw6DhC8n9DnFgcQNTHP1u3W"]

current_index = 0

print("My key:",secret_key)


# # Print to verify (optional, don't do this in production)
# print(f"Database URL: {database_url}")

@app.get("/")
async def root():
    return {"message": "Welcome to the Web3 AI Portfolio Manager"}

trained_token = None  # Global variable to store the name of the trained token

@app.post("/fetch-data/{crypto_id}")
async def fetch_data(crypto_id: str, from_date: str):
    global current_index
   
    api_key = apiList[current_index]
    print(current_index)
    current_index = (current_index + 1) % len(apiList)
    print(current_index)

    try:
        file_path = fetch_historical_data(crypto_id, from_date,api_key)
        print("-----")
        return {"message": "Data fetched and saved successfully", "file_path": file_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/train-model/{token_name}")
async def train(token_name: str):
    global trained_token
    try:
        X, y, scaler = prepare_data()
        model = train_model(X, y)
        trained_token = token_name  # Store the name of the trained token
        return {"message": f"Model trained successfully for {token_name}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/predict/{buy_price}")
async def predict(buy_price: float):
    try:
        if trained_token is None:
            raise HTTPException(status_code=400, detail="No token has been trained yet.")
        
        predictions = predict_prices()
        for future_price in predictions:
            if future_price > buy_price * 1.2:
                return {
                    "token": trained_token,
                    "sell_price": float(future_price),
                    "message": f"Sell {trained_token} for a 20% profit"
                }
        return {"token": trained_token, "message": f"Hold {trained_token} for now"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

