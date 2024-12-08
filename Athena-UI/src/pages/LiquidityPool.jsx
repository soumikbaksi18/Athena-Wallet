import React from "react";
import { useNavigate } from "react-router-dom";
import dp from "../assets/DP.svg";
import Bell from "../assets/Bell.svg";
import nokia from "../assets/nokia.svg";
import moneyJar from "../assets/Money_Jar.svg";
import bwArw from "../assets/bwArw.svg";

const LiquidityPool = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      {/* Header */}
      <div className="my-4 flex justify-between">
        <div className="flex justify-center my-auto">
          <h2 className="text-xl font-semibold ml-2">Lend & Borrow</h2>
        </div>
        <div className="flex">
          <img src={Bell} alt="Notifications" className="m-2" />
          <img src={dp} alt="Profile" className="m-2" />
        </div>
      </div>

      {/* Create Pool Button */}
      <div
        className="flex justify-center border-green-500 border items-center text-white p-3 rounded-lg shadow-lg my-4 cursor-pointer"
        onClick={() => navigate("/create-liquidity")}
      >
        <img src={nokia} alt="Nokia Icon" className="w-5 h-5 mr-2" />
        <h1>Create new pool</h1>
      </div>

      {/* Pool Card */}
      <div className="my-4 border-white border text-white rounded-lg shadow-md p-4 flex items-center justify-around">
        <img src={moneyJar} alt="Money Jar Icon" className="w-10 h-10" />
        <h3 className="text-xl font-semibold">Chillax pool</h3>
        <img src={bwArw} className="w-8" />
      </div>
    </div>
  );
};

export default LiquidityPool;
