import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";
import Nodata from "../hook/NoRecord";
import Spinner from "../hook/spinner";
import Link from "next/link";
import userprofile from "../../../public/admin/userprofile.png"
import { formatMultiPrice } from "../../../hooks/ValueData";
import LoadingSpinner from "../hook/spinner";

export default function payment({ record }) {

  const [content, setContent] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const main = new Listing();
    const response = main.Paymentuser(record);
    response
      .then((res) => {
        setLoading(false);
        setContent(res?.data?.data?.user_payment_history);
      })

      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }, []);
  return (

    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full relative top-0 left-0 z-10 min-w-1200px">
          <LoadingSpinner />
        </div>
      ) : (

        <div className=" mt-3">
            <div className="mytable table-responsive w-full">
              {content && content.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr >
                      <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-[#efa3a3]  text-white capitalize ">Invoice </td>
                      <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-[#efa3a3]  text-white capitalize ">Purchase</td>
                      <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-[#efa3a3]  text-white capitalize ">Method</td>
                      <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-[#efa3a3]  text-white capitalize ">Status</td>
                      <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-[#efa3a3]  text-white capitalize ">Amount</td>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {content && content.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm text-gray-500">{item?.payment_id}</td>

                        <td className="px-4 py-4 text-sm text-gray-500">
                          <Link href={`/property/${item?.booking_history?.booking_property?.uuid}`}>

                            <div className="items-center img-data flex gap-2 text-sm  ">
                              <Image
                                width={35}
                                height={35}
                                className="hidden md:block top-2 right-2 p-1 rounded-full user-profile-img"
                                src={item?.booking_history?.booking_property?.property_image[0]?.image_url}
                                alt="Property"
                              />

                              <div>
                                <div className="text-gray-800 text-sm font-normal capitalize ">{item?.booking_history?.booking_property?.name}</div>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 capitalize whitespace-no-wrap  ">{item?.method}</td>
                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 table-cell">
                          <div
                            className={` capitalize  ${item?.payment_status === "success"
                              ? "text-green-600"
                              : item?.payment_status === "cancelled"
                                ? "text-red-600"
                                : item?.payment_status === "confirm"
                                  ? "text-green-600"
                                  : item?.payment_status === "refunded"
                                    ? "text-indigo-600" : "text-blue-600"
                              }`}
                          >
                            {item?.payment_status}
                          </div>
                        </td>
                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 table-cell">
                          {formatMultiPrice(item?.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <Nodata heading={"No Payment History"} />
              )}
              
            </div>
        </div>
      )}
    </>
  );
}