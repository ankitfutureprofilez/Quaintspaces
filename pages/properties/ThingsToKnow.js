import Link from "next/link";
import React, { useState, useEffect } from "react";
import Modal from "../elements/Modal";

export default function ThingsToKnow({ record, isAdmin, content }) {
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


  const formattedRules = record?.data?.property_rule?.additional_rules?.split('\n')?.filter(rule => rule.trim() !== '');


  return (
    <div className="container mx-auto pb-4">
      <h1 className="listing-heading text-left !mb-[10px] ">Things to know</h1>
      <div className="flex justify-between house-rule-text">
        <div className="flex flex-col mt-3 sm:mt-2 mr-4 md:w-1/3 w-full pe-4">
          <h2 className="font-semibold mb-2">Timings </h2>
          <p className="mb-2 text-gray-500">Check in:  {record?.data?.check_in}</p>
          {/* <p className="mb-2 text-gray-500">Flexible/check-in ends after {record?.data?.flexible_check_in}</p> */}
          <p className="mb-2 text-gray-500">Check out: {record?.data?.check_out}</p>
          {/* Note added here */}
          <p className="mb-2 text-gray-500">
            <span className="font-semibold text-black">Note:&nbsp;</span>
            The price is subjective to changes based on the number of guests. A maximum of {record?.data?.guests} guests are allowed to stay at the property.
          </p>
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
          <p className="mb-2 text-gray-500 ">
            {record?.data?.property_rule?.pet_allowed === 1 ? "Pet is allowed." : "Pet is not allowed."}
          </p>
          <p className="mb-2 text-gray-500 ">
            {record?.data?.property_rule?.photography_allowed === 1 ? "Photography is allowed." : "Photography is not allowed."}
          </p>
          <p className="mb-2 text-gray-500 ">
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
                {formattedRules &&
                  <h2 className="text-[18px] mb-2">Additional Rules</h2>
                }
                <div className="text-[15px] text-[#61554E] leading-[24px]">
                  <ul>
                    {formattedRules && formattedRules?.map((rule, index) => (
                      <li key={index}>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-[15px] text-[#61554E] leading-[24px]" dangerouslySetInnerHTML={{ __html: formattedAdditionalData }} />
              </div>
            </div>
          </Modal>
        </div>
      </div>



      {/* {isAdmin && (
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
                  <Link target="_blank" href={`https://www.quaintspaces.in/properties/${record?.data?.custom_link}`} className="text-blue-500 hover:underline">
                    {`https://www.quaintspaces.in/properties/${record?.data?.custom_link}`}
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
      )}  */}
    </div>
  );
}
