"use client";
import { useState } from "react";
import { useAppContext } from "../context/AppContext"; // Import Context for state management
import ModalComponent from "./ui/modal";

export default function Header() {
  const [modalShow, setModalShow] = useState(false);
  const { state } = useAppContext();

  const connectWallet = () => {
    if(state.account===null) {
    setModalShow(true);
    }
    };

  return (
    <section className="fixed bg-gradient-to-r from-gray-800 to-black p-4 text-white z-30 w-full   ">
      <div className="flex justify-between items-center w-full sm:w-[75%] m-auto">
         <div className="flex items-center space-x-2 w-full sm:w-[30%]">
         <p
  className="w-full text-3xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-white"
>
  Tokenoven
</p>
        </div>

         <div className="hidden lg:inline text-lg w-[40%] font-semibold">THE NEWEST RUNNING MINER</div>

         <div className="flex items-center space-x-4 w-[50%]">
          <button
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition duration-300"
            onClick={connectWallet}
          >
            {state.account ? "Connected" : "CONNECT WALLET"}
          </button>
          <span className="hidden sm:inline text-sm text-gray-400">Having Connection Issues?</span>
        </div>
      </div>

       <ModalComponent
        isOpen={modalShow}
        closeModal={() => setModalShow(false)}
      />
    </section>
  );
}
