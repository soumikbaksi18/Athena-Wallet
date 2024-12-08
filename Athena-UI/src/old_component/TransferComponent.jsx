import React, { useState } from "react";

const TransferComponent = () => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState("ETH");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleTransfer = async () => {
    try {
      const res = await fetch("http://localhost:8080/transfer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to_address: toAddress, amount, asset }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Error in transfer");
      }

      const data = await res.json();
      setResponse(data.result);
      setError(""); // Clear error if successful
    } catch (err) {
      console.error("Error in transfer:", err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Asset Transfer</h1>
      <input
        type="text"
        placeholder="Recipient Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount (e.g., 0.01)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={asset} onChange={(e) => setAsset(e.target.value)}>
        <option value="ETH">ETH</option>
        <option value="USDC">USDC</option>
      </select>
      <button onClick={handleTransfer}>Send</button>
      <div>
        <h2>Transfer Response:</h2>
        {error ? <p style={{ color: "red" }}>{error}</p> : <p>{response}</p>}
      </div>
    </div>
  );
};

export default TransferComponent;
