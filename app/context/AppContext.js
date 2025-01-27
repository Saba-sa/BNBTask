"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import appReducer from "./appReducer";
import Web3 from "web3";
import { contractABI, contractAddress } from "../utils/contractConfig";

const AppContext = createContext();

const initialState = {
  provider: null,
  account: null,
  readOnlyContract: null, // For read-only operations
  writeContract: null, // For write operations
  balance: null,
  deploymentTimestamp: null,
  gameIsStarted: false,
  isInitialized: false,
};

  const BSC_RPC_URL = "https://bsc-dataseed.bnbchain.org";

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize Web3 instances
  const initializeWeb3 = async (provider) => {
    let publicWeb3, walletWeb3;

    try {
      // Public RPC Web3 instance (for read-only operations)
      publicWeb3 = new Web3(new Web3.providers.HttpProvider(BSC_RPC_URL));

      // Wallet Provider Web3 instance (for write operations)
      if (provider) {
        walletWeb3 = new Web3(provider);
        await provider.request({ method: "eth_requestAccounts" }); // Request account access
      } else {
        toast.warn("No wallet provider detected. Write operations will not work.");
      }
    } catch (error) {
      console.error("Error initializing Web3:", error);
      toast.error("Failed to initialize Web3.");
    }

    return { publicWeb3, walletWeb3 };
  };

  // Initialize the smart contracts
  const initializeContracts = async (publicWeb3, walletWeb3) => {
    try {
      // Read-only contract instance (public RPC)
      const readOnlyContract = new publicWeb3.eth.Contract(
        contractABI,
        contractAddress
      );

      // Write contract instance (wallet provider)
      let writeContract = null;
      if (walletWeb3) {
        writeContract = new walletWeb3.eth.Contract(
          contractABI,
          contractAddress
        );
        writeContract.options.from = walletWeb3.eth.defaultAccount; // Set the sender address
      }

      dispatch({ type: "READ_ONLY", payload: readOnlyContract });
      dispatch({ type: "WRITE_ONLY", payload: writeContract });
      console.log("Contracts initialized:", {
        readOnlyContract,
        writeContract,
      });
    } catch (error) {
      console.error("Error initializing contracts:", error);
      toast.error("Failed to initialize contracts.");
    }
  };

  // Fetch the balance of an account
  const fetchBalance = async (account) => {
    if (account) {
      try {
        const web3 = new Web3(
          new Web3.providers.HttpProvider(BSC_RPC_URL)
        );
        const balance = await web3.eth.getBalance(account);
        const balanceInEther = web3.utils.fromWei(balance, "ether");
        dispatch({ type: "SET_BALANCE", payload: balanceInEther });
        console.log("Fetched balance:", balanceInEther);
      } catch (error) {
        console.error("Error fetching balance:", error);
        toast.error("Failed to fetch balance.");
      }
    } else {
      toast.error("No account connected. Cannot fetch balance.");
    }
  };

  // Handle account changes from MetaMask
  const handleAccountsChanged = async (accounts) => {
    try {
      if (accounts.length > 0) {
        dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });
        await fetchBalance(accounts[0]); // Fetch balance for the new account
        toast.success(`Account changed: ${accounts[0]}`);
      } else {
        dispatch({ type: "SET_ACCOUNT", payload: null });
        toast.warn("No accounts connected.");
      }
    } catch (error) {
      console.error("Error handling account change:", error);
      toast.error("Failed to handle account change.");
    }
  };

  // Connect to a wallet provider
  const connectWallet = async (provider) => {
    try {
      const { publicWeb3, walletWeb3 } = await initializeWeb3(provider);
      await initializeContracts(publicWeb3, walletWeb3);

      if (provider) {
        const accounts = await provider.request({ method: "eth_requestAccounts" });
        if (accounts.length > 0) {
          dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });
          await fetchBalance(accounts[0]);
        }
      }

      dispatch({ type: "SET_INITIALIZED", payload: true });
      console.log("Blockchain initialized.");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet.");
    }
  };

  useEffect(() => {
    // Listen for account changes if MetaMask is available
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    // Cleanup the listener on unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, connectWallet }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);