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
        <div className="flex justify-end">
          <button className="bg-[#E51D57] text-white py-3 px-5 rounded-md"
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
