import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";
import Spinner from "../hook/spinner";
import Nodata from "../hook/NoRecord";
import userprofile from "../../../public/admin/userprofile.png";
import Link from "next/link";
import { formatMultiPrice } from "../../../hooks/ValueData";
export default function Index() {
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasMore] = useState(true);
  async function fetchData(pg, signal) {
    if (pg === 1) {
      setLoading(true);
    }
    setLoadingButton(true);
  
    try {
      const main = new Listing();
      const response = await main.all_user_payment_history(pg, { signal });
      const newData = response?.data?.data?.data || [];
  
      setContent((prevData) => {
        if (pg === 1) {
          return newData;
        } else {
          return [...prevData, ...newData];
        }
      });
  
      setHasMore(response?.data?.current_page < response?.data?.last_page);
      setPage(pg);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('Error fetching data:', error);
      }
    } finally {
      setLoadingButton(false);
      setLoading(false);
    }
  }
  

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (content.length < 1) {
      fetchData(page, signal);
    }

    return () => {
      controller.abort(); // Abort fetch on component unmount or page change
    };
  }, [page, content]);

  const loadMore = () => {
    if (!loading) {
      fetchData(page + 1);
    }
  };
  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <AdminLayout heading={"Payment History"}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mytable table-responsive mt-5">
            {content && content.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                      S. No.
                    </th>
                    <th className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                      Payment Id & Method
                    </th>
                    <th className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                      Customer
                    </th>
                    <th className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                      Property Name
                    </th>
                    {/* <th className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                      Method
                    </th> */}
                    <th className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                      Status
                    </th>
                    <th className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {content.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">{index + 1}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span className="whitespace-nowrap capitalize  text-sm overflow-hidden text-ellipsis"> {item?.payment_id}</span>
                          <span className="whitespace-nowrap capitalize  text-sm overflow-hidden text-ellipsis">{item?.method}</span>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                        <Link href={`/admin/user-history/${item?.booking_history?.booking_user[0]?.id}`}>
                          <div className="flex flex-row items-center gap-2 sm:flex-row sm:items-start text-sm">
                            <Image
                              width={50}
                              height={50}
                              className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                              src={item?.booking_history?.booking_user[0]?.image_url ? item?.booking_history?.booking_user[0]?.image_url : userprofile}
                              alt="User Image"
                            />
                            <div className="p-2">
                              <div className="text-gray-800 font-medium capitalize text-center">
                                {item?.booking_history?.booking_user[0]?.name}
                              </div>
                            </div>
                          </div>
                        </Link>

                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <Link href={`/property/${item?.booking_history?.booking_property?.uuid}`}>
                          <div className="flex flex-row items-center gap-2 sm:flex-row sm:items-start text-sm">

                            <Image
                              width={50}
                              height={50}
                              className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                              src={item?.booking_history?.booking_property?.property_image[0]?.image_url}
                              alt="Property"
                            />
                            <div className="p-2">
                              <div className="text-gray-800 font-medium capitalize">{item?.booking_history?.booking_property?.name}</div>
                            </div>
                          </div>
                        </Link>
                      </td>
                      {/* <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap capitalize"></td> */}
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                        <span
                          className={`inline-flex w-max items-center rounded-full py-2 px-3 text-[17px]  ${item?.payment_status === "success"
                            ? "text-green-600"
                            : item?.payment_status === "cancelled"
                              ? "text-red-600"
                              : item?.payment_status === "confirm"
                                ? "text-green-600"
                                : "text-blue-600"
                            }`}
                        >
                          {item?.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                        <span
                          className={`${item?.payment_status === "success" || item?.payment_status === "confirm"
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                        >
                          {item?.payment_status === "success" || item?.payment_status === "confirm"
                            ? ` + ${formatMultiPrice(item?.price)}`
                            : ` - ${formatMultiPrice(item?.price)}`}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Nodata heading={"No Payment History"} />
            )}
          </div>
      )}
      {content?.length > 0 && !loading && hasmore && (
        <div className="flex justify-center mb-5">
          <div
            className="cursor-pointer mt-4 py-2 px-5  rounded-full text-[#efa3a3] hover:bg-[#efa3a3] hover:text-[#fff] border-2 bg-color-[#efa3a3] border-[#efa3a3] "
            onClick={loadMore}
          >
            {loadingButton ? "Loading..." : "Load More"}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
