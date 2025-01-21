"use client";
import { useAppContext } from "@/app/context/AppContext";
import Heading from "./ui/Heading";

const Main = () => {
  const { state } = useAppContext();

  return (
    <div className="flex items-center">
      <div className="container mx-auto w-full sm:w-[85%]">
        <div className="bg-black bg-opacity-90 my-4 w-full p-8 px-16 sm:rounded-xl">
          <img src="/cartwhite.png" alt="cart" />
        </div>
        <div
          className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-2  mb-12 gap-2"
          style={{ gridTemplateRows: "auto" }}
        >
          <div className="bg-black bg-opacity-90 text-gray-300 p-4 flex gap-4 flex-col">
            <h2 className="w-max text-md font-semibold mb-4 border-b-2 border-teal-400 inline-block">
            Sustainability
            </h2>
            <p>
            Tokenoven.com operates as a community-driven platform built on an immutable contract designed for seamless performance.
            </p>
            <p>
            The project’s sustainability is rooted in the active support of its community. Unlike many cryptocurrencies and projects, Tokenoven employs an algorithm that discourages immediate token dumping, which could harm the community. This design incentivizes long-term, community-centered actions while discouraging behaviors that undermine the project’s and community’s shared interests.
            </p>
            <p>
            Though Tokenoven launched as a fully developed product, its open-source yet immutable structure allows developers to create additional frontends, games, DApps, and other DeFi tools to enhance the contract's value and benefit the community. With these features, the potential and longevity of Tokenoven remain limitless.
            </p>
            <p className="font-bold">
            Remember to always DYOR (Do Your Own Research) before engaging with miners or any investments.

</p>
          </div>

           <div className="bg-black bg-opacity-90 text-gray-300 p-4 flex gap-4 flex-col sm:row-span-2">
            <h2 className="w-[30%] text-md font-semibold mb-4 border-b-2 border-teal-400 inline-block">
            Miner Information
            </h2>
            <p>
            In simple terms, miners function as internal inflationary tokens. They are considered inflationary because, once hired, they permanently belong to the hiring address, allowing the user to withdraw approximately 3% of their miners' total value daily.
            </p><p> The value of miners fluctuates based on community-driven actions that impact the contract’s BNB balance and the overall miner count, such as hiring miners, compounding, or pocketing BNB rewards.
            </p>
            <p>
            The               <span className="font-bold">
            Total Value Locked (TVL)               </span>
            displayed to users serves as a reference point to visualize their position within the contract. It is calculated based on the contract’s current balance, the user’s total miner count, and the overall miner count in the contract. TVL represents an estimate of the user's miners' total value in BNB. However, neither the deposited BNB nor the TVL can be withdrawn all at once. Instead, the contract distributes rewards to the user’s barrel throughout the day, amounting to approximately 3% of their miners’ daily value.
            </p>
            <p>
            Users can choose to pocket or compound the rewards accumulated in their barrels at any time. However, frequent pocketing may result in a stagnant miner count, potentially diminishing the user’s BNB value due to the inflationary nature of miners, particularly during bearish market cycles. To optimize outcomes, users should carefully plan their strategies for hiring, compounding, and pocketing rewards.
            </p>
           
          </div>

         <div className="bg-black bg-opacity-90 text-gray-300 p-4 flex gap-4 flex-col">
            <h2 className="w-max text-md font-semibold mb-4 border-b-2 border-teal-400 inline-block">
            Public and Verified Contract
            </h2>
            <p>
              Note:{" "}
              <span className="font-bold border-b-2 border-teal-400">
              Addressing BSCScan mislabeling.              </span>
            </p>
            <p>
            The Tokenoven contract is fully public and verified, allowing anyone to view and interact with it directly on BSCScan.

             </p>
            <p>
            Additionally, you can confirm our claim of hosting the "Newest Running Miner" by checking the contract details on BSCScan.   
             </p>
          </div>

          <div className="bg-black bg-opacity-90 text-gray-300 p-4 flex gap-4 flex-col sm:col-span-2">
            <h2 className="text-white w-max text-md font-semibold mb-4 border-b-2 border-teal-400 inline-block">
            Referrals
            </h2>
            <p>
            Share your referral link to earn a 15% bonus on all miners hired by your referrals in both the
            <span className="font-bold">
            "Original Tokenoven"              </span>{" "}
            and the newly introduced Tokenoven token. You can choose to pocket your earnings in BNB or compound them for the potential of long-term, daily BNB rewards.

            </p>
            <p className="font-bold  w-max">
            To access your referral link, ensure your wallet is connected.
            </p>
            
            <h3 className="font-bold border-b-2 border-teal-400 w-max">
            Coming Soon: Enhanced Super Referral System
            </h3>
            <p>
            A revamped referral system is on its way, offering up to 20% rewards from the ecosystem-wide activities of your referrals. This upgraded structure is designed to maximize your earning potential and provide even greater benefits.
            </p>
            <p>Get ready for exciting new opportunities!

</p>
          </div>

          <div className="bg-black opacity-90 col-span-2 p-4">
            <p className="text-red-500">IMPORTANT SAFETY NOTICE</p>
            <p className="text-teal-600">
              Legitimate community members, admins, creators, and/or builders of
              any project will never cold call or contact you personally. Beware
              of impersonators. Always remember: never share your seed phrases and
              private keys with anyone. Additionally, avoid interacting with random
              links, websites and contracts, as they may pose security threats or
              fraudulent activities. If you're ever unsure, feel free to consult the
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
};

export default Main;
