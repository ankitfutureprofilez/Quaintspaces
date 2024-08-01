import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import Nodata from "../hook/NoRecord";
import Spinner from "../hook/spinner";
import { formatMultiPrice } from "../../../hooks/ValueData";


export default function Booking(props) {
  const { record } = props;

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const main = new Listing();
    const response = main.booking(record);
    response
      .then((res) => {
        setLoading(false);
        setContent(res?.data?.data?.user_booking_history);
      })
      .catch((error) => {
        setLoaidng(false);
        console.log("error", error);
      });
  }, [record]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full relative top-0 left-0 z-10 min-w-1200px">
          <div className="flex justify-center items-center space-x-1 text-gray-700">
            <div className="text-lg">Loading...</div>
          </div>
        </div>


      ) : content && content.length > 0 ? (

        <div className="mt-5 overflow-x-auto">
          <div className="inline-block align-middle w-full">
            <table className="min-w-[1200px] w-full table-auto break-all divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="">
                  <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white">
                    {" "}
                    booking Date
                  </td>
                  <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white">
                    booking Number{" "}
                  </td>
                  <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white">
                    Check In & Checkout Time{" "}
                  </td>
                  <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white">
                    Amount
                  </td>
                  <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white">
                    Status
                  </td>
                  <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white">
                    Document Image and Type{" "}
                  </td>
                </tr>
              </thead>
              <tbody className="lg:border-gray-300">
                {content &&
                  content.map((item, index) => (
                    <tr className="" key={index}>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500">
                        {item?.booking_date} 
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {item?.booking_number}
                      </td>

                      <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                        {item?.check_in} & {item?.check_out}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500">
                        { formatMultiPrice(
                          item?.price
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div className="capitalize inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
                          {item?.booking_status}
                        </div>
                      </td>
                      <td className="img-data px-4 py-4 text-sm text-gray-500">
                        <Image
                          width={40}
                          height={40}
                          alt="Document"
                          className="inline-flex items-center rounded-full user-profile-img mr-3"
                          src={item?.front_url}
                        />
                        <div className="capitalize gap-3 inline-flex items-center rounded-full">
                          {item?.doc_type}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

      ) : (
        <Nodata heading={"Booking Not Found "} />
      )}
    </>
  );
}