import React from "react";
import { useNavigate } from "react-router-dom";
import block11 from "../assets/Blockchain11.svg"; 

const ImportWallet = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <div className="h-screen rounded-xl shadow-lg flex flex-col justify-center items-center relative">
        <div className="absolute top-20">
          <img src={block11} alt="Blockchain Illustration" className="w-64 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold mt-36">Wallet Setup</h1>
        <div className="mt-10 space-y-4 w-full px-4">
        <button
            className="w-full py-3 rounded-3xl border border-green-500 hover:bg-[#0f8835] transition-all"
            onClick={() => navigate("/import-wallet")}
            >
            Import Wallet
            </button>
            <button
            className="w-full py-3 rounded-3xl bg-green-600 hover:bg-[#0f8835] transition-all"
            onClick={() => navigate("/create-wallet")}
            >
            Create Wallet
            </button>
        </div>
      </div>
    </div>
  );
};

export default ImportWallet;
