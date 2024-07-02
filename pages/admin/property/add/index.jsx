import React, { useState } from "react";
import Property from "./Property";
import AdminLayout from "../../AdminLayout";
import Metatag from "../../hook/Metatag";
import Introduction from "./introduction";

export default function Index() {
  const[showProperty,setShowProperty]=useState(false);
  return (
    <>
      <Metatag />
      <AdminLayout heading="Add Property">
        {!showProperty?
        <>
        <Introduction />
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
