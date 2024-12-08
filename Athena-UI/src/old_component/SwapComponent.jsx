import React, { useState } from "react";

const SwapComponent = () => {
  const [inputAsset, setInputAsset] = useState("eth");
  const [outputAsset, setOutputAsset] = useState("usdc");
  const [amount, setAmount] = useState("");
  const [slippageTolerance, setSlippageTolerance] = useState(0.5);
  const [recipient, setRecipient] = useState(
    "0x6c477046c5d61Dd2a04F60490CE8BdC0A6dB565c"
  );
  const [response, setResponse] = useState("");

  const handleSwap = async () => {
    try {
      const res = await fetch("http://localhost:8080/swap/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_asset: inputAsset,
          output_asset: outputAsset,
          amount: amount,
          slippage_tolerance: parseFloat(slippageTolerance),
          recipient: recipient,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.result);
      } else {
        setResponse(`Error: ${data.detail}`);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Token Swap</h1>
      <div>
        <label>
          Input Asset:
          <input
            type="text"
            value={inputAsset}
            onChange={(e) => setInputAsset(e.target.value)}
            placeholder="e.g., eth"
          />
        </label>
      </div>
      <div>
        <label>
          Output Asset:
          <input
            type="text"
            value={outputAsset}
            onChange={(e) => setOutputAsset(e.target.value)}
            placeholder="e.g., usdc"
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 0.01"
          />
        </label>
      </div>
      <div>
        <label>
          Slippage Tolerance (%):
          <input
            type="number"
            value={slippageTolerance}
            onChange={(e) => setSlippageTolerance(e.target.value)}
            placeholder="e.g., 0.5"
          />
        </label>
      </div>
      <div>
        <label>
          Recipient Address:
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="e.g., 0x123..."
          />
        </label>
      </div>
      <button onClick={handleSwap}>Swap</button>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default SwapComponent;
