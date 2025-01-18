"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Web3 from "web3";
import Image from "next/image";
import Loader from "./Loader";

const ModalComponent = ({ isOpen, closeModal }) => {
  const { dispatch } = useAppContext();
const [errMsg, setErrMsg] = useState('');
const [loader, setLoader] = useState(false);

useEffect(() => {
  if (isOpen) {
    setErrMsg("");
  }
}, [isOpen]);

const connectMetaMask = async () => {
  console.log('metamask')
  setLoader(true);
  setErrMsg('');
  try {
    if (!window.ethereum) throw new Error("MetaMask is not installed");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    dispatch({ type: "SET_PROVIDER", payload: window.ethereum });
    dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });

    setLoader(false);
    closeModal();
  } catch (error) {
    setLoader(false);
    setErrMsg("MetaMask connection error. Please try again.");
    // console.log("MetaMask connection error:", error.message);
  }
};

const connectBinanceWallet = async () => {
  console.log('binace')

  setLoader(true);
  setErrMsg('');
  console.log('binace wallet',window.BinanceChain)
  try {
    if (!window.BinanceChain) throw new Error("Binance Wallet is not installed");
    const accounts = await window.BinanceChain.request({ method: "eth_requestAccounts" });
    dispatch({ type: "SET_PROVIDER", payload: window.BinanceChain });
    dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });

    setLoader(false);
    closeModal();
  } catch (error) {
    setLoader(false);
    setErrMsg("Binance Wallet connection error. Please try again.");
    // console.log("Binance Wallet connection error:", error.message);
  }
};

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <>
      {isOpen && (
        <div
          className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center"
          style={{ background: "rgba(0, 0, 0, 0.7)" }}
          onClick={handleBackgroundClick}
        >
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg">
          {loader ?
       <Loader className="text-gray-400 w-full h-[80]" />
           :
             <>{errMsg.trim().length>0?<p className="text-red-600 font-bold p-8">{errMsg}</p>:<div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Connect Wallet</p>
              </div>

              <div className="my-5">
                <div
                  className="w-full flex flex-col items-center justify-center gap-2 cursor-pointer py-3 rounded-lg mb-3 text-black"
                  onClick={connectMetaMask}
                >
                <Image src={'/metamask.png'} width={50} height={50} alt="metamask icon"/>
                <h1 className="font-bold text-2xl">INJECTED</h1>
                  <p className="text-md text-gray-400">Rabby.io, Metamask, Web3 Browsers, etc.</p>
                </div>
                <div
                  className="w-full flex flex-col items-center justify-center gap-2 cursor-pointer py-3 rounded-lg mb-3 text-black"
                  onClick={connectBinanceWallet}
                >
                <Image src={'/bnblogo.png'} width={50} height={50} alt="bnb icon"/>
                <h1 className="font-bold text-2xl">Binance Chain Wallet</h1>
                  <p className="text-md text-gray-400">
                  Connect to your Binance Chain Wallet</p>
                </div>
                 
              </div>

               
            </div>}</>}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
