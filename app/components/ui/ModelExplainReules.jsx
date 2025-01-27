"use client";
import React from "react";

const ModelTemplate = ({ isOpen, closeModal }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };
   

  const details = [
    {
      id: 1,
      title: "Setting Up",
      description: [
        "Before you start, ensure you have a Binance Smart Chain (BSC) compatible wallet with some BNB (Bep20) in it (e.g., MetaMask). Tokenoven operates on the BSC, so you'll need BNB to interact with the contract."
      ]
    },
    {
      id: 2,
      title: "To Start Your BNB-Miner Journey",
      description: [
        "Connect your BSC wallet to the Tokenoven platform.",
        "Enter the amount of BNB you want to spend on Miners.",
        "Click the 'Hire Miners' button and approve the transaction.",
        "The contract will convert your BNB into Miners and add them to your account."
      ]
    },
    {
      id: 3,
      title: "Compounding Your Rewards into Miners",
      description: [
        "Once your barrel starts to fill, decide when you want to compound.",
        "Click the 'Compound' button and approve the transaction.",
        "Your rewards will be converted into miners, which will produce more rewards over time."
      ]
    },
    {
      id: 4,
      title: "Pocketing Your Rewards for BNB",
      description: [
        "If you've accumulated Rewards and want to cash out, click the 'Pocket' button and approve the transaction.",
        "The contract will calculate the BNB value of your Rewards and transfer the BNB to your wallet."
      ]
    },
    {
      id: 5,
      title: "Checking Your Balance",
      description: [
        "The website displays how many Miners and Rewards you have."
      ]
    },
    {
      id: 6,
      title: "Understanding the Game Dynamics",
      description: [
        "Tokenoven has a dynamic pricing system for Hiring and Pocketing Rewards.",
        "Rewards are determined by the ratio of BNB in the contract to Miners in the market.",
        "With this dynamic in mind, it's in the best interest of all community members to grow and maintain a high contract balance to ensure generous long-term rewards.",
        "Learn More..."
      ]
    },
    {
      id: 7,
      title: "Safety First",
      description: [
        "Only send BNB to the contract when Hiring Miners.",
        "Always double-check the contract address and ensure you're interacting with the genuine BNB Miner to avoid scams."
      ]
    }
  ];
   return (
    <>
      {isOpen && (
       <div
       className="main-modal fixed w-full h-100 inset-0 z-50   flex justify-center items-center "
       style={{ background: "rgba(0, 0, 0, 0.7)" }}
       onClick={handleBackgroundClick}
     >
            <div className="modal-container  h-[400px] bg-gray-800 text-white w-11/12 md:max-w-5xl mx-auto rounded-lg shadow-lg  overflow-x-hidden overflow-y-scroll ">
            <div className="modal-content  py-4 text-left px-2 ">
              <div className="flex justify-between items-center flex-col pb-3 p-4">
                <p className="text-2xl font-bold text-teal-600 my-2 uppercase ">STEP-BY-STEP GUIDE for Tokenoven</p>
                <p>★ THE LONGEST RUNNING MINER! Over 3 Years Strong!</p>
                <p className="text-xl text-center my-2">Welcome to Tokenoven! A grassroots community that Hires Miners, Compounds Rewards, and Responsibly Pockets BNB.</p>
              </div>
              <ol className="list-decimal pl-6">
                {details.map((detail) => (
                  <li key={detail.id} className="mb-4">
                    <h1 className="font-semibold">{detail.title}</h1>
                    {detail.description.length > 1 ? (
                      <ul className="list-disc pl-4">
                        {detail.description.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{detail.description[0]}</p>
                    )}
                  </li>
                ))}
              </ol>
              <p><span className="font-bold pl-4">Website:</span> website name </p>
              <p><span className="font-bold pl-4">Contract:</span> 0xce93F9827813761665CE348e33768Cb1875a9704 </p>
              <p className="font-bold pl-4 pt-2">Happy mining!
              </p>
              <div className=" text-center">
              <button onClick={closeModal} className="bg-teal-600   px-8 py-2 rounded-lg">close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelTemplate;
