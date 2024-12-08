import React, { useState } from "react";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [autonomousStatus, setAutonomousStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartAutonomousTrading = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8080/autonomous-trading/start/",
        {
          method: "POST",
        }
      );
      const data = await res.json();
      setAutonomousStatus(data.status);
    } catch (error) {
      console.error("Error starting autonomous trading:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStopAutonomousTrading = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8080/autonomous-trading/stop/",
        {
          method: "POST",
        }
      );
      const data = await res.json();
      setAutonomousStatus(data.status);
    } catch (error) {
      console.error("Error stopping autonomous trading:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>DeFi Chatbot</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSendMessage} disabled={loading || !message.trim()}>
        {loading ? "Sending..." : "Send"}
      </button>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Autonomous Trading</h2>
        <button
          onClick={handleStartAutonomousTrading}
          disabled={
            loading ||
            autonomousStatus === "Autonomous trading started successfully."
          }
        >
          {loading ? "Starting..." : "Start Autonomous Trading"}
        </button>
        <button
          onClick={handleStopAutonomousTrading}
          disabled={
            loading ||
            autonomousStatus === "Autonomous trading stopped successfully."
          }
          style={{ marginLeft: "10px" }}
        >
          {loading ? "Stopping..." : "Stop Autonomous Trading"}
        </button>
        <p>Status: {autonomousStatus || "Idle"}</p>
      </div>
    </div>
  );
};

export default ChatComponent;
