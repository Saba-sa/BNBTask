"use client"
 import React, { useState, useEffect } from 'react';
import {  FaTelegram, FaCopy } from 'react-icons/fa';
import UserAcknowlegent from "./UserAcknowlegent";
import Heading from './Heading';
 
const Socialmedialinks = () => {
   const [modalShow, setModalShow] = useState(false);
  const showDetails = () => {
    setModalShow(true);
  };

  return (
    <div className="  flex items-center justify-center bg-cover bg-center"  >
      <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg max-w-md w-full sm:p-4">
         <Heading title='Information, Links & Social Media'/>
 

         <div className="flex justify-center items-center flex-col sm:flex-row gap-4 my-4">
         <div className="flex justify-center items-center">
          <button className="text-blue-600 text-2xl">
            <FaTelegram />
          </button>
          <p className='text-white underline'>Telegram</p>
        </div>
         <div className="flex justify-center items-center">
          <img src="/bsc.png" alt="bsc logo" className='w-[20px]'/>
          <p className='text-white underline'>BSCScan</p>
        </div>
         <div className="flex justify-center items-center">
          <img src="/copy.png" alt="copy logo" className='w-[35px]'/>
          <p className='text-white underline'>LitePaper</p>
        </div>
         <div className="flex justify-center items-center">
          <img src="/xsymbol.png" alt="bsc logo" className='w-[20px]'/>
          <p className='text-white underline'>.com</p>
        </div>
         
        <UserAcknowlegent    isOpen={modalShow}
          closeModal={() => setModalShow(false)}/>
        </div>
<div className="  flex items-center justify-center ">
         <button className="w-[55%]   my-2 bg-teal-500 text-white py-2 rounded-md text-lg font-bold" onClick={showDetails}>User Acknowledgement</button>
</div>
       </div>
    </div>
  );
};

export default Socialmedialinks; 