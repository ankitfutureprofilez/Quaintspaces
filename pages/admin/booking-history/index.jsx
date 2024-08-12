import React, { useState, useEffect } from "react";
import Image from "next/image";
import Listing from "../api/Listing";
import AdminLayout from "../AdminLayout";
import Nodata from "../hook/NoRecord";
import Spinner from "../hook/spinner";
import toast from "react-hot-toast";
import Modal from "../hook/Modal";
import Link from "next/link";
import { formatMultiPrice } from "../../../hooks/ValueData";
import { IoIosInformationCircleOutline } from "react-icons/io";
import DateComponent from "../../elements/DateFormat";

export default function index() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [message, setMessage] = useState("");
  const [document, setDocument] = useState();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [imageOpen, setimageOpen] = useState(false);
  const [hasmore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const openConfirmModal = (booking) => {
    setSelectedBooking(booking);
    setIsConfirmOpen(true);
  };
  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
    fetchData(page);
    setMessage("");
  };

  const openImageModal = (image) => {
    setDocument(image);
    setimageOpen(true);
  };

  const CloseImageModal = () => {
    setimageOpen(false);
  };
  const handleChange = (e) => {
    setMessage(e?.target?.value);
  };

  function fetchData(pg, signal) {
    setLoading(true);
    setLoadingButton(true);
    const main = new Listing();
    main
      .bookinghistory(activeTab, pg, { signal })
      .then((response) => {
        const newData = response?.data?.data?.data || [];
        setContent((prevData) => {
          if (pg === 1) {
            return newData;
          } else {
            return [...prevData, ...newData];
          }
        });
        setHasMore(response?.data?.current_page < response?.data?.last_page);
        setPage(response?.data?.current_page);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(page, signal);
    return () => {
      controller.abort();
    };
  }, [page, activeTab]);

  const loadMore = () => {
    if (!loading && page) {
      fetchData(page + 1);
    }
  };

  const bookingaccept = (uuid, id, bookingStatus) => {
    setLoading(true);
    const main = new Listing();
    const formdata = new FormData();
    formdata.append("booking_status", bookingStatus);
    formdata.append("message", message);
    main
      .booking_confirm_cancelled(uuid, id, formdata)
      .then((response) => {
        if (response && response.data && response?.data?.status === true) {
          closeConfirmModal();
          closeCancelModal();
          setMessage("");
          setLoading(false);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
          setLoading(false);
          closeConfirmModal();
        }
      })
      .catch((error) => {
        console.error("Error confirming/canceling booking:", error);
        closeConfirmModal();
      });
  };

  return (
    <AdminLayout heading={"Booking Management"}>
      <div className="flex bg-gray-100 mb-5 p-2 overflow-x-auto text-white rounded-lg  md:mb-0 items-center sm:space-y-0 sm:space-x-4 upcoming-box">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`w-full px-3 py-2 text-sm rounded-lg text-center ${
            activeTab === "upcoming" ? "bg-black text-white" : "text-black"
          } me-2 sm:mb-0`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`w-full px-3 py-2 text-sm rounded-lg text-center ${
            activeTab === "completed" ? "bg-black text-white" : "text-black"
          } me-2 sm:mb-0`}
        >
          Complete
        </button>
        <button
          onClick={() => setActiveTab("cancelled")}
          className={`w-full px-3 py-2 text-sm rounded-lg text-center ${
            activeTab === "cancelled" ? "bg-black text-white" : "text-black"
          } me-2 sm:mb-0`}
        >
          Cancelled
        </button>
        <button
          onClick={() => setActiveTab("current")}
          className={`w-full px-3 py-2 text-sm rounded-lg text-center ${
            activeTab === "current" ? "bg-black text-white" : "text-black"
          } me-2 sm:mb-0`}
        >
          Current
        </button>
        <button
          onClick={() => setActiveTab("failed")}
          className={`w-full  px-2 py-2 text-sm rounded-lg text-center ${
            activeTab === "failed" ? "bg-black text-white" : "text-black"
          } sm:mb-0`}
        >
          Failed
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          {content?.length > 0 ? (
            <div className="mytable table-responsive mt-5">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-2 capitalize text-sm font-normal  bg-indigo-600 text-left rtl:text-right text-white">
                      S.No.
                    </th>
                    <th className="px-2 py-2 capitalize text-sm font-normal bg-indigo-600 text-left rtl:text-right text-white">
                      Date
                    </th>
                    <th className="px-2 py-2 capitalize text-sm font-normal bg-indigo-600 text-left rtl:text-right text-white">
                      Booking Number
                    </th>
                    <th className="px-2 py-2 capitalize text-sm font-normal bg-indigo-600 text-left rtl:text-right text-white">
                      Check in / check Out
                    </th>
                    <th className="px-2 py-2 capitalize text-sm font-normal  bg-indigo-600 text-left rtl:text-right text-white">
                      Property Name
                    </th>
                    <th className="px-2 py-4 capitalize text-sm font-normal  bg-indigo-600 text-left rtl:text-right text-white">
                      Amount
                    </th>
                    <th className="px-2 py-2 capitalize text-sm font-normal  bg-indigo-600 text-left rtl:text-right text-white">
                      Document
                    </th>
                    <th className="px-2 py-2 capitalize text-sm font-normal  bg-indigo-600 text-left rtl:text-right text-white">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {content.map((item, index) => (
                    <tr key={index}>
                      <td className="px-2 py-2 text-sm text-gray-500  overflow-hidden text-ellipsis">
                        {index + 1}
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500 whitespace-nowrap capitalize  overflow-hidden text-ellipsis">
                        <DateComponent item={item?.booking_date} />
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500  overflow-hidden text-ellipsis">
                        {item?.booking_number}
                      </td>

                      <td className="px-2 py-2 text-sm text-gray-500 whitespace-nowrap  overflow-hidden text-ellipsis">
                        From : {item?.check_in}
                        <div>To: {item?.check_out}</div>
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500 ">
                        <Link
                          href={`/property/${item?.booking_history?.booking_property?.uuid}`}
                        >
                          <span className=" capitalize  text-sm overflow-hidden text-ellipsis">
                            {item?.booking_property?.name}
                          </span>
                        </Link>
                      </td>

                      <td className="px-2 py-2 text-sm text-gray-500  overflow-hidden text-ellipsis">
                        {formatMultiPrice(item?.price)}
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500  overflow-hidden text-ellipsis">
                        <div
                          style={{ cursor: "pointer" }}
                          className="flex items-center "
                          onClick={() => openImageModal(item?.front_url)}
                        >
                          <div className="uppercase inline-flex items-center rounded-full ml-2">
                            {item?.doc_type}
                            <span className="text-base ml-1">
                              <IoIosInformationCircleOutline size={12} />
                            </span>
                          </div>
                        </div>
                      </td>
                      {item?.booking_status === "pending" ? (
                        <td className="px-2 py-2 text-sm text-gray-500  overflow-hidden text-ellipsis">
                          <div
                            onClick={() =>
                              bookingaccept(
                                item.booking_user[0]?.id,
                                item.id,
                                "confirm"
                              )
                            }
                            className="capitalize  cursor-pointer text-green-500 flex items-center gap-2 border w-max rounded-full p-1 px-2 mb-2"
                          >
                            {/* <svg
                              className="text-emerald-500"
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z"
                                fill="currentColor"
                              ></path>
                            </svg> */}
                            {loading ? "loading.." : "confirm"}
                          </div>

                          <div
                            onClick={() => openConfirmModal(item)}
                            className="capitalize cursor-pointer text-red-500 flex items-center w-fit gap-2 border rounded-full p-1 px-2"
                          >
                            {/* <svg
                              className="text-red-400"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="m19.53 5.53-14 14c-.02.02-.03.03-.05.04-.38-.32-.73-.67-1.05-1.05A9.903 9.903 0 0 1 2 12C2 6.48 6.48 2 12 2c2.49 0 4.77.91 6.52 2.43.38.32.73.67 1.05 1.05-.01.02-.02.03-.04.05ZM22 12c0 5.49-4.51 10-10 10-1.5 0-2.92-.33-4.2-.93-.62-.29-.74-1.12-.26-1.61L19.46 7.54c.48-.48 1.32-.36 1.61.26.6 1.27.93 2.7.93 4.2Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M21.77 2.229c-.3-.3-.79-.3-1.09 0L2.23 20.689c-.3.3-.3.79 0 1.09a.758.758 0 0 0 1.08-.01l18.46-18.46c.31-.3.31-.78 0-1.08Z"
                                fill="currentColor"
                              ></path>
                            </svg> */}
                            {loading ? "loading.." : "Cancel"}
                          </div>
                        </td>
                      ) : (
                        <td className="px-2 py-2 text-sm text-gray-500  overflow-hidden text-ellipsis">
                          <div
                            className={`capitalize inline-flex items-center rounded-full py-1 w-max px-2 text-sm text-white  ${
                              item?.booking_status === "completed"
                                ? "bg-green-700"
                                : item?.booking_status === "cancelled"
                                ? "bg-red-600"
                                : item?.booking_status === "confirmed"
                                ? "bg-green-500"
                                : item?.booking_status === "pending"
                                ? "bg-slate-600"
                                : item?.booking_status === "failed"
                                ? "bg-red-600"
                                : "bg-indigo-600"
                            }`}
                          >
                            {item?.booking_status}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && (
              <div className="mt-5 ">
                <Nodata heading={"No Booking"} />
              </div>
            )
          )}

          {content?.length > 0 && !loading && hasmore && (
            <div className="flex justify-center">
              <div
                className="font-inter font-lg leading-tight text-center text-black-400 w-full sm:w-96 bg-indigo-500 border-0 !p-4 rounded-full mt-10 mb-12 text-white cursor-pointer hover:bg-[#000]  filter btn"
                onClick={loadMore}
              >
                {loadingButton ? "Loading..." : "Load More"}
              </div>
            </div>
          )}
        </>
      )}

      {selectedBooking && (
        <Modal isOpen={isConfirmOpen} onClose={closeConfirmModal}>
          <div className="flex flex-col">
            <div className="p-4 bg-[#efa3a3]">
              <label
                htmlFor="message"
                className="mx-auto block text-lg font-medium text-[#fff]"
              >
                Message
              </label>
            </div>
            <div className="p-4">
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={handleChange}
                className=" p-3 lg:p-4 border rounded-3xl min-h-32 lg:min-h-52 w-full"
                required
                placeholder="Please enter your reason for cancellation"
                rows={2}
              />
              <div className="flex justify-center">
                <button
                  className="btn filter mt-6 mb-4 w-2/4 mx-auto"
                  onClick={() =>
                    bookingaccept(
                      selectedBooking.booking_user[0].id,
                      selectedBooking.id,
                      "cancelled"
                    )
                  }
                >
                  {loading ? "Proceeding..." : "Proceed"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
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
              <Image
                blurDataURL={`${document}?q=1`}
                placeholder="blur"
                src={document}
                alt="Document Image"
                layout="responsive"
                width={100}
                height={75}
                loading="lazy"
              />
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
