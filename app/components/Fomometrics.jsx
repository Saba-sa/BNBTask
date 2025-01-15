import React from "react";

const DominanceDashboard = () => {
  return (
    <div className="bg-cyan-200 bg-opacity-90 p-6 rounded-lg text-center mx-auto shadow-md">
      <h2 className="text-xl font-bold underline text-black">My Metrics</h2>
      <p className="text-gray-200 text-xl">Address: Not Connected (- BNB)
      </p>
      <div className=" text-left text-gray-500">
        <div className="flex gap-2">

          <p className="mb-2">Round 24:</p>
          <p> - Points (- Entries)</p>
       
        </div>
        <div className="flex gap-2">

          <p className="">Total Claimed: </p>
          <p>- BNB</p>
      
      
        </div>
        <div className="flex gap-2">

          <p className="">Total Donated: </p>
          <p>- BNB</p>

        </div>
        <div className="flex gap-2 mt-2">

          <p className="font-semibold">Total XBot Allocation: </p>
          <p>- BNB</p>
      
      
        </div>
   
      </div>
      <button className="mt-4 bg-black opacity-70 text-cyan-200 px-4 py-2 rounded-lg font-semibold ">
      Manage My Miners (Daily Earnings)      </button>
    </div>
  );
};

export default DominanceDashboard;
