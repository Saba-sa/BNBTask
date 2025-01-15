"use client";

import React from "react";
import Link from "next/link";
import { MdClose } from "react-icons/md";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 pt-20 h-full w-64 bg-black opacity-80 text-white shadow-lg transform transition-transform duration-300 z-20 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 text-white  text-2xl flex justify-between">
        <h2 className="text-xl font-semibold">Explore</h2>
        <button onClick={closeSidebar}><MdClose/>
        </button>
      </div>
      <ul className="p-4 space-y-4">
        <li>
          <Link href="/home">
            
            <button
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition duration-300"
            onClick={closeSidebar}          >
Home  (The OG Miner)        </button>
          </Link>
        </li>
        <li>
          <Link href="/fomo">
            
            <button
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition duration-300"
            onClick={closeSidebar}          >
FOMO (Competition)          </button>
          </Link>
        </li>
        <li>
          <Link href="/ageofdimonds">
          <button
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition duration-300"
            onClick={closeSidebar}          >
ACE OF DIAMONDS          </button>
          </Link>
        </li>
        <li>
          <Link href="/xbot">
          <button
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition duration-300"
            onClick={closeSidebar}          >
XBOT (REVENUE)          </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
