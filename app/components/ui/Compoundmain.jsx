"use client";
import { useAppContext } from '@/app/context/AppContext';
import React, { useState, useEffect } from 'react';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import OpenKitchen from './Openkitchen';
import Buyeggs from './Buyeggs';
import Rebake from './Rebake';
import Withdraw from './Withdraw';
import Web3 from 'web3';
import { contractABI, contractAddress } from '@/app/utils/contractConfig';
import { toast } from 'react-toastify';

const CompoundUI = ({ setOwnerBalance }) => {
  const { state, dispatch } = useAppContext();
  const [refAddress, setRefAddress] = useState('0x0000000000000000000000000000000000000000');
  const [ethAmount, setEthAmount] = useState(0);
  const [err, setErr] = useState('');
  const [startGame, setStartGame] = useState(false);
  const [bnbInBarrel, setBnbInBarrel] = useState(0);

  useEffect(() => {
    const fetchBarrelBalance = async () => {
      console.log('fetching barrel balance');
      try {
        // Check if state.contract and state.contract.readOnlyContract are defined
        if (!state.readOnlyContract || !state.account) {
          console.warn('Contract or account not initialized');
          toast.warn('Contract or account not initialized.');
          return;
        }

        console.log('Component UI - Contract:', state.writeContract);

        // Fetch eggs
        const eggs = await state.readOnlyContract.methods.getMyEggs().call({ from: state.account });
        console.log('Component Eggs:', eggs);

        // Fetch referrals
        const referrals = await state.readOnlyContract.methods.referrals(state.account).call();
        console.log('Component Referrals:', referrals);

        // Fetch CEO address
        const ceoAddress = await state.readOnlyContract.methods.ceoAddress().call();
        console.log('Component CEO Address:', ceoAddress, state.account);

        // Check if the current account is the CEO
        if (state.account.toLowerCase() === ceoAddress.toLowerCase()) {
          setStartGame(true);
        }

        // Set referral address
        setRefAddress(referrals);
      } catch (error) {
        console.error('Error fetching barrel balance:', error);
        setErr('Error fetching barrel balance: ' + error.message);
        toast.error('Failed to fetch barrel balance.');
      }
    };

    if (state.account) {
      fetchBarrelBalance();
    }
  }, [state.readOnlyContract, state.writeContract, state.account]);

  return (
    <div className="flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}>
      <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg max-w-md w-full sm:p-4">
        <h2 className="text-white text-center text-xl font-semibold mb-4">Compound, Pocket, and Hire Daily!</h2>

        <div className="mb-4">
          <label className="text-gray-200 text-sm font-semibold block mb-2">
            <div className="bg-gray-800 text-gray-300 p-2 rounded-md flex items-center justify-around">
              <p>BNB In Barrel:</p>
              <span>{bnbInBarrel} BNB</span>
            </div>
          </label>
        </div>

        {/* Referrer Address */}
        <div className="mb-4 flex bg-gray-400 text-gray-600 w-full items-center px-2 py-1 rounded-xl">
          <label className="text-sm font-semibold w-full">Referrer Address</label>
          <input
            type="text"
            placeholder="0x..."
            value={refAddress}
            onChange={(e) => setRefAddress(e.target.value)}
            className="w-full text-white bg-black bg-opacity-80 p-2 rounded-md outline-none"
            disabled={refAddress !== '0x0000000000000000000000000000000000000000'} // Disable the input if refAddress is set
          />
        </div>

        {/* ETH Amount */}
        <div className="mb-4 flex bg-gray-400 text-gray-600 w-full items-center px-2 py-1 rounded-xl">
          <label className="text-sm font-semibold w-full">Amount (BNB)</label>
          <input
            type="number"
            placeholder="0 BNB"
            value={ethAmount}
            onChange={(e) => setEthAmount(e.target.value)}
            className="w-full text-white bg-black bg-opacity-80 p-2 rounded-md outline-none"
          />
        </div>

        {err.length > 1 && <p className="text-red-600">{err}</p>}

        {/* Buttons */}
        <Buyeggs
          setOwnerBalance={setOwnerBalance}
          ethAmount={ethAmount}
          refAddress={refAddress}
        />
        <Rebake
          setOwnerBalance={setOwnerBalance}
          refAddress={refAddress} // Pass refAddress as a prop
        />
        <Withdraw setOwnerBalance={setOwnerBalance}/>

        {/* Social Media */}
        <div className="flex justify-center items-center gap-4 my-4">
          <button className="bg-blue-600 text-white p-2 rounded-full">
            <FaTwitter />
          </button>
          <button className="bg-blue-800 text-white p-2 rounded-full">
            <FaFacebook />
          </button>
        </div>

        <p className="text-gray-300 text-center text-sm mb-4">Connect your wallet, Share & Earn!</p>

        {startGame && !state.gameIsStarted && <OpenKitchen />}
      </div>
    </div>
  );
};

export default CompoundUI;