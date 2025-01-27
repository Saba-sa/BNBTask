"use client";
import React from "react";

const UserAcknowlegent = ({ isOpen, closeModal }) => {

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };
   

  const details = [
    {
      id: 1,
      title: "Information's Purpose",
      description: [
        "We've put together details about \"Tokenoven\" and our platform, to guide you. While we aim to inform, remember that decisions related to DeFi should come from a mix of personal research and professional advice. Litepaper..."
      ]
    },
    {
      id: 2,
      title: "You're in the Driver's Seat",
      description: [
        "All cryptocurrency projects carry inherent risks. Never risk anything that you aren't prepared to lose. We trust you to make decisions that are right for you, based on your understanding and comfort level."
      ]
    },
    {
      id: 3,
      title: "DeFi's Dynamic Nature",
      description: [
        "The world of DeFi is exciting, innovative, but also unpredictable. Things change, and there aren't guarantees about outcomes."
      ]
    },
    {
      id: 4,
      title: "Laws Matter",
      description: [
        "Depending on where you are, there might be specific rules about using products like ours. It's a good idea to be sure you're on the right side of those."
      ]
    },
    {
      id: 5,
      title: "Tech's Two Faces",
      description: [
        "We're proud to be a part of the Binance Smart Chain (BSC). Still, like all tech, there are potential vulnerabilities. It's always wise to be informed and cautious."
      ]
    },
    {
      id: 6,
      title: "Fees",
      description: [
        "A 5% developer fee is required with each \"Hire\" and \"Pocket\" transaction. This fee is automatically satisfied by the Original BNB Miner contract. While the developer has the discretion to utilize portions of these fees for community-related activities, there is no binding obligation for them to do so."
      ]
    },
    {
      id: 7,
      title: "Guard Your Assets",
      description: [
        "Keeping your assets safe is essential. As you use \"Tokenoven\", remember to double-check details and be cybersecurity-conscious."
      ]
    },
     
      
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
              <div className="flex justify-between items-start flex-col pb-3 p-4">
                <p className="text-2xl   mx-auto font-bold text-teal-600 my-2 uppercase ">Safety and User Acknowledgement
                </p>
                <p className="text-red-500">IMPORTANT SAFETY NOTICE
                </p>
                <p className="text-xl text-left my-2 text-teal-600">Legitimate community members, admins, creators, and/or builders of any project will never cold call or contact you personally. Beware of impersonators. Always remember: never share your seed phrases and private keys with anyone. Additionally, avoid interacting with random links, websites and contracts, as they may pose security threats or fraudulent activities. If you're ever unsure, feel free to consult the official Telegram chat before interacting: https://t.me/Tokenoven
                </p>
              </div>
              <div className="flex justify-between items-center flex-col pb-3 p-4">
                <p className="text-xl   mx-auto font-bold text-white my-2 uppercase ">BNB Miner User Acknowledgement:

                  </p>
                <p className="text-md text-left my-2 text-white">Welcome to Tokenoven! Before diving in, here are some things we'd like you to be aware of:
                </p>
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
              <p className="px-4">By using the Tokenoven platform, you acknowledge that DeFi is a new technology still in its experimental stage. You agree that the Tokenoven developers, admins, community, and/or associates make absolutely no guarantees, promises, or warranties, whether express or implied. You recognize the unique nature of DeFi and the importance of personal due diligence. 
                We're thrilled to have you on board and wish you a positive 
                experience with Tokenoven.
              </p>
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

export default UserAcknowlegent;
