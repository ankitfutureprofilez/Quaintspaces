import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";

export default function Index() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const main = new Listing();
        const response = await main.all_user_payment_history();
        setContent(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout heading={"Payment History"}>
      <div className="">
        <div className="mx-auto mt-8 ">
          <div className="mt-6 overflow-hidden rounded-xl border shadow">
            <table className="min-w-[1200px] w-full border-separate border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b lg:table-header-group">
                <tr className="">
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Invoice</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Order Id</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Method</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Status</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Amount</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Customer</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Purchase</td>
                </tr>
              </thead>
              <tbody className="lg:border-gray-300">
                {content && content.map((item, index) => (
                  <tr className="" key={index}>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{item?.payment_id}</td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{item?.order_id}</td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{item?.method}</td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{item?.payment_status}</td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{item?.price}</td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell ">
                      <div className="flex gap-2 items-center w-1/4 text-sm p-2 ">
                        <Image
                          width={35}
                          height={35}
                          className="top-2 right-2 p-1 rounded-full"
                          src={item?.booking_history?.booking_user[0]?.image_url }
                          alt={item?.booking_history?.booking_user[0]?.index ? item?booking_history?.booking_user[0]?.index : "0"}
                        />
                        <div>
                          <div className="text-gray-800 font-medium">{item?.booking_history?.booking_user[0]?.name}</div>
                          <div className="text-sm">{item?.booking_history?.booking_user[0]?.email}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
