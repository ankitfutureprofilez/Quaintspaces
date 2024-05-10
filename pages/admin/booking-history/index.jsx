import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";
import Dateformat from "../hook/Dateformat";
import Nodata from "../hook/NoRecord";
import Spinner from "../hook/spinner";
import toast from "react-hot-toast";
import Modal from "../hook/Modal";
import Link from "next/link";
import userProfile from "../../../public/admin/userprofile.png";
import{ formatMultiPrice }  from "../../../hooks/ValueData"

export default function index() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const[document,setDocument]=useState();
  const [selectedBooking, setSelectedBooking] = useState(null);
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
    setLoading(true);
    const main = new Listing();
    const response = main.bookinghistory(pg);
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
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (content && content?.length < 1) {
      fetchData(page + 1);
    }
  }, []);

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
      {loading ? (
        <Spinner />
      ) : content && content.length > 0 ? (
        <div className="overflow-x-auto mt-3">
        <div className="w-full">
          <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg mt-2">
            <table className="min-w-[1200px] w-full divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-4 capitalize text-sm font-normal whitespace-nowrap bg-indigo-600 text-left rtl:text-right text-white dark:text-gray-400">
                    S.No.
                  </th>
                  <th className="px-4 py-4 capitalize text-sm font-normal whitespace-nowrap bg-indigo-600 text-left rtl:text-right text-white dark:text-gray-400">
                    Booking Date
                  </th>
                  <th className="px-4 py-4 capitalize text-sm font-normal whitespace-nowrap bg-indigo-600 text-left rtl:text-right text-white dark:text-gray-400">
                    Booking Number
                  </th>
                  <th className="px-4 py-4 capitalize text-sm font-normal whitespace-nowrap bg-indigo-600 text-left rtl:text-right text-white dark:text-gray-400">
                    Stay
                  </th>
                  <th className="px-2 py-4 capitalize text-sm font-normal whitespace-nowrap bg-indigo-600 text-left rtl:text-right text-white dark:text-gray-400">
                    Amount
                  </th>
                  <th className="px-4 py-4 capitalize text-sm font-normal whitespace-nowrap bg-indigo-600 text-left rtl:text-right text-white dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-4 py-4 capitalize text-sm font-normal whitespace-nowrap bg-indigo-600 text-left rtl:text-right text-white dark:text-gray-400">
                    Document & its Type
                  </th>
                  <th className="px-4 py-4 capitalize text-sm font-normal whitespace-nowrap bg-indigo-600 text-left rtl:text-right text-white dark:text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
      
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {content.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {item?.booking_date}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {item?.booking_number}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    <Link
                href={`/property/${item?.booking_property?.uuid}`}
              >
                <div className="items-center flex gap-2 text-sm p-2 ">
                  <Image
                    width={35}
                    height={35}
                    className="top-2 right-2 p-1 rounded-full user-profile-img"
                    src={
                      item?.booking_property?.property_image[0]
                        ?.image_url
                    }
                    alt={
                      item?.booking_property?.property_image[0]
                        ?.properties_id
                    }
                  />
                  <div>
                    <div className="text-gray-800 font-medium capitalize">
                      {item?.booking_property?.name
                        .split(" ")
                        .slice(0, 7)
                        .join(" ")}
                      {item?.booking_property?.name.split(" ")
                        .length > 7
                        ? "..."
                        : ""}
                    </div>
                    <div className="text-sm">
                      {item?.booking_property?.adults} adults ||{" "}
                      {item?.booking_property?.children} children ||{" "}
                      {item?.booking_property?.no_of_pet_allowed} pet{" "}
                    </div>
                  </div>
                </div>
              </Link>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {formatMultiPrice(item?.price)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    <td
                className={`capitalize inline-flex items-center rounded-full py-3 w-max px-4 text-xs text-white  ${
                  item?.booking_status === "completed"
                    ? "bg-green-700"
                    : item?.booking_status === "cancelled"
                    ? "bg-red-600"
                    : item?.booking_status === "confirm"
                    ? "bg-green-600"
                    : item?.booking_status === "pending"
                    ? "bg-slate-600"
                    : "bg-blue-600"
                }`}
              >
                {item?.booking_status}
              </td>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                    <div
              style={{cursor:"pointer"}}
                className="flex items-center "
                onClick={() => openImageModal(item?.front_url)}
              >
                <div className="capitalize inline-flex items-center rounded-full ml-2">
                  {item?.doc_type}
                <span className="text-base ml-1">🛈</span>
                </div>
              </div>
                    </td>
                    {item?.booking_status === "pending"?
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                    <div
                onClick={() =>
                  bookingaccept(
                    item.booking_user[0]?.id,
                    item.id,
                    "confirm"
                  )
                }
                className="capitalize  cursor-pointer text-green-500 flex items-center gap-2 border w-max rounded-full p-1 px-4 mb-2"
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
                className="capitalize cursor-pointer text-red-500 flex items-center w-fit gap-2 border rounded-full p-1 px-4"
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
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                      Already Taken
                    </td>
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
        {!loading && hasmore && (
          <div className="flex justify-center">
            <div
              className="font-inter font-lg leading-tight bg-indigo-600 text-center text-black-400 w-full sm:w-96 bg-indigo-500 border-0 p-4 rounded-full mt-10 mb-12 text-white"
              onClick={loadMore}
            >
              Load More
            </div>
          </div>
        )}
        {!loading && !hasmore && (
          <div className="flex justify-center">
            <div className="font-inter font-lg leading-tight bg-indigo-600 text-center text-black-400 w-full sm:w-96 bg-indigo-500 border-0 p-4 rounded-full mt-10 mb-12 text-white">
              No More Data
            </div>
          </div>
        )}
      </div>
      
      ) : (
        <Nodata heading={"No Booking"} />
      )}

      {selectedBooking && (
        <Modal isOpen={isConfirmOpen} onClose={closeConfirmModal}>
          <div className="my-3 lg:my-6 flex flex-col">
            <label
              htmlFor="message"
              className="mx-auto mb-8 block text-lg font-medium text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={handleChange}
              className="mt-3 p-3 lg:p-4 border rounded-3xl min-h-32 lg:min-h-52 w-full"
              required
              placeholder="Please enter your reason for cancellation"
              rows={2}
            />
            <button
              className="btn filter mt-8 w-2/4 mx-auto"
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
        </Modal>
      )}

      {imageOpen && (
        <Modal isOpen={openImageModal} onClose={CloseImageModal}>
          <div className="my-4 mx-4 lg:my-6 flex flex-col">
            <img
              src={document}
              alt="Document Image"
            />
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
