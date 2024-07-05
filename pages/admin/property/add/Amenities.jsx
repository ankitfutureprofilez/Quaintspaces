import React from "react";
import { PiHairDryerBold, PiFireExtinguisherThin, PiPicnicTableThin, } from "react-icons/pi";
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
import { PiTelevision, PiWashingMachine } from "react-icons/pi";
const amenitiesData = {
  amenities: [
    {
      value: "wifi",
      title: "Wifi",
      icons: <FaWifi style={{ color: "#222222", fontSize: "30px" }} />
    },
    {
      value: "tv",
      title: "TV",
      icons: <PiTelevision style={{ color: "#222222", fontSize: "30px" }} />
    },
    {
      value: "kitchen",
      title: "Kitchen",
      icons: <GiKitchenKnives style={{ color: "#222222", fontSize: "30px" }} />
    },
    {
      value: "washing_machine",
      title: "Washing machine",
      icons: <PiWashingMachine style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "free_parking_on_premises",
      title: "Free parking ",
      icons: <FaParking style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "paid_parking_on_premises",
      title: "Paid parking ",
      icons: <MdOutlineLocalParking style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "air_conditioning",
      title: "Air conditioning",
      icons: <TbAirConditioning style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "dedicated_workspace",
      title: "Dedicated workspace",
      icons: <BsPersonWorkspace style={{ color: "#222222", fontSize: "30px" }} />,
    },
  ],
  standout_amenity: [
    { value: "pool", title: "Pool", icons: <MdPool style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "hot_tub", title: "Hot tub", icons: <FaHotTubPerson style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "patio", title: "Patio", icons: <BiChair style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "bbq_grill", title: "BBQ grill", icons: <MdOutdoorGrill style={{ color: "#222222", fontSize: "30px" }} /> },
    {
      value: "outdoor_dining_area",
      title: "Outdoor dining area",
      icons: <PiPicnicTableThin style={{ color: "#222222", fontSize: "30px" }} />,
    },
    { value: "firepit", title: "Firepit", icons: <FaFireBurner style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "pool_table", title: "Pool table", icons: <GiPoolTableCorner style={{ color: "#222222", fontSize: "30px" }} /> },
    {
      value: "indoor_fireplace",
      title: "Indoor fireplace",
      icons: <MdOutlineFireplace style={{ color: "#222222", fontSize: "30px" }} />,
    },
    { value: "piano", title: "Piano", icons: <VscPiano style={{ color: "#222222", fontSize: "30px" }} /> },
    {
      value: "exercise_equipment",
      title: "Exercise equipment",
      icons: <CgGym style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "lake_access",
      title: "Lake access",
      icons: <FaArrowUpFromWaterPump style={{ color: "#222222", fontSize: "30px" }} />,
    },
    { value: "beach_access", title: "Beach access", icons: <MdBeachAccess style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "ski_in_out", title: "Ski-in/out", icons: <FaPersonSkiingNordic style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "hair_dryer", title: "Hair dryer", icons: <PiHairDryerBold style={{ color: "#222222", fontSize: "30px" }} /> },
    { value: "outdoor_shower", title: "Outdoor shower", icons: <FaShower style={{ color: "#222222", fontSize: "30px" }} /> },
  ],

  safety_amenity: [
    { value: "smoke_alarm", title: "Smoke alarm", icons: <BiSolidAlarmExclamation style={{ color: "#222222", fontSize: "30px" }} /> },
    {
      value: "first_aid_kit",
      title: "First aid kit",
      icons: <RiFirstAidKitFill style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "fire_extinguisher",
      title: "Fire extinguisher",
      icons: <PiFireExtinguisherThin style={{ color: "#222222", fontSize: "30px" }} />,
    },
    {
      value: "carbon_monoxide_alarm",
      title: "Carbon monoxide alarm",
      icons: <TbBrandCarbon style={{ color: "#222222", fontSize: "30px" }} />,
    },
  ],


};

