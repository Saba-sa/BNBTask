"use client";
import { useAppContext } from '@/app/context/AppContext';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { toast } from 'react-toastify';

const Buyeggs = ({ setOwnerBalance, ethAmount, refAddress, setEthAmount }) => {
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
    return true;
  };

  const checkBalance = async (weiValue) => {
    const userBalance = await web3.eth.getBalance(state.account);
    if (BigInt(userBalance) < BigInt(weiValue)) {
      toast.error('Insufficient balance to complete the transaction.');
      return false;
    }
    return true;
  };

  const sendTransaction = async (weiValue, tempRef) => {
    const gasEstimate = await state.writeContract.methods
      .bakePizza(tempRef)
      .estimateGas({ from: state.account, value: weiValue });

    const gasWithBuffer = Math.floor(gasEstimate * 1.2); // Add 20% buffer

    const receipt = await state.writeContract.methods
      .bakePizza(tempRef)
      .send({ from: state.account, value: weiValue, gas: gasWithBuffer });

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

    let tempRef;
    const referrals = await state.readOnlyContract.methods.referrals(state.account).call();
    if (referrals === '0x0000000000000000000000000000000000000000') {
      tempRef = refAddress;
    } else {
      tempRef = referrals;
    }

    try {
      const receipt = await sendTransaction(weiValue, tempRef);

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