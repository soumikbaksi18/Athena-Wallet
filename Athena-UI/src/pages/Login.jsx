import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import block11 from "../assets/Blockchain11.svg";

const Login = () => {
  const [walletData, setWalletData] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [showImportField, setShowImportField] = useState(false);

  const navigate = useNavigate();

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
      console.log("Initialize Wallet Response:", result);
      alert("Wallet successfully initialized!");
      navigate("/");
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
      setWalletData(result.wallet_data || "");
      console.log("Create Wallet Response:", result);

      // Immediately initialize with the newly created wallet data
      const initResponse = await fetch(
        "http://localhost:8080/initialize-wallet/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallet_data: result.wallet_data }),
        }
      );
      const initResult = await initResponse.json();
      if (!initResponse.ok) {
        throw new Error(initResult.detail || "Failed to initialize wallet");
      }

      alert("New wallet created and initialized successfully!");
      navigate("/");
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <div className="h-screen rounded-xl shadow-lg flex flex-col justify-center items-center relative">
        <div className="absolute top-20">
          <img
            src={block11}
            alt="Blockchain Illustration"
            className="w-64 mx-auto"
          />
        </div>
        <h1 className="text-3xl font-bold mt-36">Wallet Setup</h1>
        <div className="mt-10 space-y-4 w-full px-4">
          <button
            className="w-full py-3 rounded-3xl border border-green-500 hover:bg-[#0f8835] transition-all"
            disabled={creating || loading}
            onClick={createNewWallet}
          >
            {creating ? "Creating..." : "Create Wallet"}
          </button>

          <button
            className="w-full py-3 rounded-3xl bg-green-600 hover:bg-[#0f8835] transition-all"
            onClick={() => setShowImportField((prev) => !prev)}
            disabled={loading || creating}
          >
            Import Wallet
          </button>
        </div>

        {showImportField && (
          <div className="mt-10 w-full px-4">
            <textarea
              rows={6}
              className="w-full p-2 border border-gray-300 rounded-md text-black mb-4"
              placeholder="Paste your wallet data here"
              value={walletData}
              onChange={(e) => setWalletData(e.target.value)}
            />
            <button
              onClick={initializeWallet}
              disabled={loading || !walletData.trim()}
              className={`w-full py-3 rounded-3xl bg-blue-600 hover:bg-blue-700 transition-all text-black ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? "Initializing..." : "Initialize Wallet"}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
