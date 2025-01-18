"use client";
import { useAppContext } from "@/app/context/AppContext";
import Countdown from "./ui/countdown";
import ImagesMain from "./ui/mainimages";
import CompoundUI from "./ui/Compoundmain";
import ModelExplainReules from "./ui/ModelExplainReules";
import Socialmedialinks from "./ui/Socialmedialinks";
 import { useEffect, useState } from "react";

const Main = () => {
  const { state } = useAppContext();  
  const [modalShow, setModalShow] = useState(false);

  const [ownerBalace, setownerBalace] = useState({
     eggs:0,
    minners:0,
  });
  const fetchOwnerBalance = async () => {
    try {
      const myMiners = await state.contract.methods.getMyMiners().call({ from: state.account });
       const myEggs = await state.contract.methods.getMyEggs().call({ from: state.account }); 
      setownerBalace({
         eggs: myEggs,
        minners: myMiners
      });
    } catch (error) {
      alert("Error fetching owner balance:", error);
    }
  };
  useEffect(() => {
    if (!state.contract || !state.account) {
      console.log("Contract, account, or web3 not initialized.");
      return;
    }
  
   
    fetchOwnerBalance();
  }, [state]);
  
  const showDetails = () => {
    setModalShow(true);
  };
  return (
    <div className="flex items-center">
      <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
         <ImagesMain />
        <Countdown />
        <div className="p-2 sm:p-4 flex flex-col  bg-teal-500 text-white my-2 sm:rounded-lg">
          <p>
            Address: {state?.account?.slice(0, 3)}....{state?.account?.slice(-3)} (
            {state?.balance || "0"} BNB) 
          </p>
            <p><span>{ownerBalace.minners}</span> Miners</p> 
            <p><span>{ownerBalace.eggs}</span> eggs</p> 
          <button className="mt-2 m-auto px-2 py-2 bg-orange-400 text-gray-500 text-xl rounded-md hover:bg-orange-500">
            My miners' performance
          </button>
        </div>
         <CompoundUI setownerBalace={setownerBalace}  />
         <ModelExplainReules
          isOpen={modalShow}
          closeModal={() => setModalShow(false)}
        />
          <button
          className="w-full my-2 bg-teal-500 text-white py-4 rounded-md mb-3 uppercase"
          onClick={showDetails}
        >
          Get Started
        </button>
        <Socialmedialinks/>
      </div>
    </div>
  );
};

export default Main;
