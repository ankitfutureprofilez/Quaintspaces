import React, { useEffect, useState } from "react";
import {
  PiWashingMachine,
  PiHairDryerBold,
  PiFireExtinguisherThin,
  PiPicnicTableThin,
} from "react-icons/pi";
import { TbBrandCarbon, TbAirConditioning } from "react-icons/tb";
import { FaShower, FaHeadphones } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import {
  MdOutlineLocalParking,
  MdOutlineFireplace,
  MdPool,
  MdOutdoorGrill,
} from "react-icons/md";
import { RiFirstAidKitFill } from "react-icons/ri";
import { BiChair } from "react-icons/bi";
import {
  FaWifi,
  FaParking,
  FaArrowUpFromWaterPump,
  FaFireBurner,
  FaHotTubPerson,
  FaUmbrellaBeach,
  FaPersonSkiing,
} from "react-icons/fa6";
import { GiPoolTableCorner, GiKitchenKnives } from "react-icons/gi";
import { VscPiano } from "react-icons/vsc";

const amenitiesData = {
  amenities: [
    { value: "wifi", title: "Wifi", icons: "WiFi" },
    { value: "tv", title: "TV", icons: "WashingMachine" },
    { value: "kitchen", title: "Kitchen", icons: "Kitchen" },
    {
      value: "washing_machine",
      title: "Washing machine",
      icons: "WashingMachine",
    },
    {
      value: "free_parking_on_premises",
      title: "Free parking on premises",
      icons: "FreeParking",
    },
    {
      value: "paid_parking_on_premises",
      title: "Paid parking on premises",
      icons: "paidParking",
    },
    {
      value: "air_conditioning",
      title: "Air conditioning",
      icons: "TbAirConditioning",
    },
    {
      value: "dedicated_workspace",
      title: "Dedicated workspace",
      icons: "BsPersonWorkspace",
    },
  ],
  amenities2: [
    { value: "pool", title: "Pool", icons: "MdPool" },
    { value: "hot_tub", title: "Hot tub", icons: "FaHotTubPerson" },
    { value: "patio", title: "Patio", icons: "BiChair" },
    { value: "bbq_grill", title: "BBQ grill", icons: "MdOutdoorGrill" },
    {
      value: "outdoor_dining_area",
      title: "Outdoor dining area",
      icons: "PiPicnicTableThin",
    },
    { value: "firepit", title: "Firepit", icons: "FaFireBurner" },
    { value: "pool_table", title: "Pool table", icons: "GiPoolTableCorner" },
    {
      value: "indoor_fireplace",
      title: "Indoor fireplace",
      icons: "MdOutlineFireplace",
    },
    { value: "piano", title: "Piano", icons: "VscPiano" },
    {
      value: "exercise_equipment",
      title: "Exercise equipment",
      icons: "FaHeadphones",
    },
    {
      value: "lake_access",
      title: "Lake access",
      icons: "FaArrowUpFromWaterPump",
    },
    { value: "beach_access", title: "Beach access", icons: "FaUmbrellaBeach" },
    { value: "ski_in_out", title: "Ski-in/out", icons: "FaPersonSkiing" },
    { value: "hair_dryer", title: "Hair dryer", icons: "PiHairDryerBold" },
    { value: "outdoor_shower", title: "Outdoor shower", icons: "FaShower" },
  ],
  standout_amenity: [
    { value: "smoke_alarm", title: "Smoke alarm", icons: "MdOutlineSmokeFree" },
    {
      value: "first_aid_kit",
      title: "First aid kit",
      icons: "RiFirstAidKitFill",
    },
    {
      value: "fire_extinguisher",
      title: "Fire extinguisher",
      icons: "PiFireExtinguisherThin",
    },
    {
      value: "carbon_monoxide_alarm",
      title: "Carbon monoxide alarm",
      icons: "TbBrandCarbon",
    },
  ],
};



