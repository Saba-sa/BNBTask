import React from "react";

const DominanceDashboard = () => {
  return (
    <div className="bg-cyan-200 bg-opacity-90 p-6 rounded-lg text-center  mx-auto shadow-md">
      <h2 className="text-xl font-bold underline text-black">Dominance Dashboard</h2>
      <div className="mt-4 text-left text-black">
        <div className="mb-4">
          <p className="font-semibold">1st Place:</p>
          <p>Player: 0xae93...F2FA</p>
          <p>1310 Points</p>
          <p>Prize: 0.361244 BNB</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">2nd Place:</p>
          <p>Player: 0x4fC3...7774</p>
          <p>250 Points</p>
          <p>Prize: 0.216747 BNB</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Last Entry</p>
          <p>Player: 0x73B9...f1B1</p>
          <p>Prize: 0.144498 BNB</p>
        </div>
      </div>
      <button className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500">
        Previous Rounds Winners
      </button>
    </div>
  );
};

export default DominanceDashboard;
