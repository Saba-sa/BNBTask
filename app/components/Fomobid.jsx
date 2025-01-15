import React, { useState, useEffect } from 'react';

const MinersUI = () => {
  const [miners, setMiners] = useState(0);
  const [cooldown, setCooldown] = useState(0);

   useEffect(() => {
    const timer = setInterval(() => {
      setCooldown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hireMiners = () => {
    setMiners(miners + 1);  
  };

  const enterPool = () => {
   };

  const claimWinnings = () => {
   };

  const donatePrizePool = (amount) => {
   };

  const reallocatePrizes = (amount) => {
   };

  return (
    <div className="bg-black opacity-90 p-6 rounded-lg shadow-lg w-full  mx-auto">
      <h2 className="text-white text-center text-xl font-semibold mb-4">You Have: {miners} Miners</h2>
      <h3 className="text-white text-center text-lg mb-4">Total Miners Needed to Enter: 10</h3>
      
      <div className="mb-4 flex justify-around">
     <div className="flex flex-col text-gray-300 items-center">
     <p>Step 1</p>
        <button
          className="bg-teal-500 text-white py-2 px-4 rounded-md"
          onClick={hireMiners}
          >
          Hire (0.1 BNB)
        </button>
            <p>-Minners</p>
     </div>
     <div className="flex flex-col text-gray-300 items-center">
     <p>Step 2</p>
        <button
          className="bg-teal-500 text-white py-2 px-4 rounded-md"
          onClick={enterPool}
        >
          Enter (0.03 BNB)
        </button>
        <p>Cooldown: <span className='text-red-600'>{cooldown}</span></p>
        </div>
      </div>

      <div className="text-center mb-4 w-full">
         <button
          className="bg-teal-500 text-white py-2 px-4 rounded-md w-full"
          onClick={claimWinnings}
        >
          Claim Winnings
        </button>
      </div>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2"
          onClick={() => donatePrizePool(0.5)}
        >
          Donate To Prize Pool (0.5 BNB)
        </button>
      </div>
<p className='text-gray-300 my-2'>Want to accelerate your Early Allocations to XBot? Consider donating directly to the prize pool and receive a 1:1 BNB XBot Early Allocations. Max donation per round: 0.5 BNB.</p>

      <div>
        <button
          className="bg-yellow-500 text-white py-2 px-4 rounded-md w-full"
          onClick={() => reallocatePrizes(0.5)}
        >
          Reallocate Unclaimed Prizes (0.5 BNB)
        </button>
      </div>
    </div>
  );
};

export default MinersUI;
