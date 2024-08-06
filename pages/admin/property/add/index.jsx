import React, { useState } from "react";
import Property from "./Property";
import AdminLayout from "../../AdminLayout";
import Metatag from "../../hook/Metatag";
import IntroLayout from "./IntroLayout";

export default function Index() {
  const[showProperty,setShowProperty]=useState(false);
  return (
    <div>
      <Metatag />
      <AdminLayout text={<>
          <div className="flex justify-end absolute w-full left-0  bottom-0 border-t-[6px] border-[#ccc] p-[9px] bg-[#fff]">
          <button className=" mx-2 py-2 rounded-xl px-8 hover:bg-[#fff] bg-[#4f46e5] text-[#fff] hover:text-[#4f46e5] border-2 bg-color-[#4f46e5] border-[#4f46e5]  "
          onClick={()=>{
            setShowProperty(true);
          }}> Get Started
          </button>
        </div>
        </>} heading="Add Property">
        {!showProperty?
        <>
        <IntroLayout  />
        
        </>
          :
          <Property/>
          
          }
      </AdminLayout>
    </div>
  );
}
