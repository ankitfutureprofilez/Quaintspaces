import React from "react";
import { PiHairDryerBold, PiFireExtinguisherThin, PiPicnicTableThin,} from "react-icons/pi";
import { CgGym } from "react-icons/cg";
import { MdBeachAccess } from "react-icons/md";
import { TbBrandCarbon, TbAirConditioning } from "react-icons/tb";
import { FaShower } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import {
  MdOutlineLocalParking,
  MdOutlineFireplace,
  MdPool,
  MdOutdoorGrill,
} from "react-icons/md";
import { RiFirstAidKitFill } from "react-icons/ri";
import { BiChair } from "react-icons/bi";
import { FaParking } from "react-icons/fa";
import {
  FaWifi,
  FaArrowUpFromWaterPump,
  FaFireBurner,
  FaHotTubPerson,
} from "react-icons/fa6";
import { BiSolidAlarmExclamation } from "react-icons/bi";
import { FaPersonSkiingNordic } from "react-icons/fa6";
import { GiPoolTableCorner, GiKitchenKnives } from "react-icons/gi";
import { VscPiano } from "react-icons/vsc";
import { PiTelevision,PiWashingMachine  } from "react-icons/pi";
const amenitiesData = {
  amenities: [
    { value: "wifi",
     title: "Wifi",
      icons: <FaWifi style={{ color: "black", fontSize: "40px" }} /> },
    { value: "tv",
     title: "TV", 
    icons: <PiTelevision style={{ color: "black", fontSize: "40px" }} /> },
    { value: "kitchen",
     title: "Kitchen", 
    icons: <GiKitchenKnives style={{ color: "black", fontSize: "40px" }} />},
    {
      value: "washing_machine",
      title: "Washing machine",
      icons: <PiWashingMachine  style={{ color: "black", fontSize: "40px" }} />,
    },
    {
      value: "free_parking_on_premises",
      title: "Free parking ",
      icons:  <FaParking style={{ color: "black", fontSize: "40px" }} />,
    },
    {
      value: "paid_parking_on_premises",
      title: "Paid parking ",
      icons: <MdOutlineLocalParking style={{ color: "black", fontSize: "40px" }} />,
    },
    {
      value: "air_conditioning",
      title: "Air conditioning",
      icons: <TbAirConditioning style={{ color: "black", fontSize: "40px" }} />,
    },
    {
      value: "dedicated_workspace",
      title: "Dedicated workspace",
      icons: <BsPersonWorkspace style={{ color: "black", fontSize: "40px" }} />,
    },
  ],
  standout_amenity: [
    { value: "pool", title: "Pool", icons: <MdPool style={{ color: "black", fontSize: "40px" }} /> },
    { value: "hot_tub", title: "Hot tub", icons: <FaHotTubPerson style={{ color: "black", fontSize: "40px" }} /> },
    { value: "patio", title: "Patio", icons: <BiChair style={{ color: "black", fontSize: "40px" }} /> },
    { value: "bbq_grill", title: "BBQ grill", icons:  <MdOutdoorGrill style={{ color: "black", fontSize: "40px" }} /> },
    {
      value: "outdoor_dining_area",
      title: "Outdoor dining area",
      icons: <PiPicnicTableThin style={{ color: "black", fontSize: "40px" }} />,
    },
    { value: "firepit", title: "Firepit", icons: <FaFireBurner style={{ color: "black", fontSize: "40px" }} /> },
    { value: "pool_table", title: "Pool table", icons:  <GiPoolTableCorner style={{ color: "black", fontSize: "40px" }} /> },
    {
      value: "indoor_fireplace",
      title: "Indoor fireplace",
      icons: <MdOutlineFireplace style={{ color: "black", fontSize: "40px" }} />,
    },
    { value: "piano", title: "Piano", icons: <VscPiano style={{ color: "black", fontSize: "40px" }} /> },
    {
      value: "exercise_equipment",
      title: "Exercise equipment",
      icons:  <CgGym style={{ color: "black", fontSize: "40px" }} />,
    },
    {
      value: "lake_access",
      title: "Lake access",
      icons: <FaArrowUpFromWaterPump style={{ color: "black", fontSize: "40px" }} />,
    },
    { value: "beach_access", title: "Beach access", icons: <MdBeachAccess style={{ color: "black", fontSize: "40px" }} />  },
    { value: "ski_in_out", title: "Ski-in/out", icons: <FaPersonSkiingNordic  style={{ color: "black", fontSize: "40px" }} /> },
    { value: "hair_dryer", title: "Hair dryer", icons: <PiHairDryerBold style={{ color: "black", fontSize: "40px" }} />},
    { value: "outdoor_shower", title: "Outdoor shower", icons: <FaShower style={{ color: "black", fontSize: "40px" }} /> },
  ],

safety_amenity: [
    { value: "smoke_alarm", title: "Smoke alarm", icons: <BiSolidAlarmExclamation style={{ color: "black", fontSize: "40px" }}  />},
    {
      value: "first_aid_kit",
      title: "First aid kit",
      icons: <RiFirstAidKitFill style={{ color: "black", fontSize: "40px" }} />,
    },
    {
      value: "fire_extinguisher",
      title: "Fire extinguisher",
      icons:  <PiFireExtinguisherThin style={{ color: "black", fontSize: "40px" }} />,
    },
    {
      value: "carbon_monoxide_alarm",
      title: "Carbon monoxide alarm",
      icons: <TbBrandCarbon style={{ color: "black", fontSize: "40px" }} />,
    },
  ],

  
};







