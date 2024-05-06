import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";
import Spinner from "../hook/spinner";
import Nodata from "../hook/NoRecord";
import userprofile from "../../../public/admin/userprofile.png";
import Link from "next/link"

export default function Index() {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasMore] = useState(true);


  const fetchData = async (pg) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.all_user_payment_history(pg);
      const newdata = response?.data?.data?.data || [];
      setContent((prevData) => {
        if (pg === 1) {
          return newdata;
        } else {
          return [...prevData, ...newdata];
        }
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const loadMore = () => {
    if (!loading) {
      fetchData(page + 1);
    }
  };

  return (
    <AdminLayout heading={"Payment History"}>
      {loading ? (
        <Spinner />
      ) : (

        <div className="overflow-x-auto mt-3">
          <div className="w-full">
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
              {content && content.length > 0 ? (

                <table className="min-w-[1200px] w-full break-all divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr >
                      <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-black text-white dark:text-gray-400 capitalize ">S. No. </td>

                      <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-black text-white dark:text-gray-400 capitalize ">Payment Id </td>
                      <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-black text-white dark:text-gray-400 capitalize ">Customer</td>
                      <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-black text-white dark:text-gray-400 capitalize ">Purchase</td>
                      <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-black text-white dark:text-gray-400 capitalize ">Method</td>
                      <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-black text-white dark:text-gray-400 capitalize ">Status</td>
                      <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-black text-white dark:text-gray-400 capitalize ">Amount</td>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {content && content.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">{index + 1}</td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">{item?.payment_id}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                          <Link href={`/admin/user-history/${item?.booking_history?.booking_user[0]?.id}`}>

                            <div className="flex gap-2 items-center  text-sm p-2 ">
                              <Image
                                width={35}
                                height={35}
                                className="top-2 right-2 p-1 rounded-full"
                                src={item?.booking_history?.booking_user[0]?.image_url || userprofile}
                                alt="User Image"
                              />
                              <div>
                                <div className="text-gray-800 font-medium">{item?.booking_history?.booking_user[0]?.name}</div>
                                <div className="text-sm">{item?.booking_history?.booking_user[0]?.email}</div>
                              </div>
                            </div>
                          </Link>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                          <Link href={`/property/${item?.booking_history?.booking_property?.uuid}`}>

                            <div className="items-center flex gap-2 text-sm p-2 ">
                              <Image
                                width={35}
                                height={35}
                                className="top-2 right-2 p-1 rounded-full user-profile-img"
                                src={item?.booking_history?.booking_property?.property_image[0]?.image_url}
                                alt="Property"
                              />
                              <div>
                                <div className="text-gray-800 font-medium capitalize ">{item?.booking_history?.booking_property?.name}</div>
                                <div className="text-sm capitalize">{item?.booking_history?.booking_property?.properties_type}</div>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 capitalize  ">{item?.method}</td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">

                          <td
                            className={` capitalize inline-flex items-center rounded-full py-2 px-3 text-xs text-white ${item?.payment_status === "success"
                              ? "bg-green-600"
                              : item?.payment_status === "cancelled"
                                ? "bg-red-600"
                                : item?.payment_status === "confirm"
                                  ? "bg-green-600"
                                  : "bg-blue-600"
                              }`}
                          >
                            {item?.payment_status}
                          </td>


                        </td>

                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{item?.price}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (

                <Nodata heading={"No Payment History"} />
              )}



            </div>
          </div>
        </div>
      )}
      {!loading && (
        <div className="flex justify-center">
          <div
            className="font-inter font-lg leading-tight bg-indigo-600 text-center text-black-400 w-full sm:w-96 bg-indigo-500 border-0 p-4 rounded-full mt-10 mb-12 text-white"
            onClick={loadMore}
          >
            Load More
          </div>
        </div>
      )}
      {!loading && !hasmore && record.length === 0 && (

        <div className="flex justify-center">
          <div
            className="font-inter font-lg leading-tight bg-indigo-600 text-center text-black-400 w-full sm:w-96 bg-indigo-500 border-0 p-4 rounded-full mt-10 mb-12 text-white"
          >
            No More Data
          </div>
        </div>
      )}
    </AdminLayout>
  );
}