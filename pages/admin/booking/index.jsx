import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";

export default function index() {
  const [content, setContent] = useState("");

  useEffect(() => {
    const main = new Listing();
    const response = main.bookinghist();
    response
      .then((res) => {
        setContent(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <AdminLayout heading={"Booking Management"}>
      <div className="">
        <div className="mx-auto mt-8 ">
          <div className="mt-6 overflow-hidden rounded-xl border shadow">
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
                {content &&
                  content.map((item, index) => (
                    <tr className="" key={index}>
                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                        {item?.booking_date}
                      </td>
                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                        {item?.booking_number}
                      </td>

                      <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                        {item?.check_in} & {item?.check_out} <br/> {item?.adults} adults {item?.children} children  {item?.no_of_pet} pet
                      </td>

                      <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                        {item?.price}
                        <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                          {item?.booking_status}
                        </div>
                      </td>
                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                        <div
                          className={`inline-flex items-center rounded-full py-2 px-3 text-xs text-white ${
                            item?.booking_status === "success"
                              ? "bg-green-600"
                              : item?.booking_status === "cancel"
                              ? "bg-red-600"
                              : "bg-blue-600"
                          }`}
                        >
                          {item?.booking_status}
                        </div>
                      </td>

                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                        <Image
                          width={40}
                          height={40}
                          className="inline-flex items-center rounded-full "
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
      </div>
    </AdminLayout>
  );
}
