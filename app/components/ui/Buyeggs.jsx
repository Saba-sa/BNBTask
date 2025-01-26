"use client";
import { useAppContext } from '@/app/context/AppContext';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { toast } from 'react-toastify';

const Buyeggs = ({ setOwnerBalance, ethAmount, refAddress }) => {
  const { state, dispatch } = useAppContext();
  const [err, setErr] = useState('');
  const [web3, setWeb3] = useState(null);
  const [buttonText, setButtonText] = useState('Bake Pizza');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  const buyEggs = async () => {
    setErr('');
    setButtonText('Loading...');

    // Validate input amount
    const parsedEthAmount = parseFloat(ethAmount);
    if (!parsedEthAmount || isNaN(parsedEthAmount) || parsedEthAmount <= 0) {
      toast.error('Please enter a valid amount.');
      setButtonText('Bake Pizza');
      return;
    }

    try {
      const weiValue = Web3.utils.toWei(parsedEthAmount.toString(), 'ether');

      // Check user balance
      const userBalance = await web3.eth.getBalance(state.account);
      if (BigInt(userBalance) < BigInt(weiValue)) {
        toast.error('Insufficient balance to complete the transaction.');
        setButtonText('Bake Pizza');
        return;
      }

      // Estimate gas
      const gasEstimate = await state.writeContract.methods
        .bakePizza(refAddress || '0x0000000000000000000000000000000000000000')
        .estimateGas({ from: state.account, value: weiValue });

      // Increase gas limit by 20% to avoid out-of-gas errors
      const increasedGasEstimate = Math.floor(gasEstimate * 1.2);

      // Send transaction with increased gas limit
      const receipt = await state.writeContract.methods
        .bakePizza(refAddress || '0x0000000000000000000000000000000000000000')
        .send({ from: state.account, value: weiValue, gas: increasedGasEstimate });

      // Check if the transaction was successful
      if (receipt.status) {
        // Fetch updated balance
        const balance = await web3.eth.getBalance(state.account);
        dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') });

        // Fetch updated miners and eggs
        const myMiners = await state.writeContract.methods.getMyMiners().call({ from: state.account });
        const myEggs = await state.writeContract.methods.getMyEggs().call({ from: state.account });

        // Update owner balance
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
      console.error('Error buying eggs:', error);
      setButtonText('Failed');

      // Handle specific error cases
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
      disabled={buttonText === 'Loading...'}
    >
      {buttonText}
    </button>
  );
};

export default Buyeggs;