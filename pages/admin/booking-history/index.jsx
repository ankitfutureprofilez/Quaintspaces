import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";
import Nodata from "../hook/NoRecord";
import Spinner from "../hook/spinner";
import toast from "react-hot-toast";
import Modal from "../hook/Modal";
import Link from "next/link";
import { formatMultiPrice } from "../../../hooks/ValueData"
import { IoIosInformationCircleOutline } from "react-icons/io";


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
  const [page, setPage] = useState(0);
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



  function fetchData(pg) {
    if (pg == 1) { setLoading(true); }
    setLoadingButton(true);
    const main = new Listing();
    const response = main.bookinghistory(activeTab, pg);
    response
      .then((res) => {
        const newdata = res?.data?.data?.data || [];
        setContent((prevData) => {
          if (pg === 1) {
            return newdata;
          } else {
            return [...prevData, ...newdata];
          }
        });
        setHasMore(res?.data?.current_page < res?.data?.last_page);
        setPage(res?.data?.current_page);
        setLoading(false);
        setLoadingButton(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        setLoadingButton(false);
      });
  }

  // useEffect(() => {
  //   if (content && content?.length < 1) {
  //     fetchData(page + 1);
  //   }
  // }, []);

  useEffect(() => {
    fetchData(1);
  }, [activeTab]);


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
      <div className="flex flex-wrap bg-gray-100 mt-3 mb-2 text-white rounded-lg p-2 md:mb-0 items-center space-y-2 sm:space-y-0 sm:space-x-4 upcoming-box">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`w-full sm:flex-1 px-4 py-2 rounded-lg text-center ${activeTab === 'upcoming' ? 'bg-amber-700 text-white' : 'text-black'} mb-2 sm:mb-0`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`w-full sm:flex-1 px-4 py-2 rounded-lg text-center ${activeTab === 'completed' ? 'bg-green-600 text-white' : 'text-black'} mb-2 sm:mb-0`}
        >
          Complete
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`w-full sm:flex-1 px-4 py-2 rounded-lg text-center ${activeTab === 'cancelled' ? 'bg-red-600 text-white' : 'text-black'} mb-2 sm:mb-0`}
        >
          Cancelled
        </button>
        <button
          onClick={() => setActiveTab('current')}
          className={`w-full sm:flex-1 px-4 py-2 rounded-lg text-center ${activeTab === 'current' ? 'bg-black text-white' : 'text-black'} mb-2 sm:mb-0`}
        >
          Current
        </button>
        <button
          onClick={() => setActiveTab('failed')}
          className={`w-full sm:flex-1 px-2 py-2 rounded-lg text-center ${activeTab === 'failed' ? 'bg-red-700 text-white' : 'text-black'} mb-2 sm:mb-0`}
        >
          Failed
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : content && content.length > 0 ? (
        <>
          <div className="w-full p-2">
            <div className="overflow-x-auto border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-4 capitalize text-sm font-normal whitespace-nowrap bg-indigo-600 text-left rtl:text-right text-white">
                      S.No.
                    </th>
                    <th className="px-4 py-4 capitalize text-sm font-normal bg-indigo-600 text-left rtl:text-right text-white">
                      Booking Date & Number
                    </th>
                    <th className="px-4 py-4 capitalize text-sm font-normal bg-indigo-600 text-left rtl:text-right text-white">
                      Check in & check  Out
                    </th>
                    <th className="px-4 py-4 capitalize text-sm font-normal whitespace-nowrap bg-indigo-600 text-left rtl:text-right text-white">
                      Stay
                    </th>
                    <th className="px-2 py-4 capitalize text-sm font-normal whitespace-nowrap bg-indigo-600 text-left rtl:text-right text-white">
                      Amount
                    </th>
                    <th className="px-4 py-4 capitalize text-sm font-normal  bg-indigo-600 text-left rtl:text-right text-white">
                      Document & its Type
                    </th>
                    <th className="px-4 py-4 capitalize text-sm font-normal whitespace-nowrap bg-indigo-600 text-left rtl:text-right text-white">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {content.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span className="whitespace-nowrap capitalize  text-sm overflow-hidden text-ellipsis">                         {item?.booking_date}
                          </span>
                          <span className="whitespace-nowrap capitalize  text-sm overflow-hidden text-ellipsis">                        {item?.booking_number}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                        From : {item?.check_in}
                        <div className="">
                          To:  {item?.check_out}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 ">
                        <Link href={`/property/${item?.booking_history?.booking_property?.uuid}`}>
                          <div className="flex flex-row items-center gap-2 sm:flex-row sm:items-center text-sm">
                            <div className="p-2">
                              <div className="text-gray-800 font-medium capitalize">
                                {item?.booking_property?.name}

                                {/* <span className="whitespace-nowrap  overflow-hidden text-ellipsis">
                                  {item?.booking_property?.guests} guests
                                </span> */}

                              </div>
                            </div>
                          </div>

                          <span className="whitespace-nowrap capitalize  text-sm overflow-hidden text-ellipsis">                         {item?.booking_date}
                          </span>
                        </Link>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                        {formatMultiPrice(item?.price)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                        <div
                          style={{ cursor: "pointer" }}
                          className="flex items-center "
                          onClick={() => openImageModal(item?.front_url)}
                        >
                          <div className="uppercase inline-flex items-center rounded-full ml-2">
                            {item?.doc_type}
                            <span className="text-base ml-1">
                            <IoIosInformationCircleOutline size={16} />
                            </span>
                          </div>
                        </div>
                      </td>
                      {item?.booking_status === "pending" ?
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
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
                            <svg
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
                            </svg>
                            {loading ? "loading.." : "confirm"}
                          </div>

                          <div
                            onClick={() => openConfirmModal(item)}
                            className="capitalize cursor-pointer text-red-500 flex items-center w-fit gap-2 border rounded-full p-1 px-2"
                          >
                            <svg
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
                            </svg>
                            {loading ? "loading.." : "Cancel"}
                          </div>
                        </td>
                        :
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                          <div
                            className={`capitalize inline-flex items-center rounded-full py-2 w-max px-2 text-sm text-white  ${item?.booking_status === "completed"
                              ? "bg-green-700"
                              : item?.booking_status === "cancelled"
                                ? "bg-red-600"
                                : item?.booking_status === "confirmed"
                                  ? "bg-green-500"
                                  : item?.booking_status === "pending"
                                    ? "bg-slate-600"
                                    : "bg-blue-600"
                              }`}
                          >
                            {item?.booking_status}
                          </div>
                        </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* {content?.length > 0 && !loading && hasmore && (
            <div className="flex justify-center">
              <div
                className="font-inter font-lg leading-tight text-center text-black-400 w-full sm:w-96 bg-indigo-500 border-0 !p-4 rounded-full mt-10 mb-12 text-white cursor-pointer hover:bg-[#000]  filter btn"
                onClick={loadMore}
              >
                {loadingButton ? "Loading..." : "Load More"}
              </div>
            </div>
          )} */}
        </>
      ) : (
        <div className="mt-5 ">
          <Nodata heading={"No Booking"} />
        </div>
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
              <img
                src={document}
                alt="Document Image"
              />

            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