const iconMapping = {
  FreeParking: <FaParking style={{ color: "black", fontSize: "40px" }} />,
  paidParking: (
    <MdOutlineLocalParking style={{ color: "black", fontSize: "40px" }} />
  ),
  WiFi: <FaWifi style={{ color: "black", fontSize: "40px" }} />,
  Kitchen: <GiKitchenKnives style={{ color: "black", fontSize: "40px" }} />,
  WashingMachine: (
    <PiWashingMachine style={{ color: "black", fontSize: "40px" }} />
  ),
  BsPersonWorkspace: (
    <BsPersonWorkspace style={{ color: "black", fontSize: "40px" }} />
  ),
  TbAirConditioning: (
    <TbAirConditioning style={{ color: "black", fontSize: "40px" }} />
  ),
  PiFireExtinguisherThin: (
    <PiFireExtinguisherThin style={{ color: "black", fontSize: "40px" }} />
  ),
  TbBrandCarbon: <TbBrandCarbon style={{ color: "black", fontSize: "40px" }} />,
  RiFirstAidKitFill: (
    <RiFirstAidKitFill style={{ color: "black", fontSize: "40px" }} />
  ),
 
  FaShower: <FaShower style={{ color: "black", fontSize: "40px" }} />,
  PiHairDryerBold: (
    <PiHairDryerBold style={{ color: "black", fontSize: "40px" }} />
  ),
  FaPersonSkiing: (
    <FaPersonSkiing style={{ color: "black", fontSize: "40px" }} />
  ),
  FaUmbrellaBeach: (
    <FaUmbrellaBeach style={{ color: "black", fontSize: "40px" }} />
  ),
  FaArrowUpFromWaterPump: (
    <FaArrowUpFromWaterPump style={{ color: "black", fontSize: "40px" }} />
  ),
  MdPool: <MdPool style={{ color: "black", fontSize: "40px" }} />,
  FaHotTubPerson: (
    <FaHotTubPerson style={{ color: "black", fontSize: "40px" }} />
  ),
  BiChair: <BiChair style={{ color: "black", fontSize: "40px" }} />,
  MdOutdoorGrill: (
    <MdOutdoorGrill style={{ color: "black", fontSize: "40px" }} />
  ),
  PiPicnicTableThin: (
    <PiPicnicTableThin style={{ color: "black", fontSize: "40px" }} />
  ),
  FaFireBurner: <FaFireBurner style={{ color: "black", fontSize: "40px" }} />,
  GiPoolTableCorner: (
    <GiPoolTableCorner style={{ color: "black", fontSize: "40px" }} />
  ),
  MdOutlineFireplace: (
    <MdOutlineFireplace style={{ color: "black", fontSize: "40px" }} />
  ),
  VscPiano: <VscPiano style={{ color: "black", fontSize: "40px" }} />,
  FaHeadphones: <FaHeadphones style={{ color: "black", fontSize: "40px" }} />,
};

export default function Amenities() {
  const [selectedAmenity, setSelectedAmenity] = useState([]);
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

  const [Amenity, setAmenity] = useState([]);
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

  const [standoutAmenity, setstandoutAmenity] = useState([]);
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

  console.log(standoutAmenity,Amenity,selectedAmenity)
  return (
    <>
      <h2 className="text-3xl text-center font-bold mt-5  mb-2">
        Tell guests what your place has to offer
      </h2>
      <p className="text-normal text-center text-gray-500 mb-8">
        You can add more amenities after you publish your listing.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {amenitiesData &&
          amenitiesData?.amenities?.map((amenity, i) => (
            <div key={i} className="">
              <div
                onClick={() => toggleSelectedAmenity(amenity.value)}
                className={`property-type-wrap cursor-pointer p-4 border rounded-xl ${
                  selectedAmenity.includes(amenity.value) ? "bg-white-600" : ""
                }`}
              >
                {/* {iconMapping[amenity.icons] || (
                  <div style={{ fontSize: "40px" }}>?</div>
                )} */}
                <h2
                  className={`text-lg mt-4 font-bold  capitalize ${
                    selectedAmenity.includes(amenity.value)
                      ? "text-black-300"
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

      <div className="grid grid-cols-3 gap-4">
        {amenitiesData &&
          amenitiesData?.amenities2?.map((amenity, i) => (
            <div key={i} className="">
              <div
                onClick={() => toggleAmenity(amenity.value)}
                className={`property-type-wrap cursor-pointer p-4 border rounded-xl ${
                 Amenity.includes(amenity.value) ? "bg-indigo-600" : ""
                }`}
              >
                 {/* {iconMapping[amenity.icons] || (
                  <div style={{ fontSize: "40px" }}>?</div>
                )} */}
                <h2
                  className={`text-lg mt-4 font-bold capitalize ${
                    Amenity.includes(amenity.value)
                      ? "text-black-300"
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

      <div className="grid grid-cols-3 gap-4   ">
        {amenitiesData &&
          amenitiesData?.standout_amenity?.map((amenity, i) => (
            <div key={i} className="">
              <div
                onClick={() => togglestandoutAmenity(amenity.value)}
                className={`property-type-wrap cursor-pointer text-left p-4 border rounded-xl ${
                  standoutAmenity.includes(amenity.value) ? "bg-indigo-600" : ""
                }`}
              >
                {iconMapping[amenity.icons] || (
                  <div style={{ fontSize: "40px" }}>?</div>
                )}
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
    </>
  );
}
