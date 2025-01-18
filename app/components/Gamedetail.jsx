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
              BNB Miner X (TokenovenX.com), also known as "The Original BNB Miner"
              and formerly known as Tokenoven.finance, is a community-driven,
              immutable contract with over three years of flawless operation.
            </p>
            <p>
              The sustainability of BNB Miner X heavily depends on its
              community's support. Unlike many coins, tokens, and projects, BNB
              Miner X incorporates an algorithm to deter users from instantly
              dumping, which could adversely affect the community. Its design
              aims to reward long-term, community-focused behaviors and penalize
              actions that neglect the project's and community's long-term
              well-being.
            </p>
            <p>
              Although the BNB Miner contract was launched as a 100% complete
              product, its open-source yet immutable nature permits anyone to
              build additional Frontends, Games, Dapps, and other DeFi tools to
              enhance the contracts value and its community. Given these factors,
              the potential and sustainability of BNB Miner X knows no bounds.
            </p>
            <p className="font-bold">
              Always DYOR (Do Your Own Research) before hiring miners.
            </p>
          </div>

           <div className="bg-black bg-opacity-90 text-gray-300 p-4 flex gap-4 flex-col sm:row-span-2">
            <h2 className="w-[30%] text-md font-semibold mb-4 border-b-2 border-teal-400 inline-block">
              Miner Information
            </h2>
            <p>
              For an in-depth understanding of BNB Miner X, its contract, and
              its prospective future, we recommend reading the litepaper.{" "}
              <span className="font-bold">
                Always DYOR (Do Your Own Research) before hiring miners.
              </span>
            </p>
            <p>
              In simpler terms, miners can be thought of as internal
              inflationary tokens. They're inflationary because once miners are
              hired, they permanently belong to the hiring address, granting
              that address the option to withdraw an estimated 3% of their total
              miners value daily. The value of miners fluctuates based on
              community actions that influence the contract's BNB balance and
              its overall miner count, such as hiring miners, compounding, and
              pocketing BNB rewards.
            </p>
            <p>
              Users displayed TVL (Total Value Locked) is simply a gauge to
              help them visualize their current position within the contract.
              It's calculated based on the contract's current balance, the
              user's total miner count, and the overall miner count across the
              contract. The TVL represents an approximation of the user's total
              miner count value in BNB. Neither the deposited BNB nor the TVL
              can be withdrawn in one go. Instead, the contract fills the user's
              barrel throughout the day with an estimated 3% of their total
              miners daily value.
            </p>
            <p>
              Users can pocket or compound the accumulated rewards in their
              barrels anytime. However, frequent pocketing can lead to a stagnant
              miner count for the user, potentially causing a BNB value loss due
              to the miners' inflationary nature, especially during bearish
              cycles. Given these dynamics, users should strategize their hiring,
              compounding, and pocketing habits thoughtfully.
            </p>
          </div>

         <div className="bg-black bg-opacity-90 text-gray-300 p-4 flex gap-4 flex-col">
            <h2 className="w-max text-md font-semibold mb-4 border-b-2 border-teal-400 inline-block">
              Public and Verified Contract
            </h2>
            <p>
              Note:{" "}
              <span className="font-bold border-b-2 border-teal-400">
                BSCScan mislabeling.
              </span>
            </p>
            <p>
              The BNB Miner contract is open to the public and verified. You
              can view and directly interact with the contract on{" "}
              <span className="font-bold border-b-2 border-teal-400">BSCScan.</span>
            </p>
            <p>
              You can also verify our claim of having the "Longest Running Miner"
              on <span className="font-bold border-b-2 border-teal-400">BSCScan.</span>
            </p>
          </div>

          <div className="bg-black bg-opacity-90 text-gray-300 p-4 flex gap-4 flex-col sm:col-span-2">
            <h2 className="text-white w-max text-md font-semibold mb-4 border-b-2 border-teal-400 inline-block">
              Referrals
            </h2>
            <p>
              Share your referral link and receive a 10% bonus on all miners
              hired by your referrals in both the <span className="font-bold">
                "Original BNB Miner"
              </span>{" "}
              and our latest addition to the ecosystem, "FOMO." Pocket your
              earnings in the form of BNB or compound them for the opportunity
              of long-term, daily BNB rewards.
            </p>
            <p className="font-bold border-b-2 border-teal-400 w-max">
              Please connect your wallet to see your referral link.
            </p>
            <h3 className="font-bold border-b-2 border-teal-400 w-max">
              Coming Soon: Enhanced Super Referral System Governed by XBOT
            </h3>
            <p>
              Our new and improved referral system soon offers up to 20% from
              the ecosystem-wide activities of anyone you refer. This more
              rewarding structure is designed to maximize your benefits.
              Participate in our brand-new{" "}
              <span className="font-bold border-b-2 border-teal-400">FOMO</span> game
              to secure your early stake in <span className="font-bold">XBOT</span> and
              boost your earning potential.
            </p>
            <p>Prepare for exciting opportunities ahead!</p>
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
