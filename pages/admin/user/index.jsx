import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import Listing from "../api/Listing";
import Spinner from "../hook/spinner";
import Popup from "../hook/Popup";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function Index() {

  const [popupOpen, setPopupOpen] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [record, setRecord] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchData = async (pg) => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.userListing(pg);
      if (response?.data?.data) {
        const newdata = response?.data?.data?.data || [];
        setRecord((prevData) => {
          if (pg === 1) {
            return newdata;
          } else {
            return [...prevData, ...newdata];
          }
        });
        setPage(response.data && response.data.current_page);
        setHasMore(response.data && response.data.current_page < response.data && response.data.last_page);
      } else {
        setRecord([]);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const statusUpdate = async (id, newStatus) => {
    const main = new Listing();
    const response = main.userStauts(id, newStatus);
    response
      .then((res) => {
        if (res && res.data && res.data.status) {
          toast.success(res.data.message);
          setRecord((prevRecord) =>
            prevRecord.map((item) =>
              item.id === id ? { ...item, status: newStatus } : item
            )
          );
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const loadMore = () => {
    if (!loading && hasmore) {
      fetchData(page + 1);
    }
  };

  const togglePopup = (userId) => {
    setPopupOpen((prevOpen) => (prevOpen === userId ? null : userId));
  };

  const handleRowClick = (userId) => {
    const selectedUserData = record.find((user) => user.id === userId);
    setSelectedRowData(selectedUserData);
    togglePopup(userId);
  };

  return (
    <AdminLayout heading={"User List "}>
      <div className="p-4 w-full md:p-6 space-y-4">
        <div className="w-full ">
          <table className="w-full text-sm rounded-md">
            <thead>
              <tr className="bg-gray-100 rounded-lg flex items-center justify-between text-gray-500">
                <th className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                  Name
                </th>
                <th className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                  Phone Number
                </th>
                <th className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                  Status
                </th>
                <th className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="space-y-2 divide-y">
              {record.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 flex items-center justify-between duration-150 text-gray-700"
                >
                  <td className="flex gap-2 items-center w-[300px] text-sm py-2 px-2">
                    <Image
                      width={35}
                      height={35}
                      className="top-2 right-2 p-1 rounded-full"
                      src={item.image_url ? item.image_url : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"}
                      alt={item.index ? item.index : "0"}
                    />
                    <div>
                      <div className="text-gray-800 font-medium">
                        {item.name}
                      </div>
                      <div className="text-sm">{item.email}</div>
                    </div>
                  </td>
                  <td className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                    {item.phone_no ? item.phone_no : ""}
                  </td>
                  <td className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                    <div className="flex items-center gap-1 p-1">
                      <button
                        onClick={() =>
                          statusUpdate(item.id, item.status === 0 ? 1 : 0)
                        }
                      >
                        {item.status === 0 ? (
                          <div className="flex items-center gap-2 border rounded-full p-2">
                            <p className="text-xs">Deactivate</p>{" "}
                            <svg
                              className="text-gray-400"
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
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 border rounded-full p-1">
                            <p className="text-xs">Activate</p>{" "}
                            <svg
                              className="text-emerald-500"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2ZM4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="relative">
                      <div
                        onClick={() => handleRowClick(item.id)}
                        className="cursor-pointer flex items-center justify-center rounded-full p-2 hover:bg-gray-200"
                      >
                        <svg
                          width="32px"
                          height="32px"
                          viewBox="0 0 24 24"
                          id="three-dots"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g
                            id="_20x20_three-dots--grey"
                            data-name="20x20/three-dots--grey"
                            transform="translate(24) rotate(90)"
                          >
                            <rect
                              id="Rectangle"
                              width="24"
                              height="24"
                              fill="none"
                            />
                            <circle
                              id="Oval"
                              cx="1"
                              cy="1"
                              r="1"
                              transform="translate(5 11)"
                              stroke="#000000"
                              strokeMiterlimit="10"
                              strokeWidth="0.5"
                            />
                            <circle
                              id="Oval-2"
                              data-name="Oval"
                              cx="1"
                              cy="1"
                              r="1"
                              transform="translate(11 11)"
                              stroke="#000000"
                              strokeMiterlimit="10"
                              strokeWidth="0.5"
                            />
                            <circle
                              id="Oval-3"
                              data-name="Oval"
                              cx="1"
                              cy="1"
                              r="1"
                              transform="translate(17 11)"
                              stroke="#000000"
                              strokeMiterlimit="10"
                              strokeWidth="0.5"
                            />
                          </g>
                        </svg>
                      </div>


                      {/* Dropdown menu */}
                      {popupOpen === item.id && selectedRowData && (
                        <div className="z-10 absolute top-full left-0 mt-1 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              <button
                                onClick={() =>
                                  statusUpdate(item.id, item.status === 0 ? 1 : 0)
                                }
                              >
                                {item.status === 0 ? (
                                  <div className="flex items-center gap-1  p-1 hover:bg-black-500">
                                    <p className="text-xs ">Deactivate</p>{" "}
                                    <svg
                                      class="text-gray-400"
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
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1  p-1">
                                    <p className="text-xs">Activate</p>{" "}
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
                                  </div>
                                )}
                              </button>
                            </li>
                            <li>
                              <Link href={`user/${item.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">User Details </Link>
                            </li>
                            {/* <li>
                              <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
                            </li>
                            <li>
                              <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                            </li> */}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading ? (
            <div className="flex flex-wrap justify-center ">
              <Spinner />
            </div>
          ) : (
            <> </>
          )}
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
        {!loading && !hasmore && record.length === 0 && (
          <div className="text-center">No more data</div>
        )}
      </div>
    </AdminLayout>
  );
}
