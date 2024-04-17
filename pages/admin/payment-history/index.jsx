import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";
import Spinner from "../hook/spinner";
import Nodata from "../hook/NoRecord";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const main = new Listing();
        const response = await main.all_user_payment_history();
        setContent(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout heading={"Payment History"}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <div className="inline-block w-full">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              {content && content.length > 0 ? (
                <table className="min-w-full table-auto break-all divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Payment Id</th>
                      <th className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Customer</th>
                      <th className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Purchase</th>
                      <th className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Method</th>
                      <th className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                      <th className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {content.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">{item?.payment_id}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          <div className="flex gap-2 items-center text-sm p-2">
                            <Image width={35} height={35} className="rounded-full" src={item?.booking_history?.booking_user[0]?.image_url} alt="User Image" />
                            <div>
                              <div className="text-gray-800 font-medium">{item?.booking_history?.booking_user[0]?.name}</div>
                              <div className="text-sm">{item?.booking_history?.booking_user[0]?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          <div className="flex gap-2 items-center text-sm p-2">
                            <Image width={35} height={35} className="rounded-full user-profile-img" src={item?.booking_history?.booking_property?.property_image[0]?.image_url} alt="Property" />
                            <div>
                              <div className="text-gray-800 font-medium">{item?.booking_history?.booking_property?.name}</div>
                              <div className="text-sm">{item?.booking_history?.booking_property?.properties_type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">{item?.method}</td>
                        <td className="px-4 py-4 text-sm font-normal">
                          <span className={`inline-flex items-center rounded-full py-2 px-3 text-xs text-white ${
                            item?.payment_status === "success" ? "bg-green-600" : item?.payment_status === "cancelled" ? "bg-red-600" : item?.payment_status === "confirm" ? "bg-green-600" : "bg-blue-600"
                          }`}>
                            {item?.payment_status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">{item?.price}</td>
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
    </AdminLayout>
  );
}
