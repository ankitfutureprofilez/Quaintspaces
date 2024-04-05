import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";

export default function Booking({ record }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    const main = new Listing();
    const response = main.booking(record);
    response
      .then((res) => {
        console.log("res", res);
        setContent(res?.data?.data?.user_booking_history);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [record]);

  return (
    <div className="">
      <div className="mx-auto mt-8 ">
        {/* <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-base font-bold text-gray-900">Booking history </p>

          <div className="mt-4 sm:mt-0">
            <div className="flex items-center justify-start sm:justify-end">
              <div className="flex items-center">
                <label htmlFor="" className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"> Sort by: </label>
                <select name="" className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm">
                  <option className="whitespace-no-wrap text-sm">Recent</option>
                </select>
              </div>

              <button type="button" className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow">
                <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" className=""></path>
                </svg>
                Export to CSV
              </button>
            </div>
          </div>
        </div> */}

        <div className="mt-6 overflow-hidden rounded-xl border shadow">
          <table className="min-w-[1200px] w-full border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b lg:table-header-group">
              <tr className="">
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"> booking Date</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">booking Number </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Check In & Checkout Time </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Amount</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Status</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Document Image and Type </td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              {content && content.map((item, index) => (
                <tr className="" key={index}>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{item?.booking_date}</td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{item?.booking_number}</td>

                  <td  className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                    {item?.check_in} & {item?.check_out}
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    {item?.price}
                    <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">{item?.booking_status}</div>
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">{item?.booking_status}</div>
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                      <Image  width={40} height={40 } className= "inline-flex items-center rounded-full " src={item?.front_url}/>
                  <div className="inline-flex items-center rounded-full">{item?.doc_type}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
