import React, { useState } from "react";
import dp from "../assets/DP.svg";
import Bell from "../assets/Bell.svg";
import arrow from "../assets/Arrow.svg";

const Dashboard = () => {
  const dummyData = [
    {
      id: 1,
      icon: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      title: "BTC",
      price: "99770",
      change: 1.90783,
    },
    {
      id: 2,
      icon: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      title: "ETH",
      price: "3988.32",
      change: 3.45873,
    },
    {
      id: 3,
      icon: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
      title: "XRP",
      price: "2.44",
      change: 8.22349,
    },
    {
      id: 4,
      icon: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
      title: "USDT",
      price: "1.001",
      change: 0.04897,
    },
    {
      id: 5,
      icon: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
      title: "SOL",
      price: "238.42",
      change: 1.60328,
    },
    {
      id: 6,
      icon: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
      title: "BNB",
      price: "743.49",
      change: 3.99732,
    },
    {
      id: 7,
      icon: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
      title: "DOGE",
      price: "0.44864",
      change: 5.3787,
    },
    {
      id: 8,
      icon: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090",
      title: "ADA",
      price: "1.2",
      change: 4.43261,
    },
    {
      id: 9,
      icon: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
      title: "USDC",
      price: "1.0",
      change: 0.08001,
    },
    {
      id: 10,
      icon: "https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
      title: "STETH",
      price: "3985.2",
      change: 3.4406,
    },
    {
      id: 11,
      icon: "https://assets.coingecko.com/coins/images/1109/standard/electroneum.png?1696502205",
      title: "ENT",
      price: "0.0036",
      change: -17.8,
    },
    {
      id: 12,
      icon: "https://assets.coingecko.com/coins/images/51817/standard/logotipo_MUT_Aid01_fundo.png",
      title: "MUT",
      price: "0.0665",
      change: -25.6,
    },
    {
      id: 13,
      icon: "https://assets.coingecko.com/coins/images/51784/standard/3.png?1731981138",
      title: "AIXBT",
      price: "0.1761",
      change: -29.3,
    },
    {
      id: 14,
      icon: "https://assets.coingecko.com/coins/images/51857/standard/photo_2024-11-02_20-26-31_%282%29.png?1732080372",
      title: "GOUT",
      price: "0.00029",
      change: 28.6,
    },
    { id: 15, icon: dp, title: "AVAX", price: "19.90", change: -4.1 },
    { id: 16, icon: dp, title: "SHIB", price: "0.08", change: 10.7 },
    { id: 17, icon: dp, title: "FTM", price: "0.90", change: -7.6 },
    { id: 18, icon: dp, title: "VET", price: "0.18", change: 1.9 },
    { id: 19, icon: dp, title: "XMR", price: "160.25", change: 13.4 },
    { id: 20, icon: dp, title: "FIL", price: "7.30", change: -3.2 },
  ];

  const isPositive = (change) => change > 0;

  const Card = ({ icon, title, price, change }) => (
    <div className="p-3 rounded-lg border border-gray-700 shadow-md">
      <div className="flex flex-col  justify-center"></div>
      <img src={icon} alt={title} className="w-6 h-6 mb-2" />
      <div className="flex">
        <h3 className="text-xs font-bold">{title}</h3>
        <p className="text-gray-400 text-xs ml-1">${price}</p>
      </div>
      <p
        className={`text-xs font-bold mt-2 ${
          isPositive(change) ? "text-green-500" : "text-red-500"
        }`}
      >
        {change > 0 ? `+${change}%` : `${change}%`}
      </p>
    </div>
  );

  const Section = ({ title, data }) => {
    const [showAll, setShowAll] = useState(false);

    const toggleView = () => {
      setShowAll((prev) => !prev);
    };

    const visibleData = showAll ? data : data.slice(0, 3);

    return (
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={toggleView}
            className="text-sm text-blue-500 hover:underline"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {visibleData.map((item) => (
            <Card
              key={item.id}
              icon={item.icon}
              title={item.title}
              price={item.price}
              change={item.change}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="p-4">
        <div className="my-4 flex justify-between">
          <div className="">
            <h2 className="text-sm font-semibold text-gray-400">Last sync</h2>
            <p className="mt-2 font-medium">Dec 8th, 8:26</p>
          </div>
          <div className="flex">
            <img src={Bell} alt="" className="m-2" />
            <img src={dp} alt="" className="m-2" />
          </div>
        </div>
        <div className="p-4 rounded-lg border border-green-500 shadow-md flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Total Balance</h3>
            <p className="text-2xl font-bold text-white">
              $0.001 <span className="text-sm font-normal">USD</span>
            </p>
            <p className="text-sm text-green-500 flex items-center mt-2">
              PNL (24H) +$0.84376826 (+0.69%)
            </p>
          </div>
          <button className="bg-red-500 rounded-full p-2">
            <img src={arrow} alt="Arrow" className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-6">
          <div className="pt-4 min-h-screen">
            <Section title="Top Gainers" data={dummyData.slice(0, 10)} />
            <div className="my-5"></div>
            <Section title="Top Losers" data={dummyData.slice(10, 20)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