export default function Amenities({ selectedAmenity, setSelectedAmenity, standoutAmenity, setstandoutAmenity, Amenity, setAmenity }) {


  const toggleSelectedAmenity = (amenityValue) => {
    const isSelected = selectedAmenity?.includes(amenityValue);
    if (isSelected) {
      setSelectedAmenity((prevSelected) =>
        prevSelected?.filter((item) => item !== amenityValue)
      );
    } else {
      setSelectedAmenity((prevSelected) => [...prevSelected, amenityValue]);
    }
  };

  const toggleAmenity = (amenityValue) => {
    const isSelected = Amenity?.includes(amenityValue);
    if (isSelected) {
      setAmenity((prevSelected) =>
        prevSelected?.filter((item) => item !== amenityValue)
      );
    } else {
      setAmenity((prevSelected) => [...prevSelected, amenityValue]);
    }
  };

  const togglestandoutAmenity = (amenityValue) => {
    const isSelected = standoutAmenity?.includes(amenityValue);
    if (isSelected) {
      setstandoutAmenity((prevSelected) =>
        prevSelected?.filter((item) => item !== amenityValue)
      );
    } else {
      setstandoutAmenity((prevSelected) => [...prevSelected, amenityValue]);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl capitalize md:text-2xl lg:text-3xl text-center mt-4 font-bold md:mb-8">
        Tell guests what your place has to offer
      </h2>
      <p className="text-normal text-center text-gray-500 mb-8">
        You can add more amenities after you publish your listing.
      </p>

      <p className="text-bold font-bold text-left text-gray-500 mb-6 mt-6">
      What about these guest favourites?
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4    ">
      
        {amenitiesData &&
          amenitiesData?.amenities?.map((amenity, i) => (
            <div key={i} className="">
              <div
                onClick={() => toggleSelectedAmenity(amenity?.value)}
                className={`property-type-wrap cursor-pointer p-4 hover:shadow-[0_0px_0px_1.5px_#222] shadow-[0_0px_0px_1px_#ccc] rounded-[8px]  ${selectedAmenity?.includes(amenity.value) ? "bg-[#efefef] shadow-[0_0px_0px_1px_#efefef] text-slate-700 " : ""
                  }`}
              >
                {amenity?.icons}
                <h2
                  className={`text-[16px] mt-[10px] font-normal capitalize ${selectedAmenity?.includes(amenity.value)
                    ? "text-[#222222]"
                    : "text-[#222222]"
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

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4   ">
        {amenitiesData &&
          amenitiesData?.standout_amenity?.map((amenity, i) => (
            <div key={i} className="">
              <div
                onClick={() => togglestandoutAmenity(amenity.value)}
                className={`property-type-wrap cursor-pointer p-4 hover:shadow-[0_0px_0px_1.5px_#222] shadow-[0_0px_0px_1px_#ccc] rounded-[8px] ${standoutAmenity?.includes(amenity.value) ? "bg-[#efefef] shadow-[0_0px_0px_1px_#efefef] text-slate-700" : ""
                  }`}
              >
                {amenity.icons}
                <h2
                  className={`text-[16px] mt-[10px] font-normal  capitalize ${standoutAmenity?.includes(amenity.value)
                    ? "text-[#222222]"
                    : "text-[#222222]"
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

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4    ">
        {amenitiesData &&
          amenitiesData?.safety_amenity?.map((amenity, i) => (
            <div key={i} className="">
              <div
                onClick={() => toggleAmenity(amenity.value)}
                className={`property-type-wrap cursor-pointer p-4 hover:shadow-[0_0px_0px_1.5px_#222] shadow-[0_0px_0px_1px_#ccc] rounded-[8px]  ${Amenity?.includes(amenity.value) ? "bg-[#efefef] shadow-[0_0px_0px_1px_#efefef] text-slate-700 " : ""
                  }`}
              >
                {amenity.icons}
                <h2
                  className={`text-[16px] mt-[10px] font-normal capitalize ${Amenity?.includes(amenity.value)
                    ? "text-[#222222]"
                    : "text-[#222222]"
                    }`}
                >
                  {amenity.title}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}