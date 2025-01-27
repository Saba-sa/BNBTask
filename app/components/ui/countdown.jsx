"use client";
import { useAppContext } from "@/app/context/AppContext";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Web3 from "web3";
import { toast } from "react-toastify";

const Countdown = () => {
  const { state, dispatch } = useAppContext();
  const contractDeploymentTimestamp = state?.deploymentTimestamp || 0;
  const contractAddress = '0x54594b92dD6497e602e2fd0977F9Af1d78806e7a';
  const transactionHash = "0x910d21a4427af36b3fc5031228cb21b2e0e174c192d3f3822ec8185d557b8ba2";

  const [balance, setBalance] = useState('0');
  const [elapsedTime, setElapsedTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
  });
  const [message, setMessage] = useState("");
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!contractDeploymentTimestamp) {
      setMessage("No deployment timestamp found.");
      return;
    }

    const calculateElapsedTime = () => {
      const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
      const differenceInSeconds = now - contractDeploymentTimestamp;

      if (differenceInSeconds < 0) {
        setMessage("Contract deployment is in the future.");
        setShowLoader(false);
        setElapsedTime({ years: 0, months: 0, days: 0, hours: 0 });
        return;
      }

      setMessage("");

      const years = Math.floor(differenceInSeconds / (365 * 24 * 60 * 60));
      const months = Math.floor(
        (differenceInSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)
      );
      const days = Math.floor(
        (differenceInSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60)
      );
      const hours = Math.floor(
        (differenceInSeconds % (24 * 60 * 60)) / (60 * 60)
      );

      setElapsedTime({ years, months, days, hours });
    };

    calculateElapsedTime();
    const interval = setInterval(calculateElapsedTime, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [contractDeploymentTimestamp]);

  const getBalance = async () => {
    const BSC_RPC_URL = "https://bsc-dataseed.bnbchain.org";
    const web3 = new Web3(BSC_RPC_URL);

    if (typeof web3 !== 'undefined') {
      try {
        const balanceWei = await web3.eth.getBalance(contractAddress);
        const balanceEther = Web3.utils.fromWei(balanceWei, 'ether');
        setBalance(balanceEther);

        const transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
        if (!transactionReceipt) {
          console.error('Transaction receipt not found for the hash:', transactionHash);
          setShowLoader(false);
          toast.error("Transaction receipt not found.");
          return;
        }

        const block = await web3.eth.getBlock(transactionReceipt.blockNumber);
        const deploymentTimestamp = block.timestamp;
        dispatch({ type: 'SET_DEPLOYMENTTIMESTAMP', payload: Number(deploymentTimestamp) });
        setShowLoader(false);
      } catch (error) {
        console.error('Error fetching contract balance:', error);
        setShowLoader(false);
        toast.error("Failed to fetch contract balance.");
      }
    } else {
      console.error('Web3 is not initialized correctly');
      setShowLoader(false);
      toast.error("Web3 is not initialized correctly.");
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="container mx-auto max-w-md shadow-md">
      <div className="p-8 text-center sm:p-10 bg-black opacity-90 sm:rounded-xl">
        {showLoader ? (
          <Loader className="text-gray-400 w-full h-[80]" />
        ) : (
          <>
            <h1 className="text-teal-500 text-2xl font-bold underline">Flawlessly Operating:</h1>
            {message ? (
              <p className="text-red-500">{message}</p>
            ) : (
              <div className="flex gap-2 mt-2 text-teal-500 justify-center text-xl">
                <p className="flex flex-col">
                  <span>{elapsedTime.years}</span>YEARS
                </p>
                <p>:</p>
                <p className="flex flex-col">
                  <span>{elapsedTime.months}</span>MONTHS
                </p>
                <p>:</p>
                <p className="flex flex-col">
                  <span>{elapsedTime.days}</span>DAYS
                </p>
                <p>:</p>
                <p className="flex flex-col text-red-500">
                  <span>{elapsedTime.hours}</span>HOURS
                </p>
              </div>
            )}
            <span className="text-sm text-gray-500 inline-block mt-4">
              {elapsedTime.years}-Year Solid Immutable Contract - New Ecosystem!
            </span>
            <button className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300">
              Contract Balance: {balance.slice(0, 5)} BNB
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Countdown;