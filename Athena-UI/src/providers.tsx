import React, { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { baseSepolia } from "wagmi/chains"; // Change to `base` for mainnet
// import dotenv from "dotenv";

// Load environment variables from `.env`
// dotenv.config();

export function AppProviders({ children }: { children: ReactNode }) {
  const apiKey = "ybnjcCUWQCIXXgSqbIBZxhOrj7SVb631";

  if (!apiKey) {
    throw new Error(
      "VITE_PUBLIC_ONCHAINKIT_API_KEY is not defined in your .env file."
    );
  }

  return (
    <OnchainKitProvider
      apiKey={apiKey}
      chain={baseSepolia} // Replace with `base` for mainnet
      config={{
        appearance: {
          name: "My DeFi App",
          // logo: "https://your-logo-url.com", // Optional logo
          mode: "auto", // 'light', 'dark', or 'auto'
        },
        wallet: { display: "modal" }, // Use modal for wallet connection
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}
