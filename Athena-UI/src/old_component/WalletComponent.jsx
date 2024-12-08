import { useOnchain } from "@coinbase/onchainkit";

const WalletComponent = () => {
  const { connect, disconnect, account, network } = useOnchain();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Connected to: {account}</p>
          <p>Network: {network}</p>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletComponent;
