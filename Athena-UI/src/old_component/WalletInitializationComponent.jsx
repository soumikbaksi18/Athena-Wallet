import { useState } from "react";

function WalletInitializationComponent({ onWalletInitialized }) {
  const [walletData, setWalletData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);

  const initializeWallet = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8080/initialize-wallet/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_data: walletData }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || "Failed to initialize wallet");
      }
      onWalletInitialized();
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const createNewWallet = async () => {
    setCreating(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8080/create-wallet/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || "Failed to create wallet");
      }
      // Update the textarea with the newly created wallet data
      setWalletData(result.wallet_data);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Initialize or Create a Wallet</h2>
      <h1 className="text-5xl text-red-400 font-bold underline">
        Hello world!
      </h1>
      <p>
        If you already have wallet data, paste it below and click "Initialize
        Wallet". Otherwise, click "Create New Wallet" to generate a new one.
      </p>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={createNewWallet} disabled={creating || loading}>
          {creating ? "Creating..." : "Create New Wallet"}
        </button>
      </div>
      <textarea
        rows={6}
        cols={50}
        placeholder="Paste your wallet data here or create a new wallet"
        value={walletData}
        onChange={(e) => setWalletData(e.target.value)}
      />
      <br />
      <button
        onClick={initializeWallet}
        disabled={loading || !walletData.trim()}
      >
        {loading ? "Initializing..." : "Initialize Wallet"}
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default WalletInitializationComponent;
