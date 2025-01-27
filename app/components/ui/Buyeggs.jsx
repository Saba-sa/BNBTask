"use client";
import { useAppContext } from '@/app/context/AppContext';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { toast } from 'react-toastify';

const Buyeggs = ({ setOwnerBalance, ethAmount, setEthAmount }) => {
  const { state, dispatch } = useAppContext();
  const [web3, setWeb3] = useState(null);
  const [buttonText, setButtonText] = useState('Bake Pizza');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    } else {
      toast.error('Please install MetaMask or another Ethereum wallet.');
    }
  }, []);

  const validateInput = () => {
    const parsedEthAmount = parseFloat(ethAmount);
    if (!parsedEthAmount || isNaN(parsedEthAmount) || parsedEthAmount <= 0) {
      toast.error('Please enter a valid amount.');
      return false;
    }
    // Ensure the amount is at least 0.005 BNB
    if (parsedEthAmount < 0.005) {
      toast.error('Minimum amount is 0.005 BNB.');
      return false;
    }
    return true;
  };

  const checkBalance = async (weiValue) => {
    const userBalance = await web3.eth.getBalance(state.account);
    const gasPrice = await web3.eth.getGasPrice();

    const gasEstimate = await state.writeContract.methods
      .bakePizza(state.account) // Use the user's address as the referral
      .estimateGas({ from: state.account, value: weiValue });

    // Convert all values to BigInt for arithmetic operations
    const totalCost = BigInt(weiValue) + BigInt(gasEstimate) * BigInt(gasPrice);

    if (BigInt(userBalance) < totalCost) {
      toast.error('Insufficient balance to complete the transaction.');
      return false;
    }
    return true;
  };

  const sendTransaction = async (weiValue) => {
    const gasEstimate = await state.writeContract.methods
      .bakePizza(state.account) // Use the user's address as the referral
      .estimateGas({ from: state.account, value: weiValue });

    // Convert gasEstimate to BigInt and add a 20% buffer
    const gasEstimateBigInt = BigInt(gasEstimate);
    const gasWithBuffer = (gasEstimateBigInt * BigInt(120)) / BigInt(100); // 20% buffer

    const receipt = await state.writeContract.methods
      .bakePizza(state.account) // Use the user's address as the referral
      .send({ from: state.account, value: weiValue, gas: gasWithBuffer.toString() });

    return receipt;
  };

  const buyEggs = async () => {
    setButtonText('Loading...');

    if (!validateInput()) {
      setButtonText('Bake Pizza');
      return;
    }

    const parsedEthAmount = parseFloat(ethAmount);
    const weiValue = Web3.utils.toWei(parsedEthAmount.toString(), 'ether');

    if (!(await checkBalance(weiValue))) {
      setButtonText('Bake Pizza');
      return;
    }

    try {
      const receipt = await sendTransaction(weiValue);

      if (receipt.status) {
        const balance = await web3.eth.getBalance(state.account);
        dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') });
        setEthAmount(0);

        const myMiners = await state.writeContract.methods.getMyMiners().call({ from: state.account });
        const myEggs = await state.writeContract.methods.getMyEggs().call({ from: state.account });

        setOwnerBalance({
          eggs: myEggs,
          miners: myMiners,
        });

        setButtonText('Success');
        toast.success('Eggs purchased successfully!');
      } else {
        throw new Error('Transaction failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error buying eggs');
      setButtonText('Failed');

      if (error.code === 4001) {
        toast.error('Transaction rejected by user.');
      } else if (error.message.includes('revert')) {
        const revertReason = error.message.split('revert ')[1] || 'Unknown reason';
        toast.error('Transaction failed: ' + revertReason);
      } else if (error.message.includes('Internal JSON-RPC error')) {
        toast.error('Network error. Please try again.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setTimeout(() => {
        setButtonText('Bake Pizza');
      }, 2000);
    }
  };

  return (
    <button
      className="w-full bg-teal-500 text-white py-2 rounded-md mb-3 uppercase"
      onClick={buyEggs}
      disabled={buttonText === 'Loading...' || buttonText === 'Success'}
    >
      {buttonText}
    </button>
  );
};

export default Buyeggs;