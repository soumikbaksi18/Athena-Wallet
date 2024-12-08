import { useState } from "react";
import { AppProviders } from "./providers";
import ChatComponent from "./components/chat";
import TransferComponent from "./components/TransferComponent";
import SwapComponent from "./components/SwapComponent";
import WalletInitializationComponent from "./components/WalletInitializationComponent";

function App() {
  const [isWalletInitialized, setIsWalletInitialized] = useState(false);

  return (
    <AppProviders>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        {!isWalletInitialized ? (
          <WalletInitializationComponent
            onWalletInitialized={() => setIsWalletInitialized(true)}
          />
        ) : (
          <>
            <ChatComponent />
            <TransferComponent />
            <SwapComponent />
          </>
        )}
      </div>
    </AppProviders>
  );
}

export default App;
