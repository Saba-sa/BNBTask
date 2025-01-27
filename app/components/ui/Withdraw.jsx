"use client";
import { useAppContext } from '@/app/context/AppContext';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Web3 from 'web3';

const Withdraw = ({ setOwnerBalance }) => {
  const { state, dispatch } = useAppContext();
  const [web3, setWeb3] = useState(null);
  const [buttonText, setButtonText] = useState('Withdraw');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  const withdrawRewards = async () => {
    try {
      setButtonText('Loading...');

      const contractBalance = await web3.eth.getBalance(state.writeContract.options.address);
      console.log('Contract Balance:', web3.utils.fromWei(contractBalance, 'ether'));

      const isInitialized = await state.readOnlyContract.methods.initialized().call();
      console.log('Is Initialized:', isInitialized);

      const myEggs = await state.readOnlyContract.methods.getMyEggs().call({ from: state.account });
      console.log('My Eggs:', myEggs);

      if (myEggs <= 0) {
        throw new Error('No eggs to withdraw');
      }

      const gasEstimate = await state.writeContract.methods
        .eatPizza()
        .estimateGas({ from: state.account });

      const gasIncreaseFactor = BigInt(12); // 1.2 * 10 = 12
      const increasedGasEstimate = (gasEstimate * gasIncreaseFactor) / BigInt(10);

      const receipt = await state.writeContract.methods
        .eatPizza()
        .send({ from: state.account, gas: increasedGasEstimate });

      const balance = await web3.eth.getBalance(state.account);
      dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') });

      if (receipt) {
        const myMiners = await state.readOnlyContract.methods.getMyMiners().call({ from: state.account });
        const myEggs = await state.readOnlyContract.methods.getMyEggs().call({ from: state.account });
        setOwnerBalance({
          eggs: myEggs,
          miners: myMiners,
        });
      }

      setButtonText('Success');
      toast.success('Rewards withdrawn successfully!');
    } catch (error) {
      toast.error('withdraw error');
      setButtonText('Failed');

      if (error.code === 4001) {
        toast.error('Transaction rejected by user.');
      } else if (error.message.includes('revert')) {
        toast.error('Transaction failed: ' + error.message.split('revert ')[1]);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setTimeout(() => {
        setButtonText('Withdraw');
      }, 2000);
    }
  };

  return (
    <button
      className="w-full bg-teal-500 text-white py-2 rounded-md mb-3 uppercase"
      onClick={withdrawRewards}
      disabled={buttonText === 'Loading...'}
    >
      {buttonText}
    </button>
  );
};

export default Withdraw;