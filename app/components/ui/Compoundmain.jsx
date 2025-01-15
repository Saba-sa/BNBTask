import { useAppContext } from '@/app/context/AppContext';
import React, { useState, useEffect } from 'react';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import Web3 from 'web3';

const CompoundUI = ({ setownerBalace }) => {
  const { state, dispatch } = useAppContext();
  const [refAddress, setRefAddress] = useState('0x0000000000000000000000000000000000000000');
  const [ethAmount, setEthAmount] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [bnbInBarrel, setBnbInBarrel] = useState(0);
  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    const fetchBarrelBalance = async () => {
      try {
        const eggs = await state?.contract?.methods.getMyEggs(state.account).call();
        const referrals = await state?.contract?.methods.referrals(state.account).call();
        const ceoAddress = await state?.contract?.methods.ceoAddress().call();
if((state.account).toLowerCase()===ceoAddress.toLowerCase()){
  setStartGame(true);
}
console.log(state.account)
console.log(ceoAddress)
console.log()
        const bnbValue = Web3.utils.toWei(eggs.toString(), 'ether');
        setBnbInBarrel(bnbValue);
        setRefAddress(referrals)
      } catch (error) {
        console.error('Error fetching barrel balance:', error);
      }
    };
    if (state.contract) {
      fetchBarrelBalance();
    }
  }, [state.contract, state.account]);

  const buyEggs = async () => {
    const parsedEthAmount = parseFloat(ethAmount);
    if (!parsedEthAmount || isNaN(parsedEthAmount) || parsedEthAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    try {
       const weiValue = Web3.utils.toWei(parsedEthAmount.toString(), 'ether');

      if (!state.contract || !state.contract.methods) {
        throw new Error('Contract not initialized correctly');
      }

      await state.contract.methods.bakePizza(refAddress || '0x0000000000000000000000000000000000000000')
        .send({ from: state.account, value: weiValue , gas: 300000 });
      const balance = await web3.eth.getBalance(state.account);
      dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') });
      const myMiners = await state.contract.methods.getMyMiners().call({ from: state.account });
      const myEggs = await state.contract.methods.getMyEggs().call({ from: state.account });
      setEthAmount(0);
      setRefAddress(refAddress); // Set the referral address permanently after first use
      setownerBalace({
        eggs: myEggs,
        minners: myMiners,
      });
      console.log('myminners', myMiners, myEggs);
      alert('Eggs purchased successfully!');
    } catch (error) {
      console.error('Error buying eggs:', error);
      alert('An error occurred: ' + error.message);
    }
  };

  const rebake = async () => {
    try {
      await state.contract.methods.rebakePizza(refAddress || '0x0000000000000000000000000000000000000000').send({ from: state.account });
      const myMiners = await state.contract.methods.getMyMiners().call({ from: state.account });
      const myEggs = await state.contract.methods.getMyEggs().call({ from: state.account });
      setownerBalace({
        eggs: myEggs,
        minners: myMiners,
      });
      const balance = await web3.eth.getBalance(state.account);
      dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') });
      alert('Eggs rebaked successfully!');
    } catch (error) {
      console.error('Error rebaking eggs:', error);
    }
  };

  const withdrawRewards = async () => {
    try {
      await state.contract.methods.eatPizza().send({ from: state.account });
      const myMiners = await state.contract.methods.getMyMiners().call({ from: state.account });
      const myEggs = await state.contract.methods.getMyEggs().call({ from: state.account });
      setownerBalace({
        eggs: myEggs,
        minners: myMiners,
      });
      const balance = await web3.eth.getBalance(state.account);
      dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') });
      alert('Rewards withdrawn successfully!');
    } catch (error) {
      console.error('Error withdrawing rewards:', error);
    }
  };

  const kitchen = async () => {
    try {
      await state.contract.methods.openKitchen().send({ from: state.account, value: 0 });
      alert('Game started successfully!');
      dispatch({ type: 'START_GAME', gameIsStarted: true });
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}>
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

        {/* Buttons */}
        <button className="w-full bg-teal-500 text-white py-2 rounded-md mb-3 uppercase" onClick={buyEggs}>
          Bake Pizza
        </button>
        <button className="w-full bg-teal-500 text-white py-2 rounded-md mb-3 uppercase" onClick={rebake}>
          Rebake
        </button>
        <button className="w-full bg-teal-500 text-white py-2 rounded-md mb-3 uppercase" onClick={withdrawRewards}>
          Withdraw
        </button>

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
         {startGame && <button className="w-full bg-teal-500 text-white py-3 rounded-md text-lg font-bold" onClick={kitchen}>open kitchen!</button>}
      </div>
    </div>
  );
};

export default CompoundUI;
