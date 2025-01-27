"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/app/context/AppContext";
import { toast } from "react-toastify";

const EggProgressBar = () => {
  const { state } = useAppContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // Fetch eggs as BigInt
        const myEggs = await state.readOnlyContract.methods.getMyEggs().call({ from: state.account });
  
        // Convert BigInt to Number
        const eggsNumber = Number(myEggs);
  
        // Calculate progress (ensure it doesn't exceed 100%)
        const progress = Math.min((eggsNumber / 864000) * 100, 100); // EGGS_TO_HATCH_1MINERS = 864000
        setProgress(progress);
      } catch (error) {
        toast.error("Error fetching progress:");
      }
    };
  
    if (state.readOnlyContract && state.account) {
      fetchProgress();
    }
  }, [state.readOnlyContract, state.account, state.balance]); // Add state.balance as a dependency
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Egg Accumulation Progress</h2>
      <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-orange-500">
        <div
          className="bg-orange-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm">{progress.toFixed(2)}% to next miner</p>
    </div>
  );
};

export default EggProgressBar;