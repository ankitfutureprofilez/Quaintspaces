import Link from "next/link";
import React, { useState, useEffect } from "react";
import Modal from "../elements/Modal";

export default function ThingsToKnow({ record, isAdmin, content }) {
  console.log("record", record);
  const [isOpen, setIsOpen] = useState(false);
  const [formattedAdditionalData, setFormattedAdditionalData] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const safetyAmenities = record?.data?.safety_amenity?.split(',') || record?.safety_amenity?.split(',');
  const jsonString = record?.data?.check_out_instruction; // Fetch the JSON string from your data
  const instructions = jsonString ? JSON.parse(jsonString) : []; // Parse JSON string to JavaScript object

  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  useEffect(() => {
    const handleAdditionalData = (record) => {
      let additionalData;
      let ruleData;
      let formattedData = "";
  
      try {
        // Parse additional_rules JSON if available
        additionalData = record?.data?.property_rule?.additional_rules ? JSON.parse(record?.data?.property_rule?.additional_rules) : null;
        console.log("additionalData", additionalData);
      } catch (e) {
        console.error('Error parsing additional_rules JSON:', e);
      }
  
      // Check if additionalData exists and is valid
      if (additionalData) {
        try {
          if (isAdmin) {
            // Format additionalData by replacing newline characters with <br /> for admin
            formattedData = additionalData.replace(/\r\n/g, '<br />');
          } else {
            // Parse and format ruleData for non-admin
            ruleData = JSON.parse(additionalData);
            formattedData = ruleData.replace(/\r\n/g, '<br />');
          }
          console.log("formattedAdditionalData", formattedData);
        } catch (e) {
          console.error('Error formatting data:', e);
        }
      }
  
      setFormattedAdditionalData(formattedData);
    };
  
    handleAdditionalData(record);
  }, [record, isAdmin]);
  

  console.log("formattedAdditionalData",formattedAdditionalData)

  return (
    <div className="container mx-auto">
      <h1 className="listing-heading text-left !mb-[10px]">Things to know</h1>
      <div className="flex justify-between house-rule-text">
        <div className="flex flex-col mt-3 sm:mt-2 mr-4 md:w-1/3 w-full">
          <h2 className="font-semibold mb-2">Timing </h2>
          <p className="mb-2 text-gray-500">Check-in : {record?.data?.check_in}</p>
          {/* <p className="mb-2 text-gray-500">Flexible/check-in ends after {record?.data?.flexible_check_in}</p> */}
          <p className="mb-2 text-gray-500">Check-out : {record?.data?.check_out}</p>
          {/* <p className="mb-2 text-gray-500">{record?.data?.guests} Guests Maximum</p> */}
        </div>
        <div className="flex flex-col mt-3 sm:mt-2 mr-4 md:w-1/3 w-full">
          <h2 className="font-semibold mb-2">Safety & Property</h2>
          {safetyAmenities?.map((amenity, index) => (
            <p key={index} className="mb-2 text-gray-500 capitalize">
              {amenity?.replaceAll("_", " ") || "Carbon monoxide alarm"}
            </p>
          ))}
        </div>

        <div className="flex flex-col mt-3 sm:mt-2 mr-4 md:w-1/3 w-full">
          <h2 className="font-semibold mb-2">House Rules</h2>
          <p className="mb-2 text-gray-500 capitalize">
            {record?.data?.property_rule?.pet_allowed === 1 ? "Pet is allowed." : "Pet is not allowed."}
          </p>
          <p className="mb-2 text-gray-500 capitalize">
            {record?.data?.property_rule?.photography_allowed === 1 ? "Photography is allowed." : "Photography is not allowed."}
          </p>
          <p className="mb-2 text-gray-500 capitalize">
            {record?.data?.property_rule?.quiet_hours_allowed === 1 ? "Quiet hours are allowed." : "Quiet hours are not allowed."}
          </p>
          <button className="mb-2 text-blue-400 underline text-left" onClick={openModal}>
            See All
          </button>
          <Modal width="md" isOpen={isOpen} onClose={closeModal}>
            <div className="flex flex-col align-center w-full">
              <h2 className="w-full p-4 bg-[#c48b58] text-[#fff] align-center text-lg text-base font-medium bg-[#efa3a3]">
                House Rules
              </h2>
              <div className="p-4">
                <ol className="ml-4 list-decimal mb-[15px] text-[#61554E]">
                  <li className="mb-1 capitalize text-[15px]">
                    {record?.data?.property_rule?.pet_allowed === 1 ? "Pet is allowed." : "Pet is not allowed."}
                  </li>
                  <li className="mb-1 capitalize text-[15px]">
                    {record?.data?.property_rule?.photography_allowed === 1 ? "Photography is allowed." : "Photography is not allowed."}
                  </li>
                  <li className="mb-1 capitalize text-[15px]">
                    {record?.data?.property_rule?.quiet_hours_allowed === 1 ? "Quiet hours are allowed." : "Quiet hours are not allowed."}
                  </li>
                  <li className="mb-1 capitalize text-[15px]">
                    {record?.data?.property_rule?.smoking_allowed === 1 ? "Smoking is allowed." : "Smoking is not allowed."}
                  </li>
                  <li className="mb-1 capitalize text-[15px]">
                    {record?.data?.property_rule?.events_allowed === 1 ? "Event is allowed." : "Event is not allowed."}
                  </li>
                </ol>
                <h2 className="text-[18px] mb-2">Additional Rules</h2>
                <div className="text-[15px] text-[#61554E] leading-[24px]" dangerouslySetInnerHTML={{ __html: formattedAdditionalData }} />
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div className="mb-[30px] mt-[5px] flex">
      <p className="font-semibold">Note:&nbsp;
        <span className="text-gray-500 sm:ml-2 font-normal">The price is subjective to changes based on the number of guests. A maximum of {record?.data?.guests} guests are allowed to stay at the property.</span>
        </p>
      </div>

      {isAdmin && (
        <>
          <div className="flex justify-between house-rule-text">
            <div className="flex flex-col mt-3 sm:mt-2 mr-4 md:w-1/3 w-full">
              <h2 className="font-semibold mb-2">Direction</h2>
              <p className="mb-2 text-gray-500">{record?.data?.property_rule?.direction}</p>
            </div>
            <div className="flex flex-col mt-3 sm:mt-2 mr-4 md:w-1/3 w-full">
              <h2 className="font-semibold mb-2">House Manuals</h2>
              <p className="mb-2 text-gray-500">{record?.data?.property_rule?.house_manuals}</p>
            </div>
            <div className="flex flex-col mt-3 sm:mt-2 mr-4 md:w-1/3 w-full">
              <h2 className="font-semibold mb-2">Wifi Details</h2>
              <p className="mb-2 text-gray-500">{record?.data?.property_rule?.wifi_username}</p>
              <p className="mb-2 text-gray-500">{record?.data?.property_rule?.wifi_password}</p>
            </div>
            <div className="flex flex-col mt-3 sm:mt-2 mr-4 md:w-1/3 w-full">
              <h2 className="font-semibold mb-2">Custom Link</h2>
              {record?.data?.custom_link && (
                <p className="mb-2 text-gray-500">
                  <Link target="_blank" href={`https://quant-stay.vercel.app/properties/${record?.data?.custom_link}`} className="text-blue-500 hover:underline">
                    {`https://quant-stay.vercel.app/properties/${record?.data?.custom_link}`}
                  </Link>
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between house-rule-text">
            <div className="flex flex-col mt-3 sm:mt-2 mr-4 md:w-1/2 w-full">
              <h2 className="font-semibold mb-2">Checkout Instruction</h2>
              {instructions.map((item, index) => (
                <div key={index} className="mb-4">
                  <p className="mb-2 text-gray-500">{item?.instruction}</p>
                  <p>{item?.details}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col mt-3 sm:mt-2 mr-4 md:w-1/2 w-full">
              <h2 className="font-semibold mb-2">Policy</h2>
              <p className="mb-2 text-gray-500">
                {record?.data?.property_rule?.long_term_policy === null ? (record?.data?.property_rule?.long_term_policy) : (record?.data?.property_rule?.standard_policy)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
