"use client";
import { useAppContext } from '@/app/context/AppContext';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { toast } from 'react-toastify';

const Buyeggs = ({ setOwnerBalance, ethAmount, refAddress, setEthAmount }) => {
  const { state, dispatch } = useAppContext();
  const [web3, setWeb3] = useState(null);
  const [buttonText, setButtonText] = useState('Bake Pizza');
  const [isProcessing, setIsProcessing] = useState(false);

  // BSC Mainnet Configuration
  const BSC_MAINNET = {
    chainId: '0x38', // 56 in decimal
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc.nodereal.io'], // BSC Mainnet RPC
    blockExplorerUrls: ['https://bscscan.com/'], // BSC Mainnet Explorer
  };

  const initializeWeb3 = async () => {
    try {
      // Check for MetaMask
      if (window.ethereum) {
        setWeb3(new Web3(window.ethereum));
        return;
      }
      toast.error('Please install MetaMask');
    } catch (error) {
       toast.error('Failed to connect to wallet');
    }
  };

  useEffect(() => {
    initializeWeb3();
  }, []);

  const checkNetwork = async () => {
    try {
      const provider = window.ethereum;
      if (!provider) {
        toast.error('No wallet detected');
        return false;
      }

      const chainId = await provider.request({ method: 'eth_chainId' });
      if (chainId !== BSC_MAINNET.chainId) {
        // For MetaMask
        if (window.ethereum) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: BSC_MAINNET.chainId }],
            });
            return true;
          } catch (switchError) {
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [BSC_MAINNET],
                });
                return true;
              } catch (addError) {
                toast.error('Please switch to Binance Smart Chain Mainnet');
                return false;
              }
            }
          }
        }
      }
      return true;
    } catch (error) {
       toast.error('Network check failed');
      return false;
    }
  };

  const validateInput = () => {
    try {
      const parsedEthAmount = parseFloat(ethAmount);

      // Check if the input is a valid number and greater than 0
      if (isNaN(parsedEthAmount) || parsedEthAmount <= 0) {
        toast.error('Please enter a valid amount');
        return false;
      }

      // Check if the input meets the minimum requirement
      if (parsedEthAmount < 0.005) {
        toast.error('Minimum amount is 0.005 BNB');
        return false;
      }

      return true;
    } catch (error) {
       toast.error('Invalid input amount');
      return false;
    }
  };

  const checkBalance = async (weiValue) => {
    try {
      const userBalance = await web3.eth.getBalance(state.account);
      const gasPrice = await web3.eth.getGasPrice();
      const gasPriceWithBuffer = BigInt(gasPrice) * BigInt(120) / BigInt(100);

      // Adjust gas estimate based on the value being sent
      const parsedEthAmount = parseFloat(ethAmount);
      const isLargeValue = parsedEthAmount >= 1; // Check if value is 1 BNB or more

      try {
        const gasEstimate = await state.writeContract.methods
          .bakePizza(state.account)
          .estimateGas({ 
            from: state.account, 
            value: weiValue,
            gasPrice: gasPriceWithBuffer.toString()
          });

        // Increase gas estimate for large values
        const adjustedGasEstimate = isLargeValue ? BigInt(gasEstimate) * BigInt(2) : BigInt(gasEstimate);

        const totalCost = BigInt(weiValue) + adjustedGasEstimate * BigInt(gasPriceWithBuffer);

        if (BigInt(userBalance) < totalCost) {
          toast.error('Insufficient BNB balance');
          return false;
        }
        return true;
      } catch (error) {
         toast.error('Failed to estimate transaction cost. Please try again.');
        return false;
      }
    } catch (error) {
       toast.error('Failed to check balance');
      return false;
    }
  };

  const sendTransaction = async (weiValue) => {
    try {
      const referrals = await state.readOnlyContract.methods.referrals(state.account).call();
      const tempRef = referrals === '0x0000000000000000000000000000000000000000' ? refAddress : referrals;
  
      // Adjust gas limit based on the value being sent
      const parsedEthAmount = parseFloat(ethAmount);
      const isLargeValue = parsedEthAmount >= 1; // Check if value is 1 BNB or more
      const gasLimit = isLargeValue ? '500000' : '300000'; // Reduced gas limit
  console.log('gasLimit', gasLimit)
      const receipt = await state.writeContract.methods
        .bakePizza(tempRef)
        .send({ 
          from: state.account, 
          value: weiValue,
          gas: gasLimit // Use adjusted gas limit
        });
  
      return receipt;
    } catch (error) {
       throw error;
    }
  };

  const buyEggs = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setButtonText('Loading...');

    try {
      // Check network first
      if (!(await checkNetwork())) {
        throw new Error('Wrong network');
      }

      // Validate input
      if (!validateInput()) {
        throw new Error('Invalid input');
      }

      const parsedEthAmount = parseFloat(ethAmount);
      const weiValue = Web3.utils.toWei(parsedEthAmount.toString(), 'ether');

      // Check balance
      if (!(await checkBalance(weiValue))) {
        throw new Error('Balance check failed');
      }

      // Send transaction
      const receipt = await sendTransaction(weiValue);
      
      if (receipt.status) {
        const [balance, myMiners, myEggs] = await Promise.all([
          web3.eth.getBalance(state.account),
          state.writeContract.methods.getMyMiners().call({ from: state.account }),
          state.writeContract.methods.getMyEggs().call({ from: state.account })
        ]);

        dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') });
        setEthAmount(0);
        
        setOwnerBalance({
          eggs: myEggs,
          miners: myMiners,
        });
        
        setButtonText('Success');
        toast.success('Transaction successful!');
      }
    } catch (error) {
      setButtonText('Failed');
      
      if (error.message === 'Wrong network') {
        return;
      }
      
      if (error.code === 4001) {
        toast.error('Transaction rejected by user');
      } else if (error.message.includes('revert')) {
        const revertReason = error.message.split('revert ')[1] || 'Transaction reverted';
        toast.error(revertReason);
      } else if (error.message.includes('insufficient funds')) {
        toast.error('Insufficient BNB balance');
      } else {
        toast.error('Transaction failed. Please try again');
      }
    } finally {
      setTimeout(() => {
        setButtonText('Bake Pizza');
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <button
      className="w-full bg-teal-500 text-white py-2 rounded-md mb-3 uppercase"
      onClick={buyEggs}
      disabled={isProcessing || buttonText === 'Success'}
    >
      {buttonText}
    </button>
  );
};

export default Buyeggs;