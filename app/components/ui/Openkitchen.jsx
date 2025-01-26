"use client";
import { useAppContext } from '@/app/context/AppContext';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

 

  const OpenKitchen = () => {
    const { state, dispatch } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
  
    const kitchen = async () => {
      if (!state.account) {
        alert('Please connect your wallet first.');
        return;
      }
  
      setIsLoading(true);
      try {
        console.log('Checking contract and account...');
        if (!state.writeContract || !state.account) {
          throw new Error('Contract or account not initialized');
        }
  
        console.log('Fetching CEO address...');
        const ceoAddress = await state.readOnlyContract.methods.ceoAddress().call();
        console.log('CEO Address:', ceoAddress);
        console.log('Current Account:', state.account);
  
        if (state.account.toLowerCase() !== ceoAddress.toLowerCase()) {
          throw new Error('Only the CEO can open the kitchen');
        }
  
        console.log('Estimating gas...');
        const gasEstimate = await state.writeContract.methods.openKitchen().estimateGas({ from: state.account });
   
        console.log('Sending transaction...');
        const receipt = await state.writeContract.methods
          .openKitchen()
          .send({ from: state.account, gas: gasEstimate });
        console.log('Transaction Receipt:', receipt);
  
        dispatch({ type: 'START_GAME', payload: true });
        if(receipt){
          toast.success('Game started successfully!');
        }
      } catch (error) {
        console.error('Error starting game:', error);
        alert('Error starting game: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
        {state.account && (
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