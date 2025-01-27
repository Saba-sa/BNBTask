"use client";
import { useAppContext } from '@/app/context/AppContext';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const OpenKitchen = () => {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isCEO, setIsCEO] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkIfCEOAndInitialized = async () => {
      if (state.account && state.readOnlyContract) {
        try {
          // Check if the connected account is the CEO
          const ceoAddress = await state.readOnlyContract.methods.ceoAddress().call();
          setIsCEO(state.account.toLowerCase() === ceoAddress.toLowerCase());

          // Check if the game is already initialized
          const initialized = await state.readOnlyContract.methods.initialized().call();
          setIsInitialized(initialized);
        } catch (error) {
           toast.error('Failed to fetch contract data.');
        }
      }
    };

    checkIfCEOAndInitialized();
  }, [state.account, state.readOnlyContract]);

  const kitchen = async () => {
    if (!state.account) {
      toast.error('Please connect your wallet first.');
      return;
    }

    setIsLoading(true);
    try {
      if (!state.writeContract || !state.account) {
        throw new Error('Contract or account not initialized');
      }

      const ceoAddress = await state.readOnlyContract.methods.ceoAddress().call();
      if (state.account.toLowerCase() !== ceoAddress.toLowerCase()) {
        throw new Error('Only the CEO can open the kitchen');
      }

      const gasEstimate = await state.writeContract.methods.openKitchen().estimateGas({ from: state.account });

      const receipt = await state.writeContract.methods
        .openKitchen()
        .send({ from: state.account, gas: gasEstimate });

      dispatch({ type: 'START_GAME', payload: true });
      if (receipt) {
        toast.success('Game started successfully!');
        setIsInitialized(true); // Update the initialized state
      }
    } catch (error) {
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
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isCEO && !isInitialized && (
        <button
          className="w-full bg-teal-500 text-white py-3 rounded-md text-lg font-bold"
          onClick={kitchen}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Open Kitchen!'}
        </button>
      )}
    </div>
  );
};

export default OpenKitchen;