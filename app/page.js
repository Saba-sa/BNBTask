"use client";
import React, { useEffect } from "react";
 import { useRouter } from "next/navigation";
 
const Page = () => {
  const router = useRouter();
 

  useEffect(() => {
    const initializeContract = async () => {
           router.push("/home");  
      
    };

    initializeContract();
  }, []);

 
  
}
export default Page;
