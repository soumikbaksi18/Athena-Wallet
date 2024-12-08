import React, { useState } from "react";
import dp from "../assets/DP.svg";
import Bell from "../assets/Bell.svg";
import USDC from "../assets/USDC.svg";
import ETH from "../assets/ETH.svg";

// Dropdown Component
const Dropdown = ({ options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-gray-800 p-4 rounded-md text-gray-200"
      >
        <div className="flex items-center">
          <img src={selected.icon} alt={selected.label} className="w-6 h-6 mr-2" />
          <span>{selected.label}</span>
        </div>
        <span>&#9662;</span>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-gray-900 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="flex items-center p-4 w-full text-left hover:bg-gray-700"
            >
              <img src={option.icon} alt={option.label} className="w-6 h-6 mr-2" />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Deposit Component
const DepositComponent = () => (
  <div className="text-white p-6 rounded-lg space-y-4">
    {/* Amount to Deposit */}
    <div>
      <label className="block text-gray-400 text-sm mb-2">Amount to deposit</label>
      <div className="flex items-center justify-between bg-gray-800 p-4 rounded-md">
        <div className="flex items-center">
          <img src={USDC} alt="USDC" className="w-6 h-6 mr-2" />
          <span className="text-sm">USDC</span>
        </div>
        <input
          type="text"
          placeholder="Enter amount"
          className="bg-transparent text-right text-gray-200 outline-none w-full ml-4"
        />
      </div>
      <p className="text-right text-sm text-gray-500 mt-2">Available: 204,781 USDC</p>
    </div>

    <div>
      <div className="flex items-center justify-between bg-gray-800 p-4 rounded-md">
        <div className="flex items-center">
          <img src={ETH} alt="ETH" className="w-6 h-6 mr-2" />
          <span className="text-sm">ETH</span>
        </div>
        <input
          type="text"
          placeholder="Enter amount"
          className="bg-transparent text-right text-gray-200 outline-none w-full ml-4"
        />
      </div>
      <p className="text-right text-sm text-gray-500 mt-2">Available: 50.268 ETH</p>
    </div>

    {/* Deposit Button */}
    <button className="w-full bg-green-700 text-white py-3 rounded-md mt-4 hover:bg-green-800">
      Deposit
    </button>
  </div>
);

// Withdraw Component
const WithdrawComponent = () => {
  const [withdrawAmount, setWithdrawAmount] = useState(""); // State to track the withdrawal amount
  const balance = 1000000; // Example balance
  const pricePerToken = 6450; // Example USDC price equivalent for 1 ETH

  // Calculate expected token amounts dynamically
  const calculateExpectedAmounts = () => {
    const ethAmount = withdrawAmount / pricePerToken; // Calculate ETH
    const usdcAmount = withdrawAmount; // Directly in USDC
    return { eth: ethAmount.toFixed(3), usdc: usdcAmount };
  };

  const { eth, usdc } = calculateExpectedAmounts();

  return (
    <div className="text-white p-6 rounded-lg space-y-4">
      {/* Amount to Withdraw */}
      <div>
        <label className="block text-gray-400 text-sm mb-2">Amount to withdraw</label>
        <div className="bg-gray-800 p-4 rounded-md">
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)} // Update state dynamically
            placeholder="Enter amount"
            className="bg-transparent text-right text-gray-200 outline-none w-full"
          />
          <p className="text-sm text-gray-500 mt-1">${(withdrawAmount * 1).toLocaleString()}</p>
        </div>
        <p className="text-right text-sm text-gray-500 mt-2">Balance: {balance.toLocaleString()}</p>
      </div>

      {/* Quick Percentage Buttons */}
      <div className="flex justify-between space-x-2">
        {[0.25, 0.5, 0.75, 1].map((fraction, index) => (
          <button
            key={index}
            className="flex-1 bg-gray-800 text-gray-400 py-2 rounded-md hover:bg-green-700 hover:text-white"
            onClick={() => setWithdrawAmount((balance * fraction).toFixed(2))} // Set percentage
          >
            {fraction * 100}%
          </button>
        ))}
      </div>

      {/* Balanced or Single Toggle */}
      <div className="flex justify-between mt-4">
        <button className="flex-1 bg-gray-800 text-green-500 py-2 rounded-md border border-green-700 hover:bg-green-700 hover:text-white">
          Balanced
        </button>
        <button className="flex-1 ml-2 bg-gray-800 text-gray-400 py-2 rounded-md hover:bg-green-700 hover:text-white">
          Single
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2">You’ll receive both tokens in balanced amounts.</p>

      {/* Expected Amounts */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">ETH</span>
          <span className="text-gray-200 text-sm">{eth || "0.000"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">USDC</span>
          <span className="text-gray-200 text-sm">{usdc || "0.000"}</span>
        </div>
      </div>

      {/* Withdraw Button */}
      <button
        className="w-full bg-green-700 text-white py-3 rounded-md mt-4 hover:bg-green-800"
        disabled={!withdrawAmount || withdrawAmount <= 0 || withdrawAmount > balance} // Disable if invalid
      >
        Withdraw
      </button>
    </div>
  );
};

const InsideOverview = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  // Dropdown states for assets
  const [selectedAsset1, setSelectedAsset1] = useState({ label: "USDC", icon: USDC, value: "usdc" });
  const [selectedAsset2, setSelectedAsset2] = useState({ label: "ETH", icon: ETH, value: "eth" });

  const assets = [
    { label: "USDC", icon: USDC, value: "usdc" },
    { label: "ETH", icon: ETH, value: "eth" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="text-white p-6 rounded-lg space-y-6">
            {/* Assets in Pool */}
            <div>
              <h3 className="text-gray-400 text-sm mb-2">Assets in Pool</h3>
              <div className="space-y-4">
                <Dropdown
                  options={assets}
                  selected={selectedAsset1}
                  setSelected={setSelectedAsset1}
                />
                <Dropdown
                  options={assets}
                  selected={selectedAsset2}
                  setSelected={setSelectedAsset2}
                />
              </div>
            </div>

            {/* Asset Ratios */}
            <div>
              <h3 className="text-gray-400 text-sm mb-2">Asset Ratios in Pool</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-md">
                  <div className="flex items-center">
                    <img src={selectedAsset1.icon} alt={selectedAsset1.label} className="w-6 h-6 mr-2" />
                    <span>{`Ratio of ${selectedAsset1.label}`}</span>
                  </div>
                  <span className="text-gray-200">52.2%</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-md">
                  <div className="flex items-center">
                    <img src={selectedAsset2.icon} alt={selectedAsset2.label} className="w-6 h-6 mr-2" />
                    <span>{`Ratio of ${selectedAsset2.label}`}</span>
                  </div>
                  <span className="text-gray-200">47.7%</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "Deposit":
        return <DepositComponent />;
      case "Withdraw":
        return <WithdrawComponent />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="my-4 mx-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold ml-2">Lend & Borrow</h2>
        <div className="flex">
          <img src={Bell} alt="Notifications" className="m-2 w-6 h-6" />
          <img src={dp} alt="Profile" className="m-2 w-8 h-8 rounded-full" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-8 mb-6">
        {["Overview", "Deposit", "Withdraw"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab
                ? "bg-green-700 text-white"
                : "border border-green-700 text-green-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render Active Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default InsideOverview;
