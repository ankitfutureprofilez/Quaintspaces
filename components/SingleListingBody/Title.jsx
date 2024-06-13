import React, { useContext, useEffect, useState } from "react";
import Heart from "../../public/_svgs/Heart";
import Star from "../../public/_svgs/star";
import Upload from "../../public/_svgs/upload";
import Back from "../common/Back";
import Link from "next/link";

const Title = ({ isSaved, listing, loading }) => {
  function capitalizeFirstLetter(str) {
    // Split the string into words
    const words =str && str?.split(" ");
    
    


    
    // Capitalize the first letter of each word
    const capitalizedWords = words?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1));
  
    // Join the words back together
    return capitalizedWords?.join(" ");
  }
  return (
    <>
      {loading ? (
        <>
          <div className="w-7/12 h-7 mb-2 rounded-md bg-lightBorderColor"></div>
          <div className="w-4/12 h-5 mb-2 rounded-md bg-lightBorderColor"></div>
        </>
      ) : (
        
        <>
        <div className=" pt-4 sm:pt-8 md:pt-12 pb-3 sm:pb-6 md:pb-10">
          <div className="flex flex-wrap items-center">
            <div className={"backtag"} ></div>
              <Back />
              {/* {listing.data?.title.slice(0, 1).toUpperCase() +
              listing.data?.title.slice(1, listing.data?.title.length)} */}
              <span className="text-xl sm:text-2xl lg:text-3xl">
              {capitalizeFirstLetter(listing?.data?.name)}
              </span>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default Title;
