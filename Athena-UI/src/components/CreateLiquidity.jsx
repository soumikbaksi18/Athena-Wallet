import React, { useState } from "react";

const CreateLiquidity = () => {
  const [asset1, setAsset1] = useState("USDC");
  const [asset2, setAsset2] = useState("ETH");
  const [ratio1, setRatio1] = useState(52.2);
  const [ratio2, setRatio2] = useState(47.7);

  const assetOptions = ["USDC", "ETH", "BTC", "DAI"];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Lend & Borrow</h1>

      {/* Asset Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Assets in Pool</h2>
        {/* Asset 1 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Asset 1</label>
          <select
            className="w-full rounded-lg border bg-gray-800 text-white p-3"
            value={asset1}
            onChange={(e) => setAsset1(e.target.value)}
          >
            {assetOptions.map((asset, index) => (
              <option key={index} value={asset}>
                {asset}
              </option>
            ))}
          </select>
        </div>

        {/* Asset 2 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Asset 2</label>
          <select
            className="w-full rounded-lg border bg-gray-800 text-white p-3"
            value={asset2}
            onChange={(e) => setAsset2(e.target.value)}
          >
            {assetOptions.map((asset, index) => (
              <option key={index} value={asset}>
                {asset}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Asset Ratios */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Asset Ratios in Pool</h2>
        {/* Ratio of Asset 1 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Ratio of Asset 1 ({asset1})
          </label>
          <input
            type="text"
            value={`${ratio1}%`}
            disabled
            className="w-full rounded-lg border bg-gray-800 text-white p-3"
          />
        </div>

        {/* Ratio of Asset 2 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Ratio of Asset 2 ({asset2})
          </label>
          <input
            type="text"
            value={`${ratio2}%`}
            disabled
            className="w-full rounded-lg border bg-gray-800 text-white p-3"
          />
        </div>
      </div>

      {/* Create Pool Button */}
      <div className="flex justify-center">
        <button className="w-full p-3 bg-green-500 text-white rounded-lg">
          Create new pool
        </button>
      </div>
    </div>
  );
};

export default CreateLiquidity;
