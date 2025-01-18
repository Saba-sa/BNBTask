import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext"; // Adjust the path as per your structure
import Web3 from "web3";

const TransactionHistory = () => {
  const { state } = useAppContext();
  const { contract, account } = state;  
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!contract || !account) return;

    const fetchTransactions = async () => {
      try {
        // Example: Fetch past events from the smart contract
        const events = await contract.getPastEvents("TransactionEvent", {
          fromBlock: 0, // Start from the first block
          toBlock: "latest",
        });

        const parsedTransactions = events.map((event) => ({
          type: event.returnValues.type, // Replace with your event parameters
          details: event.returnValues.details,
          timestamp: new Date(event.returnValues.timestamp * 1000).toLocaleString(),
        }));

        setTransactions(parsedTransactions);
      } catch (error) {
        alert ("Error fetching transactions:", error);
      }
    };

    fetchTransactions();

    // Optional: Real-time listener for new events
    const eventListener = contract.events.TransactionEvent({}, (error, event) => {
      if (error) {
        alert("Error listening to events:", error);
      } else {
        setTransactions((prev) => [
          ...prev,
          {
            type: event.returnValues.type,
            details: event.returnValues.details,
            timestamp: new Date(event.returnValues.timestamp * 1000).toLocaleString(),
          },
        ]);
      }
    });

    return () => {
      // Cleanup listener on component unmount
      if (eventListener.unsubscribe) {
        eventListener.unsubscribe();
      }
    };
  }, [contract, account]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold underline text-black">Transaction History</h2>
      <ul className="mt-4">
        {transactions.length > 0 ? (
          transactions.map((tx, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg"
            >
              <span className="text-teal-600 font-semibold">{tx.type}</span>
              <span>{tx.details}</span>
              <span className="text-gray-500 text-sm">{tx.timestamp}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No transactions found.</p>
        )}
      </ul>
    </div>
  );
};

export default TransactionHistory;
