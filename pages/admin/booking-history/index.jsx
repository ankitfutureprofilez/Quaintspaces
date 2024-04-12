import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";
import Dateformat from "../hook/Dateformat";
import Nodata from "../hook/NoRecord";
import Spinner from "../hook/spinner";
import toast from "react-hot-toast";

export default function index() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const main = new Listing();
    const response = main.bookinghistory();
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

  const bookingaccept = (uuid, id, bookingStatus) => {
    setLoading(true);
    const main = new Listing();
    const formdata = new FormData();
    formdata.append("booking_status", bookingStatus);
    formdata.append("message", "hello");

    main.booking_confirm_cancelled(uuid, id, formdata)
      .then((response) => {
        console.log("response", response);
        if (response && response.data && response?.data?.status === true) {
          toast.success(response.data.message);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error confirming/canceling booking:", error);
      });
  };

  return (
    <AdminLayout heading={"Booking Management"}>
          {loading ? (
            <Spinner />
          ) : content && content.length > 0 ? (
            <div className="overflow-x-auto">
            <div className="inline-block align-middle">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
            <table className="min-w-[1200px] w-full table-auto break-all divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr className="">
                  <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    {" "}
                    booking Date
                  </td>
                  <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    booking Number{" "}
                  </td>
                  <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Stay{" "}
                  </td>
                  <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Amount
                  </td>
                  <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Status
                  </td>
                  <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Document Image and Type{" "}
                  </td>
                  <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Action
                  </td>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {content.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                      <Dateformat item={item?.booking_date} />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {item?.booking_number}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
  <div className ="flex flex-wrap justify-center-between" >
    <Dateformat item={item?.check_in} />&nbsp;&ndash;&nbsp;<Dateformat item={item?.check_out} />
  </div>
    <br />
    {item?.adults} adults {item?.children} children {item?.no_of_pet} pet
</td>

                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {item?.price}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                      <td
                        className={`inline-flex items-center rounded-full py-2 px-3 text-xs text-white ${item?.booking_status === "completed"
                          ? "bg-green-600"
                          : item?.booking_status === "cancelled"
                            ? "bg-red-600"
                            : item?.booking_status === "confirm"
                              ? "bg-green-600"
                              : "bg-blue-600"
                          }`}
                      >
                        {item?.booking_status}
                      </td>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
  <div className="flex items-center">
    <Image
      width={50}
      height={50}
      className="inline-flex items-center rounded-full ml-2"
      src={item?.front_url}
      alt="Document Image"
    />
    <div className="inline-flex items-center rounded-full ml-2">
      {item?.doc_type}
    </div>
  </div>
</td>


                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                      <td
                        onClick={() =>
                          bookingaccept(item.user_id, item.id, "confirm")
                        }
                        className="cursor-pointer text-green-500 flex items-center gap-2 border rounded-full p-2 mb-2"
                      >
                        {loading ? "loading.." : "confirmed"}
                        <svg
                          className="text-emerald-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </td>
                      <td
                        onClick={() =>
                          bookingaccept(item.user_id, item.id, "cancelled")
                        }
                        className="cursor-pointer text-red-500 flex items-center gap-2 border rounded-full p-2"
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
                        {loading ? "loading.." : "Cancelled"}
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        </div>
        </div>
          ) : (
            <Nodata text={"No Booking "} />
          )}
    </AdminLayout>
  );
}
