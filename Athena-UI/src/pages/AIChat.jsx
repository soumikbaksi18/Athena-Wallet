import React, { useState, useRef, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Papa from "papaparse";

import rawCSV from "../../public/data/ethereum.csv?raw";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [graphLoading, setGraphLoading] = useState(true);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [awaitingTradingConfirmation, setAwaitingTradingConfirmation] =
    useState(false);
  const [pendingPredictionData, setPendingPredictionData] = useState(null);

  useEffect(() => {
    fetch("/data/ethereum.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            console.log("Parsed CSV results:", results.data);
            setChartData(results.data);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching and parsing CSV:", error);
      });
  }, []);

  const initializeSpeechRecognition = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Speech Recognition is not supported in your browser.");
      return null;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = true;
    return recognition;
  };

  const handleVoiceInput = () => {
    if (listening) {
      console.log("Stopping voice input...");
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = initializeSpeechRecognition();
    if (!recognition) return;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      console.log("Voice input started.");
      setListening(true);
    };

    recognition.onresult = (event) => {
      console.log("Speech recognition result event:", event);
      if (!event.results || event.results.length === 0) {
        console.error("No valid speech input detected");
        return;
      }

      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");
      console.log("Voice transcript:", transcript);

      if (transcript.trim()) {
        handleSpecialCommand(transcript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Voice input ended.");
      setListening(false);
      if (listening) recognition.start();
    };

    recognition.start();
  };

  const handleSpecialCommand = (message) => {
    console.log("Processing special command:", message);

    if (awaitingTradingConfirmation) {
      // User is responding to the "hold" scenario prompt
      if (message.toLowerCase() === "yes") {
        setAwaitingTradingConfirmation(false);
        console.log("User confirmed to proceed with autonomous trading...");
        if (pendingPredictionData) {
          // User said yes after "hold", so start autonomous trading now
          beginAutonomousTrading();
        }
      } else {
        // User said something else, do not proceed
        setAwaitingTradingConfirmation(false);
        setPendingPredictionData(null);
        const botReply = {
          type: "bot",
          text: "Understood. We will not proceed with autonomous trading.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botReply]);
      }
      return;
    }

    // Normal commands:
    if (message.toLowerCase().includes("start auto trade with eth")) {
      console.log("Starting autonomous trading sequence...");
      executeAutonomousTrading();
    } else {
      const sendPattern = /send\s+(\d+\.?\d*)?\s*(eth|tokens)?\s+to\s+(\w+)/i;
      const match = message.match(sendPattern);

      if (match) {
        const amount = match[1] || "1";
        const currency = match[2] || "ETH";
        const recipientName = match[3];

        console.log(
          `Matched details - Amount: ${amount}, Currency: ${currency}, Recipient: ${recipientName}`
        );

        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        console.log("Retrieved contacts from localStorage:", contacts);

        const recipient = contacts.find((contact) =>
          contact.name.toLowerCase().includes(recipientName.toLowerCase())
        );

        if (recipient) {
          const walletAddress = recipient.walletAddress;
          console.log(
            `Recipient found: ${recipientName}, Wallet Address: ${walletAddress}`
          );

          const newMessage = {
            type: "user",
            text: `Send ${amount} ${currency} to ${recipientName} ${walletAddress}`,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, newMessage]);

          sendTransactionMessage(
            `${amount} ${currency}`,
            recipientName,
            walletAddress
          );
        } else {
          console.warn(`Contact "${recipientName}" not found.`);
          const botReply = {
            type: "bot",
            text: `Contact "${recipientName}" not found in your contact book.`,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, botReply]);
        }
      } else {
        console.log(
          "No special command detected, passing to voice message handler."
        );
        sendVoiceMessage(message);
      }
    }
  };

  const executeAutonomousTrading = async () => {
    try {
      setLoading(true);
      setGraphLoading(true);

      // Step 2: Model Training
      const trainModelResponse = await fetch(
        "http://localhost:8000/train-model/ethereum",
        {
          method: "POST",
        }
      );
      if (!trainModelResponse.ok) throw new Error("Failed to train model.");
      console.log("Model training request sent.");

      setGraphLoading(false);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Here is the Prediction analysis of the ETH as per your portfolio. Here's the chart:",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          showChart: true,
        },
      ]);

      // Step 3: Prediction
      const predictionResponse = await fetch(
        "http://localhost:8000/predict/25",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!predictionResponse.ok)
        throw new Error("Failed to fetch predictions.");

      const predictionData = await predictionResponse.json();
      console.log("Prediction Data:", predictionData);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: `Prediction received: ${predictionData.message}`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      // Decide strategy
      startAutonomousTrading(predictionData);
    } catch (error) {
      console.error("Error during autonomous trading:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: `Error: ${error.message}`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startAutonomousTrading = (predictionData) => {
    const { token, message } = predictionData;

    console.log("Starting autonomous trading for token:", token);
    console.log("Trading decision message:", message);

    let botText = "";
    if (message.toLowerCase().includes("hold")) {
      botText = `Strategy: Holding ${token} as per prediction.`;
    } else if (message.toLowerCase().includes("sell")) {
      botText = `Strategy: Selling ${token} as per prediction.`;
    } else if (message.toLowerCase().includes("buy")) {
      botText = `Strategy: Buying more of ${token} as per prediction.`;
    } else {
      botText = `Strategy: Unable to determine action for ${token}.`;
    }

    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        text: botText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    if (message.toLowerCase().includes("hold")) {
      // Ask user to confirm if they still want to proceed
      const askMessage = {
        type: "bot",
        text: "You are advised to hold. Would you still like to proceed with autonomous trading? Say 'yes' to continue or 'no' to stop.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, askMessage]);
      setAwaitingTradingConfirmation(true);
      setPendingPredictionData(predictionData);
    } else {
      // For "sell" or "buy", we can start autonomous trading right away
      beginAutonomousTrading();
    }
  };

  const beginAutonomousTrading = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/autonomous-trading/start/",
        {
          method: "POST",
        }
      );
      if (!res.ok) throw new Error("Failed to start autonomous trading.");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            data.message || "Autonomous trading has been started successfully.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      // Reset pending data
      setPendingPredictionData(null);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: `Error starting autonomous trading: ${error.message}`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  };

  const handleStopAutonomousTrading = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8080/autonomous-trading/stop/",
        {
          method: "POST",
        }
      );

      if (!res.ok) throw new Error("Failed to stop autonomous trading.");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            data.message || "Autonomous trading has been stopped successfully.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error) {
      console.error("Error stopping autonomous trading:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: `Error stopping autonomous trading: ${error.message}`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendTransactionMessage = async (
    amount,
    recipientName,
    walletAddress
  ) => {
    const message = `Transfer ${amount} to ${recipientName}'s wallet: ${walletAddress}`;
    console.log("Sending transaction message:", message);
    setLoading(true);

    try {
      // This still uses the /chat endpoint because it's for a transaction, not starting autonomous trading
      const res = await fetch("http://localhost:8080/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      console.log("Transaction response from backend:", data);

      const botReply = {
        type: "bot",
        text: data.response || "Transaction initiated successfully.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botReply]);

      speak(botReply.text);
    } catch (error) {
      console.error("Error sending transaction message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    console.log("Sending message:", inputMessage);
    handleSpecialCommand(inputMessage);
    setInputMessage("");
  };

  const sendVoiceMessage = async (voiceMessage) => {
    console.log("Sending voice message:", voiceMessage);
    const newMessage = {
      type: "user",
      text: voiceMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: voiceMessage }),
      });
      const data = await res.json();

      console.log("Voice message response from backend:", data);

      const botReply = {
        type: "bot",
        text: data.response || "Something went wrong. Try again later.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botReply]);

      speak(botReply.text);
    } catch (error) {
      console.error("Error sending voice message:", error);
    } finally {
      setLoading(false);
    }
  };

  const speak = (text) => {
    if (!("speechSynthesis" in window)) {
      console.error("Text-to-Speech not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 mb-32 overflow-y-auto bg-gradient-to-b from-[#020d29] to-[#011219]">
        {messages.length === 0 ? (
          <div className="text-gray-400 text-sm">
            <p>Try these commands:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>What is my wallet address?</li>
              <li>Get me some tokens from faucets.</li>
              <li>Send token to Alice.</li>
              <li>Check my current balance.</li>
              <li>Start autonomous trading.</li>
            </ul>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "bot" ? "justify-start" : "justify-end"
              } mb-4`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg break-words ${
                  msg.type === "bot"
                    ? "bg-[#173E34] text-white"
                    : "bg-[#1C2C3A] text-gray-300"
                }`}
                style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                {msg.showChart && chartData && chartData.length > 0 && (
                  <div
                    style={{
                      backgroundColor: "#fff",
                      padding: "1rem",
                      marginTop: "1rem",
                      borderRadius: "8px",
                      overflowX: "auto",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                    }}
                  >
                    <div style={{ display: "inline-block" }}>
                      <AreaChart
                        width={1200}
                        height={250}
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorPrice"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8884d8"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8884d8"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="snapped_at" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorPrice)"
                        />
                      </AreaChart>
                    </div>
                  </div>
                )}

                <span className="block mt-2 text-xs text-gray-500 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 bg-[#011219] flex items-center bottom-14 w-full absolute">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 resize-none p-3 rounded-lg bg-[#1C2C3A] text-white outline-none"
          rows={1}
          style={{ overflowY: "hidden" }}
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 p-3 bg-[#17B794] rounded-full flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <div className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              width="24"
              height="24"
              stroke="white"
            >
              <path
                d="M22 2L11 13"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        <button
          onClick={handleVoiceInput}
          className={`ml-2 p-3 rounded-full ${
            listening ? "bg-red-600" : "bg-gray-500"
          } flex justify-center items-center`}
        >
          🎤
        </button>
      </div>
    </div>
  );
};

export default AIChat;
