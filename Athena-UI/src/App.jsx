import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";
import ImportWallet from "./pages/ImportWallet";
import Login from "./pages/login";
import AddContact from "./pages/AddContact";
import LiquidityPool from "./pages/LiquidityPool";
import CreateLiquidity from "./components/CreateLiquidity.jsx";
import InsideOverview from "./pages/InsideOverview.jsx";


const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#020d29] to-[#060a15] text-white">
      <div className="w-[400px] h-screen rounded-xl shadow-lg relative">
        <div className="gg absolute -top-40 z-0"></div>
        <Router>
          <div className="z-10 relative h-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/ai-chat" element={<AIChat />} />
              <Route path="/market" element={<Market />} />
              <Route path="/portfolio" element={<ImportWallet />} />
              <Route path="/add-contact" element={<AddContact />} />
              <Route path="/liquidity-pool" element={<LiquidityPool />} />
              <Route path="/create-liquidity" element={<CreateLiquidity />} />
              <Route path="/liquidity-overview" element={<InsideOverview />} />
            </Routes>
          </div>
          <AppBar />
        </Router>
      </div>
    </div>
  );
};

export default App;
