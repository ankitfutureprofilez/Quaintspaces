import Link from "next/link";
import React from "react";

export default function ThingsToKnow({ record, isAdmin , content}) {
  ///custom link
  console.log("record",record)
  const safetyAmenities = record?.data?.safety_amenity?.split(',') || record?.safety_amenity?.split(',');
  console.log("safetyAmenities",record?.data?.safety_amenity)
  return (
    <div className="container mx-auto">
      <h1 className="listing-heading text-left !mb-0">Things to know</h1>
      <div className="flex justify-between house-rule-text">
        <div className="flex flex-col mt-3 sm:mt-2 mr-4 w-1/3">
          <h2 className="font-semibold mb-2">Time Management</h2>
          <p className="mb-2 text-gray-500">Check-in starts after {record?.data?.check_in}</p>
          <p className="mb-2 text-gray-500">Flexible/check-in ends after {record?.data?.flexible_check_in}</p>

          <p className="mb-2 text-gray-500">Checkout before  {record?.data?.check_out} </p>
          <p className="mb-2 text-gray-500"> {record?.data?.guests} Guests Maximum</p>

        </div>

        <div className="flex flex-col mt-3 sm:mt-2 mr-4 w-1/3">
          <h2 className="font-semibold mb-2">Safety & Property </h2>
          <p className="mb-2 text-gray-500 flex ">
            <div>
              {safetyAmenities?.map((amenity, index) => (
                <p key={index} className="mb-2 text-gray-500 capitalize ">
                  {amenity?.replaceAll("_", " ") || "Carbon monoxide alarm"}
                </p>
              ))}
            </div>

          </p>
        </div>
        <div className="flex flex-col mt-3 sm:mt-2 mr-4 w-1/3">
          <h2 className="font-semibold mb-2">House Rules</h2>
          <p className="mb-2 text-gray-500 capitalize ">
            {record?.data?.property_rule?.pet_allowed === 1 ? "Pet is allowed." : "Pet is not allowed."}
          </p>
          <p className="mb-2 text-gray-500 capitalize ">
            {record?.data?.property_rule?.photography_allowed === 1 ? "Photography is allowed." : "Photography is not allowed."}
          </p>
          <p className="mb-2 text-gray-500 capitalize ">
            {record?.data?.property_rule?.quiet_hours_allowed === 1 ? "Quiet hours are allowed." : "Quiet hours are not allowed."}
          </p>
          <p className="mb-2 text-gray-500 capitalize ">
            {record?.data?.property_rule?.smoking_allowed === 1 ? "Smoking is allowed." : "Smoking is not allowed."}
          </p>
          <p className="mb-2 text-gray-500 capitalize ">
            {record?.data?.property_rule?.events_allowed === 1 ? "event is allowed." : "event is not allowed."}
          </p>
          {record?.data?.property_rule?.additional_rules &&
            <p className="mb-2 text-gray-500 capitalize">
              additional rules :-
              {record?.data?.property_rule?.additional_rules}
            </p>}



          {/* <p className="mb-2 text-gray-500">This reservation is non-refundable.</p> */}
        </div>
      </div>
      {isAdmin &&

        <div className="flex justify-between house-rule-text">
          <div className="flex flex-col mt-3 sm:mt-2 mr-4 ">
            <h2 className="font-semibold mb-2 ">Direction</h2>
            <p className="mb-2 text-gray-500 justify ">{
              record?.data?.property_rule?.direction}</p>
          </div>

          <div className="flex flex-col mt-3 sm:mt-2 mr-4">
            <h2 className="font-semibold mb-2">House Manuals </h2>
            <p className="mb-2 text-gray-500 flex ">
              <div>
                <p className="mb-2 text-gray-500 justify ">{
                  record?.data?.property_rule?.house_manuals}</p>
              </div>
            </p>
          </div>
          <div className="flex flex-col mt-3 sm:mt-2 mr-4">
            <div>
              <h2 className="font-semibold mb-2">Wifi Details </h2>
              <p className="mb-2 text-gray-500 justify ">{
                record?.data?.property_rule?.wifi_username}</p>
              <p className="mb-2 text-gray-500 justify ">{
                record?.data?.property_rule?.wifi_password}</p>
              {/* <p className="mb-2 text-gray-500">This reservation is non-refundable.</p> */}
            </div>
            <div>
              <h2 className="font-semibold mb-2">Custom Link </h2>
              {record?.data?.custom_link && (
                <p className="mb-2 text-gray-500 text-justify ">
                  <Link href={`https://quant-stay.vercel.app/property/${record?.data?.custom_link}` }  className="text-blue-500 hover:underline" >
                    {`https://quant-stay.vercel.app/property/${record?.data?.custom_link}`}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>}

    </div>
  );
}
