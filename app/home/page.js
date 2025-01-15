"use client";

import React from "react";
import Main from "../components/Main";
import Gamedetail from "../components/Gamedetail";

export default function MainPage() {


  return (
    <div className="bg-[url('/background.png')] bg-cover bg-center bg-fixed h-screen w-full overflow-x-hidden overflow-y-scroll">
      <div className="flex flex-col min-h-screen overflow-y-auto">
        <Main />
        <Gamedetail />
      </div>

     
    </div>
  );
}
