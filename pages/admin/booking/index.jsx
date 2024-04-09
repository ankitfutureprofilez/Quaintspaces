import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";
import Dateformat from "../hook/Dateformat";
import Nodata from "../hook/NoRecord";
import Spinner from "../hook/spinner";

export default function index() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const main = new Listing();
    const response = main.bookinghist();
    response
      .then((res) => {
        setContent(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);

  return (
    <AdminLayout heading={"Booking Management"}>
      <div className="">
        <div className="mx-auto mt-8 ">
          <div className="mt-6 overflow-hidden rounded-xl border shadow">
            {loading ? (
              <Spinner />
            ) : (
              <table className="min-w-[1200px] w-full border-separate border-spacing-y-2 border-spacing-x-2">
                <thead className="hidden border-b lg:table-header-group">
                  <tr className="">
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      {" "}
                      booking Date
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      booking Number{" "}
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Stay{" "}
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Amount
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Status
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Document Image and Type{" "}
                    </td>
                  </tr>
                </thead>

                <tbody className="lg:border-gray-300">
                  {content && content.length > 0 ? (
                    content.map((item, index) => (
                      <tr key={index}>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          <Dateformat item={item?.booking_date} />
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          {item?.booking_number}
                        </td>

                        <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                          {item?.check_in} & {item?.check_out} <br />{" "}
                          {item?.adults} adults {item?.children} children{" "}
                          {item?.no_of_pet} pet
                        </td>
                        <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                          {item?.price}
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          {item?.booking_status}
                          {/*                      
                      <div
                      className={`inline-flex items-center rounded-full py-2 px-3 text-xs text-white ${
                      item?.booking_status === "success"
                      ? "bg-green-600"
                      : item?.booking_status === "canceled"
                      ? "bg-red-600"
                      : "bg-blue-600"
                      }`}
                      >
                      {item?.booking_status}
                      </div> */}
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          <Image
                            width={50}
                            height={50}
                            className="inline-flex items-center rounded-full "
                            src={item?.front_url}
                          />
                          <div className="inline-flex items-center rounded-full">
                            {item?.doc_type}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                      <Nodata heading={"No Booking "} />
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
