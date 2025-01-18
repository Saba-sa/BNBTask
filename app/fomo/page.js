"use client";

import React, { useState } from "react";
import Image from "next/image";
import Fomodominance from "../components/Fomodominance";
import Rounddetails from "../components/Rounddetails";
import Fomometrics from "../components/Fomometrics";
import Fomobid from "../components/Fomobid";
import Fomomodal from "../components/ui/Fomomodal";
import Socialmedialinks from "../components/ui/Socialmedialinks";

export default function Fomo() {
  const [modalShow, setModalShow] = useState(false);

  const showDetails = () => {
    setModalShow(true);
  };

  return (
    <div className="bg-[url('/fomo-moon.png')] bg-cover bg-center bg-fixed h-screen w-full overflow-x-hidden overflow-y-scroll">
      <div className="flex flex-col min-h-screen overflow-y-auto">
        <div
          className="
         flex flex-col gap-4 items-center justify-center pt-28"
        >
          <div className="w-[35%]">
            <Image
              src="/fomo.png"
              alt="fomo image"
              width={100}
              height={100}
              className="w-full"
            />
          </div>
          <div className="w-[35%]">
            <Rounddetails />
          </div>
          <div className="w-[35%]">
            <Fomodominance />
          </div>
          <div className="w-[35%]">
            <Fomometrics />
          </div>
          <div className="w-[35%]">
            <Fomobid />
          </div>
          <div className="w-[35%]">
            <Fomomodal
              isOpen={modalShow}
              closeModal={() => setModalShow(false)}
            />
            <button
              className="w-full  bg-teal-500 text-white py-3 rounded-md  uppercase"
              onClick={showDetails}
            >
              Get Started
            </button>
          </div>
          <div className="w-[35%]">
            <Socialmedialinks />
          </div>
        </div>
         <div className="mt-2 flex items-center">
          <div className="container mx-auto w-[85%]">
            <div
              className="grid grid-cols-2  gap-2"
              style={{ gridTemplateRows: "auto" }}
            >
              <div className="bg-black bg-opacity-90 text-gray-300 p-4 flex gap-4 flex-col">
                <h2 className="w-max text-md font-semibold mb-4 border-b-2 border-teal-400 inline-block">
                  Share Your Referral Link:
                </h2>
                <p>
                  Receive a 10% bonus on all miners hired by your referrals in
                  both the "Original BNB Miner" and our latest addition to the
                  ecosystem, "FOMO."
                </p>
                <p>
                  Pocket your earnings in the form of BNB or compound them for
                  the opportunity of long-term, daily BNB rewards.
                </p>

                <p className="font-bold">
                  Always DYOR (Do Your Own Research) before hiring miners.
                </p>
              </div>
              <div className="bg-black bg-opacity-90 text-gray-300 p-4 flex gap-4 flex-col ">
                <h2 className="text-white w-max text-md font-semibold mb-4 border-b-2 border-teal-400 inline-block">
                  Coming Soon:
                </h2>
                <p className="font-bold">
                  Coming Soon: Enhanced Super Referral System Governed by XBOT
                </p>
                <p>
                  Our new and improved referral system soon offers up to 20%
                  from the ecosystem-wide activities of anyone you refer. This
                  more rewarding structure is designed to maximize your
                  benefits.
                </p>
                <p>
                  Participate in our brand-new FOMO game to secure your early
                  stake in XBOT and boost your earning potential. Prepare for
                  exciting opportunities ahead!
                </p>
              </div>

              <div className="bg-black opacity-90 col-span-2 p-4">
                <p className="text-red-500">IMPORTANT SAFETY NOTICE</p>
                <p className="text-teal-600">
                  Legitimate community members, admins, creators, and/or
                  builders of any project will never cold call or contact you
                  personally. Beware of impersonators. Always remember: never
                  share your seed phrases and private keys with anyone.
                  Additionally, avoid interacting with random links, websites
                  and contracts, as they may pose security threats or fraudulent
                  activities. If you're ever unsure, feel free to consult the
                  official Telegram chat before interacting:{" "}
                  <a href="https://t.me/Tokenoven" className="text-teal-600">
                    https://t.me/Tokenoven
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        );
      </div>
    </div>
  );
}
