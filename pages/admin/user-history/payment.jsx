import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";
import Nodata from "../hook/NoRecord";
import Spinner from "../hook/spinner";

export default function payment({ record }) {

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const main = new Listing();
    const response = main.user_payment_history(record);
    response
      .then((res) => {
        setLoading(false);
        setContent(res?.data?.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }, []);

  return (
   
      <>
        {loading ? (
          <Spinner />
        ) : content && content.length > 0 ? (
          <div className="mx-auto mt-8 ">
            <div className="mt-6 overflow-hidden rounded-xl border shadow">
              <table className="min-w-[1200px] w-full border-separate border-spacing-y-2 border-spacing-x-2">
                <thead className="hidden border-b lg:table-header-group">
                  <tr className="">
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      {" "}
                      Invoice{" "}
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Order Id{" "}
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      {" "}
                      Method{" "}
                    </td>

                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Status
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Amount
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      customer{" "}
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Purchase
                    </td>
                  </tr>
                </thead>
                <tbody className="lg:border-gray-300">
                  {content &&
                    content.map((item, index) => (
                      <tr className="" key={index}>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          {item?.payment_id}
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          {item?.order_id}
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          {item?.method}
                        </td>

                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          {item?.payment_status}
                        </td>

                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          {item?.price}
                        </td>

                        <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                          {item?.check_in} & {item?.check_out}
                        </td>

                        <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                          {item?.price}
                          <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                            {item?.payment_status}
                          </div>
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
                            {item?.booking_status}
                          </div>
                        </td>

                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell ">
                          <div className="flex items-center gap-x-2">
                            <Image
                              className="object-cover w-8 h-8 rounded-full"
                              src={item?.booking_user?.image_url}
                              alt="User"
                              width={32}
                              height={32}
                            />

                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                {item?.booking_user?.name}
                              </h2>
                              <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                {item?.booking_user?.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          <Image
                            width={40}
                            height={40}
                            className="inline-flex items-center rounded-full "
                            alt="Document"
                            src={item?.front_url}
                          />
                          <div className="inline-flex items-center rounded-full">
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
          <Nodata heading={"Payment Not Found "} />
        )}
      </>
  );
}
