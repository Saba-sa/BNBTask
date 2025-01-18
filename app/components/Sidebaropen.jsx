"use client";
import  { useState } from "react";
import { FaLink } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Sidebaropen=()=>{
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);
return (<> 
    <button
      onClick={toggleSidebar}
      className="fixed top-[100px] sm:top-[120px] md:top-[130px]   lg:top-24 xl:top-20 left-8 w-28 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
    >
      <FaLink />
      Explore
    </button>  <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />

{isSidebarOpen && (
  <div
    className="fixed inset-0 bg-black opacity-50 z-10"
    onClick={closeSidebar}
  ></div>
)}</>)
}
export default Sidebaropen;