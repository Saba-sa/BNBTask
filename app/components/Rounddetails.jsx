import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const RoundDetails = () => {
  const [timeLeft, setTimeLeft] = useState(0); // Store time left in seconds
  const [currentRound, setCurrentRound] = useState(1); // Keep track of the current round
  const [roundsLeft, setRoundsLeft] = useState(5); // Total rounds left
  const { state } = useAppContext();

  useEffect(() => {
     const roundDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    let endTime = new Date().getTime() + roundDuration; // Initial round end time

    const timerInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeRemaining = endTime - currentTime;

      if (timeRemaining <= 0) {
        clearInterval(timerInterval); // Stop the current timer

        if (roundsLeft > 1) {
          // Start a new round
          setCurrentRound((prevRound) => prevRound + 1);
          setRoundsLeft((prevRoundsLeft) => prevRoundsLeft - 1);
          endTime = new Date().getTime() + roundDuration; // Reset end time
        } else {
          // No more rounds left
          setTimeLeft(0); // Ensure the timer stays at 0
          console.log("All rounds have completed!");
        }
      } else {
        setTimeLeft(timeRemaining);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [roundsLeft, state.contract]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="bg-black bg-opacity-70 p-8 rounded-lg text-center text-gray-400 mx-auto">
      <h2 className="text-3xl font-bold text-teal-600 underline">
        Round {currentRound}
      </h2>
      <p className="text-red-500 font-semibold mt-2">
        {roundsLeft > 1
          ? `Round ${currentRound} in progress`
          : "Final Round!"}
      </p>
      <div className="flex justify-center items-center mt-6">
        <div className="text-teal-600 font-bold text-4xl mx-2">
          <span>{hours}</span>
          <p className="text-sm">HOURS</p>
        </div>
        <p className="text-4xl text-teal-600">:</p>
        <div className="text-teal-600 font-bold text-4xl mx-2">
          <span>{minutes}</span>
          <p className="text-sm">MINUTES</p>
        </div>
        <p className="text-4xl text-teal-600">:</p>
        <div className="text-red-500 font-bold text-4xl mx-2">
          <span>{seconds}</span>
          <p className="text-sm">SECONDS</p>
        </div>
      </div>
      <p className="mt-6 text-sm">
        The Original <span className="text-teal-600 underline">BNB Miner</span>{" "}
        Self Sustaining Prize Pool
      </p>
      {roundsLeft === 0 ? (
        <p className="mt-4 text-red-500 font-semibold">
          All rounds are completed!
        </p>
      ) : (
        <p className="mt-2 text-gray-400 font-bold">
          Rounds Left: {roundsLeft - 1}
        </p>
      )}
      <button
        className="mt-4 bg-teal-400 text-black w-full px-6 py-2 rounded-lg font-semibold hover:bg-teal-500"
        disabled={timeLeft > 0}
      >
        {timeLeft > 0 ? "Round In Progress" : "Check Round/Distribute Prizes"}
      </button>
    </div>
  );
};

export default RoundDetails;
