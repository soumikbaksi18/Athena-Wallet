import React from "react";
import Header from "../components/Header";

const Portfolio = () => {
  return (
    <div>
      <Header title="Portfolio" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">Your Portfolio</h2>
        <p className="text-gray-400 mt-2">Manage your investments here.</p>
      </div>
    </div>
  );
};

export default Portfolio;