export default function Amenities({selectedAmenity, setSelectedAmenity,standoutAmenity, setstandoutAmenity, Amenity, setAmenity}) {
  

  const toggleSelectedAmenity = (amenityValue) => {
    const isSelected = selectedAmenity.includes(amenityValue);
    if (isSelected) {
      setSelectedAmenity((prevSelected) =>
        prevSelected.filter((item) => item !== amenityValue)
      );
    } else {
      setSelectedAmenity((prevSelected) => [...prevSelected, amenityValue]);
    }
  };

  const toggleAmenity = (amenityValue) => {
    const isSelected = Amenity.includes(amenityValue);
    if (isSelected) {
      setAmenity((prevSelected) =>
        prevSelected.filter((item) => item !== amenityValue)
      );
    } else {
      setAmenity((prevSelected) => [...prevSelected, amenityValue]);
    }
  };

  const togglestandoutAmenity = (amenityValue) => {
    const isSelected = standoutAmenity.includes(amenityValue);
    if (isSelected) {
      setstandoutAmenity((prevSelected) =>
        prevSelected.filter((item) => item !== amenityValue)
      );
    } else {
      setstandoutAmenity((prevSelected) => [...prevSelected, amenityValue]);
    }
  };

  return (
    <>
      <h2 className="text-3xl text-center font-bold mt-5  mb-2 mt-5">
        Tell guests what your place has to offer
      </h2>
      <p className="text-normal text-center text-gray-500 mb-8">
        You can add more amenities after you publish your listing.
      </p>

      <div className="grid grid-cols-4  gap-1   ">
        {amenitiesData &&
          amenitiesData?.amenities?.map((amenity, i) => (
            <div key={i} className="">
              <div
                onClick={() => toggleSelectedAmenity(amenity.value)}
                className={`property-type-wrap cursor-pointer text-left p-4 border rounded-xl ${
                  selectedAmenity.includes(amenity.value) ? "bg-indigo-600" : ""
                }`}
              >
               {amenity?.icons}
                <h2
                  className={`text-lg mt-4 font-bold text-left  capitalize ${
                    selectedAmenity.includes(amenity.value)
                      ? "text-white-300"
                      : "text-white-600"
                  }`}
                >
                  {amenity.title}
                </h2>
              </div>
            </div>
          ))}
      </div>

      <p className="text-bold font-bold text-left text-gray-500 mb-6 mt-6">
        Do you have any standout amenities?
      </p>

      <div className="grid grid-cols-4 gap-4   ">
        {amenitiesData &&
          amenitiesData?.standout_amenity?.map((amenity, i) => (
            <div key={i} className="">
              <div
                onClick={() => togglestandoutAmenity(amenity.value)}
                className={`property-type-wrap cursor-pointer text-left p-4 border rounded-xl ${
                  standoutAmenity.includes(amenity.value) ? "bg-indigo-600" : ""
                }`}
              >
                  {amenity.icons}
                <h2
                  className={`text-lg mt-4 font-bold text-left  capitalize ${
                    standoutAmenity.includes(amenity.value)
                      ? "text-white-300"
                      : "text-white-600"
                  }`}
                >
                  {amenity.title}
                </h2>
              </div>
            </div>
          ))}
      </div>

      <p className="text-bold font-bold text-left text-gray-500 mb-6 mt-6">
        Do you have any of these safety items?
      </p>

      <div className="grid grid-cols-4 gap-4   ">
        {amenitiesData &&
          amenitiesData?.safety_amenity?.map((amenity, i) => (
            <div key={i} className="">
              <div
                onClick={() => toggleAmenity(amenity.value)}
                className={`property-type-wrap cursor-pointer text-left p-4 border rounded-xl ${
                  Amenity.includes(amenity.value) ? "bg-indigo-600" : ""
                }`}
              >
                 {amenity.icons}
                <h2
                  className={`text-lg mt-4 font-bold text-left  capitalize ${
                    Amenity.includes(amenity.value)
                      ? "text-white-300"
                      : "text-white-600"
                  }`}
                >
                  {amenity.title}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}