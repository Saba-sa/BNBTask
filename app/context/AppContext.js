"use client"
import { createContext, useContext, useReducer, useEffect } from 'react';
import appReducer from './appReducer';
import Web3 from 'web3';
import { contractABI, contractAddress } from '../utils/contractConfig'; // Add the transaction hash

const AppContext = createContext();

const initialState = {
  provider: null,
  signer: null,
  account: null,
  contract: null,
  balance: null,
  deploymentTimestamp: null,
   gameIsStarted:false,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
console.log('conatcas',contractAddress,contractABI)
  useEffect(() => {
    let web3;
    const initializeBlockchain = async () => {
      if (window.ethereum) {
        try {
          web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.requestAccounts();
 
        
           dispatch({ type: 'SET_PROVIDER', payload: window.ethereum });
          dispatch({ type: 'SET_ACCOUNT', payload: accounts[0] });
           
          const balance = await web3.eth.getBalance(accounts[0]);
          dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') });

          const contract = new web3.eth.Contract(contractABI, contractAddress);
          console.log('contact ',contract)
          dispatch({ type: 'SET_CONTRACT', payload: contract });
        } catch (error) {
          console.error("Error initializing blockchain:", error);
        }
      } else {
        console.error("Ethereum provider not found. Please install MetaMask.");
      }
    };

    initializeBlockchain();
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length > 0) {
        dispatch({ type: 'SET_ACCOUNT', payload: accounts[0] });

        if (web3) {
          const balance = await web3.eth.getBalance(accounts[0]);
          dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') });
        }
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

     return () => {
      window.ethereum.removeListener('accountsChanged', () => {});
    };
  }, [state.account]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
