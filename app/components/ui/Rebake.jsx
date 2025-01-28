"use client";
import { useAppContext } from '@/app/context/AppContext';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { toast } from 'react-toastify';

const Rebake = ({ setOwnerBalance, refAddress }) => {
  const { state, dispatch } = useAppContext();
  const [web3, setWeb3] = useState(null);
  const [buttonText, setButtonText] = useState('Rebake');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  const rebake = async () => {
    setButtonText('Loading...');

    try {
      const gasEstimate = await state.writeContract.methods
        .rebakePizza(refAddress || '0x0000000000000000000000000000000000000000')
        .estimateGas({ from: state.account });

      await state.writeContract.methods
        .rebakePizza(refAddress || '0x0000000000000000000000000000000000000000')
        .send({ from: state.account, gas: gasEstimate });

      const myMiners = await state.writeContract.methods.getMyMiners().call({ from: state.account });
      const myEggs = await state.writeContract.methods.getMyEggs().call({ from: state.account });

      setOwnerBalance({
        eggs: myEggs,
        miners: myMiners,
      });

      const balance = await web3.eth.getBalance(state.account);
      dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') });
      const userEggs = await state.readOnlyContract.methods.getMyEggs().call({ from: state.account });
      const bnbValue = await state.readOnlyContract.methods.calculateEggSell(userEggs).call();
      setBnbInBarrel(parseFloat(web3.utils.fromWei(bnbValue, 'ether')));
      setButtonText('Success');
      toast.success('Eggs rebaked successfully!');
    } catch (error) {
      toast.error('Error rebaking eggs:');
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
        setButtonText('Rebake');
      }, 2000);
    }
  };

  return (
    <button
      className="w-full bg-teal-500 text-white py-2 rounded-md mb-3 uppercase"
      onClick={rebake}
      disabled={buttonText === 'Loading...'}
    >
      {buttonText}
    </button>
  );
};

export default Rebake;