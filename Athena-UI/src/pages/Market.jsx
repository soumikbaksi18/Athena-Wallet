import React from "react";
import dp from "../assets/DP.svg";
import Bell from "../assets/Bell.svg";

const Market = () => {
  const cryptoData = [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: "USD$ 23,450.67",
      change: "+5.67%",
      trend: "up",
      icon: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      price: "USD$ 1,645.89",
      change: "+3.12%",
      trend: "up",
      icon: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    },
    {
      id: 3,
      name: "Cardano",
      symbol: "ADA",
      price: "USD$ 0.31",
      change: "-1.28%",
      trend: "down",
      icon: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090",
    },
    {
      id: 4,
      name: "Solana",
      symbol: "SOL",
      price: "USD$ 22.41",
      change: "+2.45%",
      trend: "up",
      icon: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
    },
    {
      id: 5,
      name: "Ripple",
      symbol: "XRP",
      price: "USD$ 0.53",
      change: "-0.87%",
      trend: "down",
      icon: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
    },
    {
      id: 6,
      name: "Litecoin",
      symbol: "LTC",
      price: "USD$ 88.50",
      change: "+4.21%",
      trend: "up",
      icon: "https://coin-images.coingecko.com/coins/images/2/large/litecoin.png?1696501400",
    },
    {
      id: 7,
      name: "Polkadot",
      symbol: "DOT",
      price: "USD$ 5.43",
      change: "-0.45%",
      trend: "down",
      icon: "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png?1696502165",
    },

    {
      id: 9,
      name: "Stellar",
      symbol: "XLM",
      price: "USD$ 0.09",
      change: "-1.15%",
      trend: "down",
      icon: "https://coin-images.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501493",
    },
    {
      id: 10,
      name: "Tron",
      symbol: "TRX",
      price: "USD$ 0.07",
      change: "+2.01%",
      trend: "up",
      icon: "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696506739",
    },
  ];

  return (
    <div className="mx-4 pb-10">
      <div className="my-4 flex justify-between px-4">
        <div className="flex justify-center my-auto">
          <h2 className="text-xl font-semibold ">Market Watch</h2>
        </div>
        <div className="flex">
          <img src={Bell} alt="Notifications" className="m-2" />
          <img src={dp} alt="Profile" className="m-2" />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {cryptoData.map((crypto) => (
          <div
            key={crypto.id}
            className="p-4 rounded-lg border border-gray-700 shadow-md flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <img
                src={crypto.icon}
                alt={`${crypto.name} Logo`}
                className="w-10 h-10"
              />
              <div>
                <h3 className="text-lg font-bold">{crypto.name}</h3>
                <p className="text-gray-400 mt-1">{crypto.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{crypto.price}</p>
              <p
                className={
                  crypto.change.includes("+")
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {crypto.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
