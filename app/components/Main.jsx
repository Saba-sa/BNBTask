"use client";
import { useAppContext } from "@/app/context/AppContext";
import Countdown from "./ui/countdown";
import ImagesMain from "./ui/mainimages";
import CompoundUI from "./ui/Compoundmain";
import ModelExplainReules from "./ui/ModelExplainReules";
import Socialmedialinks from "./ui/Socialmedialinks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EggProgressBar from "./ui/EggProgressBar";
 
const Main = () => {
  const { state } = useAppContext();
  const [modalShow, setModalShow] = useState(false);
  const [ownerBalance, setOwnerBalance] = useState({
    eggs: 0,
    miners: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOwnerBalance = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      // Ensure contract and account are available
      if (!state.readOnlyContract || !state.account) {
        throw new Error("Contract or account not initialized.");
      }

      // Fetch miners and eggs
      const myMiners = await state.readOnlyContract.methods
        .getMyMiners()
        .call({ from: state.account });

      const myEggs = await state.readOnlyContract.methods
        .getMyEggs()
        .call({ from: state.account });

      // Update owner balance
      setOwnerBalance({
        eggs: myEggs,
        miners: myMiners,
      });

      toast.success("Miners and eggs values fetched successfully");
    } catch (error) {
      toast.error("Error fetching balance:", error);

      // Handle specific error cases
      if (error.message.includes("revert")) {
        setError("Transaction failed: " + error.message.split("revert ")[1]);
      } else if (error.code === 4001) {
        setError("Transaction rejected by user.");
      } else {
        setError("Failed to fetch balance. Please try again.");
      }

      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.readOnlyContract && state.account) {
      fetchOwnerBalance();
    }
  }, [state.readOnlyContract, state.account]);

  const showDetails = () => {
    setModalShow(true);
  };

  return (
    <div className="flex items-center">
      <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
        <ImagesMain />
        <Countdown />
        <div className="p-2 sm:p-4 flex flex-col bg-teal-500 text-white my-2 sm:rounded-lg">
          <p>
            Address: {state?.account?.slice(0, 3)}....{state?.account?.slice(-3)} (
            {state?.balance || "0"} BNB)
          </p>
          {loading ? (
            <p>Loading balance...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <p>
                <span>{ownerBalance.miners}</span> Miners
              </p>
              <p>
                <span>{ownerBalance.eggs}</span> Eggs
              </p>
            </>
          )}
  {state.account &&<EggProgressBar  setOwnerBalance={setOwnerBalance}/>}
        </div>

        <CompoundUI setOwnerBalance={setOwnerBalance} />
        <ModelExplainReules
          isOpen={modalShow}
          closeModal={() => setModalShow(false)}
        />
        <button
          className="w-full my-2 bg-teal-500 text-white py-4 rounded-md mb-3 uppercase"
          onClick={showDetails}
        >
          Get Started
        </button>
        <Socialmedialinks />
       </div>
    </div>
  );
};

export default Main;