import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Nodata from "../hook/NoRecord";
import { formatMultiPrice } from "../../../hooks/ValueData";
import { IoIosInformationCircleOutline } from "react-icons/io";

import Modal from "../hook/Modal";
import DateComponent from "../../elements/DateFormat";
import SingleDate from "../../elements/SingleDate";

export default function Booking(props) {
  const { record } = props;

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageOpen, setimageOpen] = useState(false);

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
        setLoading(false);
        console.log("error", error);
      });
  }, [record]);

  const [document, setDocument] = useState();

  const openImageModal = (image) => {
    setDocument(image);
    setimageOpen(true);
  };

  const CloseImageModal = () => {
    setimageOpen(false);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full relative top-0 left-0 z-10 ">
          <div className="flex justify-center items-center space-x-1 text-gray-700">
            <div className="text-lg">Loading...</div>
          </div>
        </div>
      ) : content && content.length > 0 ? (
        <div className="mt-5 ">
          <div className=" mytable table-responsive w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="">
                  <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white">
                    {" "}
                    booking Date & Number
                  </td>
                  {/* <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white">
                    booking Number{" "}
                  </td> */}
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
                    Document
                  </td>
                </tr>
              </thead>
              <tbody className="lg:border-gray-300">
                {content &&
                  content.map((item, index) => (
                    <tr className="" key={index}>
                      <td className="px-4 py-4 text-sm text-gray-500 capitalize  overflow-hidden text-ellipsis">
                        <div className="flex flex-col">
                          <span className="whitespace-nowrap capitalize  text-sm overflow-hidden text-ellipsis">                         {item?.booking_date}
                          </span>
                          <span className="whitespace-nowrap capitalize  text-sm overflow-hidden text-ellipsis">                        {item?.booking_number}
                          </span>
                        </div>
                      </td>
                      <td className=" py-4  px-4 text-sm  text-gray-900 sm:px-6 ">
                          Form:  <SingleDate item={item?.check_in} />
                          To: <SingleDate item={item?.check_out} />
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500   overflow-hidden text-ellipsis">
                        {formatMultiPrice(
                          item?.price
                        )}
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500  overflow-hidden text-ellipsis">
                        <div
                          className={`capitalize inline-flex items-center rounded-full py-2 w-max px-2 text-[15px]   ${item?.booking_status === "completed"
                            ? "text-green-700"
                            : item?.booking_status === "cancelled"
                              ? "text-red-600"
                              : item?.booking_status === "confirmed"
                                ? "text-green-500"
                                : item?.booking_status === "pending"
                                  ? "text-indigo-600"
                                  : item?.booking_status === "failed" ? "text-red-600" : "text-indigo-600"
                            }`}
                        >
                          {item?.booking_status}
                        </div>
                      </td>
                      <td className="img-data px-4 py-4 text-sm text-gray-500">
                        <div
                          style={{ cursor: "pointer" }}
                          className="flex items-center "
                          onClick={() => openImageModal(item?.front_url)}
                        >
                          <div className=" inline-flex items-center uppercase rounded-full ml-2">
                            {item?.doc_type}
                            <span className="text-base ml-1">
                              <IoIosInformationCircleOutline size={12} />
                            </span>
                          </div>
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
      {imageOpen && (
        <Modal isOpen={openImageModal} onClose={CloseImageModal}>
          <div className="flex flex-col">
            <div className="p-4 bg-[#efa3a3]">
              <label
                htmlFor="message"
                className="mx-auto block text-lg font-medium text-[#fff]"
              >
                Document Image
              </label>
            </div>
            <div className="p-4">
              <img
                src={document}
                alt="Document Image"
              />

            </div>
          </div>
        </Modal>
      )}

    </>
  );
}