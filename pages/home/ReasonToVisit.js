import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { TbToolsKitchen2, TbAirConditioning } from "react-icons/tb";
import { RiFridgeLine } from "react-icons/ri";
import { MdBalcony, MdOutlineCleaningServices } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
import { BsSpeaker } from "react-icons/bs";
import { PiBooks } from "react-icons/pi";
import { MdOutlinePool } from "react-icons/md";
import { MdTv } from 'react-icons/md';

export default function ReasonToVisit() {
  const reasons = [
    { name: "Kitchen", icon: <TbToolsKitchen2 /> },
    { name: "Refrigerator", icon: <RiFridgeLine/> },
    { name: "Balcony", icon: <MdBalcony /> },
    { name: "Internet Access", icon: <FaWifi/> },
    { name: "Free Parking", icon: <LuParkingCircle /> },
    { name: "Daily housekeeping", icon: <MdOutlineCleaningServices/> },
    { name: "Air conditioning", icon: <TbAirConditioning/> },
    { name: "Prime location", icon: <GrMapLocation/> },
    { name: "Music Speakers", icon: <BsSpeaker/> },
    { name: "Games & Books", icon: <PiBooks /> },
    { name: "Pool / Jacuzzi", icon: <MdOutlinePool /> },
    { name: "TV", icon: <MdTv/> }
  ];

  return (
    <div className="visit-us-sec relative ">
      <div className="container capitalize mx-auto relative z-10">
        <h2>Facilities we offer</h2>
        <div className="smart-box">
        {reasons.map((reason, index) => (
                <div className="iteam sm:w-[200px] w-[150px] mb-3" key={index} >
                  <div className="flex flex-col gap-2">
                    {reason?.icon}
                    {reason?.name}
                    </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}