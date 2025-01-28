"use client";
import { useAppContext } from '@/app/context/AppContext';
import React, { useState, useEffect } from 'react';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import OpenKitchen from './Openkitchen';
import Buyeggs from './Buyeggs';
import Rebake from './Rebake';
import Withdraw from './Withdraw';
import { toast } from 'react-toastify';
import Web3 from 'web3';

const web3 = new Web3();

const CompoundUI = ({ setOwnerBalance }) => {
  const { state, dispatch } = useAppContext();
  const [refAddress, setRefAddress] = useState('0x0000000000000000000000000000000000000000');
  const [bnbAmount, setBnbAmount] = useState(0);
  const [err, setErr] = useState('');
  const [startGame, setStartGame] = useState(false);
  const [bnbInBarrel, setBnbInBarrel] = useState(0);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchBarrelBalance = async () => {
      try {
        if (!state.readOnlyContract || !state.account) {
          toast.warn('Contract or account not initialized.');
          return;
        }

        const userEggs = await state.readOnlyContract.methods.getMyEggs().call({ from: state.account });
        const bnbValue = await state.readOnlyContract.methods.calculateEggSell(userEggs).call();
        setBnbInBarrel(parseFloat(web3.utils.fromWei(bnbValue, 'ether')));

        const referrals = await state.readOnlyContract.methods.referrals(state.account).call();
        const ceoAddress = await state.readOnlyContract.methods.ceoAddress().call();

        if (state.account.toLowerCase() === ceoAddress.toLowerCase()) {
          setStartGame(true);
        }

        const isInitialized = await state.readOnlyContract.methods.initialized().call();
        setInitialized(isInitialized);

        setRefAddress(referrals);
      } catch (error) {
        console.error(error);
        setErr('Error fetching barrel balance ');
        toast.error('Failed to fetch barrel balance.');
      }
    };

    if (state.account) {
      fetchBarrelBalance();
    }
  }, [state.readOnlyContract, state.writeContract, state.account]);

  return (
    <div className="flex items-center justify-center bg-cover bg-center">
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

        <div className="mb-4 flex bg-gray-400 text-gray-600 w-full items-center px-2 py-1 rounded-xl">
          <label className="text-sm font-semibold w-full">Referrer Address</label>
          <input
            type="text"
            placeholder="0x..."
            value={refAddress}
            onChange={(e) => setRefAddress(e.target.value)}
            className="w-full text-white bg-black bg-opacity-80 p-2 rounded-md outline-none"
            disabled={refAddress !== '0x0000000000000000000000000000000000000000'}
          />
        </div>

        <div className="mb-4 flex bg-gray-400 text-gray-600 w-full items-center px-2 py-1 rounded-xl">
          <label className="text-sm font-semibold w-full">Amount (BNB)</label>
          <input
            type="number"
            placeholder="0 BNB"
            value={bnbAmount}
            onChange={(e) => setBnbAmount(e.target.value)}
            className="w-full text-white bg-black bg-opacity-80 p-2 rounded-md outline-none"
          />
        </div>

        {err.length > 1 && <p className="text-red-600">{err}</p>}

        <Buyeggs
          setOwnerBalance={setOwnerBalance}
          bnbAmount={bnbAmount}
          refAddress={refAddress}
          setBnbAmount={setBnbAmount}
          setBnbInBarrel={setBnbInBarrel}

        />
        <Rebake
          setOwnerBalance={setOwnerBalance}
          refAddress={refAddress}
          setBnbInBarrel={setBnbInBarrel}

        />
        <Withdraw setOwnerBalance={setOwnerBalance}   setBnbInBarrel={setBnbInBarrel}
        />

        <div className="flex justify-center items-center gap-4 my-4">
          <button
            className="bg-blue-600 text-white p-2 rounded-full"
            onClick={() => window.open('https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20game!&url=https://tokenoven.cloud/', '_blank')}          >
            <FaTwitter />
          </button>
          <button
            className="bg-blue-800 text-white p-2 rounded-full"
            onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=https://tokenoven.cloud/', '_blank')}          >
            <FaFacebook />
          </button>
        </div>

        <p className="text-gray-300 text-center text-sm mb-4">Connect your wallet, Share & Earn!</p>

        {startGame  && !initialized && <OpenKitchen />}
      </div>
    </div>
  );
};

export default CompoundUI;