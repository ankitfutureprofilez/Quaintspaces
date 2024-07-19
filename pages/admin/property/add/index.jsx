import React, { useState } from "react";
import Property from "./Property";
import AdminLayout from "../../AdminLayout";
import Metatag from "../../hook/Metatag";
import IntroLayout from "./IntroLayout";

export default function Index() {
  const[showProperty,setShowProperty]=useState(false);
  return (
    <>
      <Metatag />
      <AdminLayout heading="Add Property">
        {!showProperty?
        <>
        <IntroLayout />
        <div className="flex justify-end fixed w-full md:w-[calc(100%-260px)] left-0 md:left-auto bottom-0 right-[20px] border-t-[6px] border-[#ccc] p-[9px] bg-[#fff]">
          <button className=" mx-2 py-2 rounded-xl px-8 hover:bg-[#fff] bg-[#4f46e5] text-[#fff] hover:text-[#4f46e5] border-2 bg-color-[#4f46e5] border-[#4f46e5]  "
          onClick={()=>{
            setShowProperty(true);
          }}>
            Get Started
          </button>
        </div>
        </>
          :
          <Property/>
          
          }
      </AdminLayout>
    </>
  );
}
