'use client'
import { useAppContext } from '@/app/context/AppContext'
import React, { useState, useEffect } from 'react'
import { FaTwitter, FaFacebook } from 'react-icons/fa'
import Web3 from 'web3'

const CompoundUI = ({ setownerBalace }) => {
  const { state, dispatch } = useAppContext()
  const [refAddress, setRefAddress] = useState('0x0000000000000000000000000000000000000000')
  const [ethAmount, setEthAmount] = useState(0)
  const [startGame, setStartGame] = useState(false)
  const [bnbInBarrel, setBnbInBarrel] = useState(0)
  const [web3, setWeb3] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setWeb3(new Web3(window.ethereum))
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setWeb3(new Web3(window.ethereum))
    }
  }, [])
  useEffect(() => {
    const fetchBarrelBalance = async () => {
      if (!web3 || !state.contract) return
      try {
        const eggs = await state?.contract?.methods.getMyEggs(state.account).call()
        const referrals = await state?.contract?.methods.referrals(state.account).call()
        const ceoAddress = await state?.contract?.methods.ceoAddress().call()
        if (state.account.toLowerCase() === ceoAddress.toLowerCase()) {
          setStartGame(true)
        }

        const bnbValue = Web3.utils.toWei(eggs.toString(), 'ether')
        setBnbInBarrel(bnbValue)
        setRefAddress(referrals)
      } catch (error) {
        console.error('Error fetching barrel balance:', error)
      }
    }
    if (state.contract) {
      fetchBarrelBalance()
    }
  }, [state.contract, state.account])

  const buyEggs = async () => {
    const parsedEthAmount = parseFloat(ethAmount)
    if (!parsedEthAmount || isNaN(parsedEthAmount) || parsedEthAmount <= 0) {
      alert('Please enter a valid amount.')
      return
    }
    try {
      const weiValue = Web3.utils.toWei(parsedEthAmount.toString(), 'ether')

      if (!state.contract || !state.contract.methods) {
        throw new Error('Contract not initialized correctly')
      }
      console.log('contract ', await state.contract.methods)
      const gasEstimate = await state.contract.methods
        .bakePizza(refAddress || '0x0000000000000000000000000000000000000000')
        .estimateGas({ from: state.account, value: weiValue })
      await state.contract.methods
        .bakePizza(refAddress || '0x0000000000000000000000000000000000000000')
        .send({ from: state.account, value: weiValue, gas: gasEstimate })
      const balance = await web3.eth.getBalance(state.account)
      dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') })

      const myMiners = await state.contract.methods.getMyMiners().call({ from: state.account })
      const myEggs = await state.contract.methods.getMyEggs().call({ from: state.account })
      setEthAmount(0)
      setRefAddress(refAddress) // Set the referral address permanently after first use
      setownerBalace({
        eggs: myEggs,
        minners: myMiners,
      })
      alert('Eggs purchased successfully!')
    } catch (error) {
      console.error('Error buying eggs:', error)
      alert('An error occurred: ' + error.message)
    }
  }

  const rebake = async () => {
    setErr('')
    try {
      const gasEstimate = await state.contract.methods
        .rebakePizza(refAddress || '0x0000000000000000000000000000000000000000')
        .estimateGas({ from: state.account })
      await state.contract.methods
        .rebakePizza(refAddress || '0x0000000000000000000000000000000000000000')
        .send({ from: state.account, gas: gasEstimate })

      const myMiners = await state.contract.methods.getMyMiners().call({ from: state.account })
      const myEggs = await state.contract.methods.getMyEggs().call({ from: state.account })
      setownerBalace({
        eggs: myEggs,
        minners: myMiners,
      })
      const balance = await web3.eth.getBalance(state.account)
      dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') })
      alert('Eggs rebaked successfully!')
    } catch (error) {
      console.error('Error rebaking eggs:', error)
    }
  }

  const withdrawRewards = async () => {
    try {
      const gasEstimate = await state.contract.methods
        .eatPizza()
        .estimateGas({ from: state.account })
      await state.contract.methods.eatPizza().send({ from: state.account, gas: gasEstimate })

      const myMiners = await state.contract.methods.getMyMiners().call({ from: state.account })
      const myEggs = await state.contract.methods.getMyEggs().call({ from: state.account })
      setownerBalace({
        eggs: myEggs,
        minners: myMiners,
      })
      const balance = await web3.eth.getBalance(state.account)
      dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') })
      alert('Rewards withdrawn successfully!')
    } catch (error) {
      console.error('Error withdrawing rewards:', error)
    }
  }

  const kitchen = async () => {
    try {
      await state.contract.methods.openKitchen().send({ from: state.account, value: 0 })
      alert('Game started successfully!')
      dispatch({ type: 'START_GAME', gameIsStarted: true })
    } catch (error) {
      console.error('Error starting game:', error)
    }
  }

  return (
    <div
      className=" flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}
    >
      <div className="w-full max-w-md rounded-lg bg-black bg-opacity-70 p-6 shadow-lg sm:p-4">
        <h2 className="mb-4 text-center text-xl font-semibold text-white">
          Compound, Pocket, and Hire Daily!
        </h2>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-semibold text-gray-200">
            <div className="flex items-center justify-around rounded-md bg-gray-800 p-2 text-gray-300">
              <p>BNB In Barrel:</p>
              <span>{bnbInBarrel} BNB</span>
            </div>
          </label>
        </div>

        {/* Referrer Address */}
        <div className="mb-4 flex w-full items-center rounded-xl bg-gray-400 px-2 py-1 text-gray-600">
          <label className="w-full text-sm font-semibold">Referrer Address</label>
          <input
            type="text"
            placeholder="0x..."
            value={refAddress}
            onChange={(e) => setRefAddress(e.target.value)}
            className="w-full rounded-md bg-black bg-opacity-80 p-2 text-white outline-none"
            disabled={refAddress !== '0x0000000000000000000000000000000000000000'} // Disable the input if refAddress is set
          />
        </div>

        {/* ETH Amount */}
        <div className="mb-4 flex w-full items-center rounded-xl bg-gray-400 px-2 py-1 text-gray-600">
          <label className="w-full text-sm font-semibold">Amount (BNB)</label>
          <input
            type="number"
            placeholder="0 BNB"
            value={ethAmount}
            onChange={(e) => setEthAmount(e.target.value)}
            className="w-full rounded-md bg-black bg-opacity-80 p-2 text-white outline-none"
          />
        </div>

        {/* Buttons */}
        <button
          className="mb-3 w-full rounded-md bg-teal-500 py-2 uppercase text-white"
          onClick={buyEggs}
        >
          Bake Pizza
        </button>
        <button
          className="mb-3 w-full rounded-md bg-teal-500 py-2 uppercase text-white"
          onClick={rebake}
        >
          Rebake
        </button>
        <button
          className="mb-3 w-full rounded-md bg-teal-500 py-2 uppercase text-white"
          onClick={withdrawRewards}
        >
          Withdraw
        </button>

        {/* Social Media */}
        <div className="my-4 flex items-center justify-center gap-4">
          <button className="rounded-full bg-blue-600 p-2 text-white">
            <FaTwitter />
          </button>
          <button className="rounded-full bg-blue-800 p-2 text-white">
            <FaFacebook />
          </button>
        </div>

        <p className="mb-4 text-center text-sm text-gray-300">Connect your wallet, Share & Earn!</p>
        {startGame && (
          <button
            className="w-full rounded-md bg-teal-500 py-3 text-lg font-bold text-white"
            onClick={kitchen}
          >
            open kitchen!
          </button>
        )}
      </div>
    </div>
  )
}

export default CompoundUI
