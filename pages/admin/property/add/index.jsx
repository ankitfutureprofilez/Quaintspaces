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
      <AdminLayout heading="Add Property">
        {!showProperty? <IntroLayout text={<>
          <div className="flex justify-center mt-4 lg:mt-0 lg:justify-end lg:absolute w-full left-0  lg:bottom-0 lg:border-t-[6px] lg:border-[#ccc] p-[9px] bg-[#fff]">
          <button className=" mx-2 py-2 rounded-xl px-8 hover:bg-[#fff] bg-[#4f46e5] text-[#fff] hover:text-[#4f46e5] border-2 bg-color-[#4f46e5] border-[#4f46e5]  "
          onClick={()=>{
            setShowProperty(true);
          }}> Get Started
          </button>
        </div>
        </>}  /> : <Property /> }
      </AdminLayout>
    </div>
  );
}
