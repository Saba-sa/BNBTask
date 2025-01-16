"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import appReducer from "./appReducer";
import Web3 from "web3";
import { contractABI, contractAddress } from "../utils/contractConfig";

const AppContext = createContext();

const initialState = {
  provider: null,
  account: null,
  contract: null,
  balance: null,
  deploymentTimestamp: null,
  gameIsStarted: false,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    let web3;

    const BSC_RPC_URL = "https://bsc-dataseed.binance.org/";
 
     const initializeBlockchain = async () => {
      try {
        if (window.ethereum) {
           web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
          dispatch({ type: "SET_PROVIDER", payload: window.ethereum });
          dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });
         } else {
           web3 = new Web3(BSC_RPC_URL);
          
          dispatch({ type: "SET_PROVIDER", payload: BSC_RPC_URL });
          console.warn(
            "MetaMask not detected. Connected to Binance Smart Chain RPC."
          );
        }
        web3 = new Web3(BSC_RPC_URL);
         const contract = new web3.eth.Contract(contractABI, contractAddress);
        dispatch({ type: "SET_CONTRACT", payload: contract });
        console.log('contract',contract)
        const ceoAddress = await contract?.methods.ceoAddress().call();
  if (state.account) {
  const balance = await web3.eth.getBalance(state.account);
           dispatch({
            type: "SET_BALANCE",
            payload: web3.utils.fromWei(balance, "ether"),
          });
        }
      } catch (error) {
        console.error("Error initializing blockchain:", error);
      }
    };

    initializeBlockchain();

    // Handle account changes in MetaMask
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });
      } else {
        console.warn("No accounts connected.");
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [state.account]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
