"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/app/context/AppContext";
import { toast } from "react-toastify";

const EggProgressBar = ({ setOwnerBalance }) => {
  const { state } = useAppContext();
  const [minersCount, setMinersCount] = useState(0); // Track miners
  const [eggsCount, setEggsCount] = useState(0); // Track eggs

  // Fetch live data from the contract
  const fetchData = async () => {
    try {
      if (!state.readOnlyContract || !state.account) return;

      // Fetch current eggs and miners
      const myEggs = await state.readOnlyContract.methods.getMyEggs().call({ from: state.account });
      const myMiners = await state.readOnlyContract.methods.getMyMiners().call({ from: state.account });

      // Update state
      setEggsCount(Number(myEggs));
      setMinersCount(Number(myMiners));
    } catch (error) {
      toast.error("Error fetching data:");
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up an interval to update data every second
    const interval = setInterval(fetchData, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [state.readOnlyContract, state.account]);

  // Update owner balance or other external states if needed
  useEffect(() => {
    if (setOwnerBalance) {
      setOwnerBalance({ eggs: eggsCount, miners: minersCount });
    }
  }, [minersCount, eggsCount, setOwnerBalance]);

  return (
    <div className="mt-4">
     

      {/* Display a message if the user has no miners */}
      {minersCount === 0 && (
        <p className="mt-2 text-sm text-red-500">
          You have no miners. Buy or hatch eggs to start generating eggs!
        </p>
      )}

       {minersCount > 0 && eggsCount === 0 && (
        <p className="mt-2 text-sm text-yellow-500">
          Your eggs count is not increasing. Try hatching or selling eggs to update the last hatch time.
        </p>
      )}
    </div>
  );
};

export default EggProgressBar;