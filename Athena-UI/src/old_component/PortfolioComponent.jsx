import { useState, useEffect } from "react";
import { useOnchain } from "@coinbase/onchainkit";

const PortfolioComponent = () => {
  const { account, getBalances } = useOnchain();
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    if (account) {
      fetchBalances();
    }
  }, [account]);

  const fetchBalances = async () => {
    try {
      const tokenBalances = await getBalances();
      setBalances(tokenBalances);
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  return (
    <div>
      <h2>Portfolio</h2>
      {balances.length ? (
        <ul>
          {balances.map((balance) => (
            <li key={balance.asset}>
              {balance.asset}: {balance.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No balances found.</p>
      )}
    </div>
  );
};

export default PortfolioComponent;
