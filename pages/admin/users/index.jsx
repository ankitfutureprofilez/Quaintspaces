import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import Listing from "../api/Listing";
import Spinner from "../hook/spinner";
import Popup from "../hook/Popup";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import Modal from "../hook/Modal";

export default function Index() {
  const [popupOpen, setPopupOpen] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const [record, setRecord] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();
  const [id, setid] = useState();

  const fetchData = async (pg, signal) => {
    try {
      if (pg === 1) { setLoading(true); }
      setLoadingButton(true);
      const main = new Listing();
      const response = await main.userListing(pg, { signal });
      if (response?.data?.data) {
        const newData = response?.data?.data?.data || [];
        setRecord((prevData) => {
          if (pg === 1) {
            return newData;
          } else {
            return [...prevData, ...newData];
          }
        });
        setPage(response?.data?.current_page);
        setHasMore(response?.data?.current_page < response?.data?.last_page);
      } else {
        setRecord([]);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.log("Error fetching data:", error);
      }
    } finally {
      setLoadingButton(false);
      setLoading(false);
    }
  };


  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchData(page, signal);

    return () => {
      controller.abort(); // Cancel the request if the component unmounts
    };
  }, [page]);

  const handleChange = (e) => {
    setMessage(e?.target?.value);
  };

  const openModal = (id) => {
    setid(id);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  // useEffect(() => {
  //   fetchData(1);
  // }, []);

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

  const deleteAccount = async (id) => {
    if (message?.length == 0) {
      toast.error("Mesage can not be empty !!");
      return;
    }
    const formData = new FormData();
    formData.append("message", message);
    const main = new Listing();
    const response = main.DeleteUser(id, formData);
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          toast.success(res?.data?.message);
          setIsOpen(false);
          setMessage("")
        } else {
          toast.error(res?.data?.message);
          setMessage("")
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const loadMore = () => {
    if (!loading) {
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
    <AdminLayout heading={"User List"}>
      <div className="mytable w-full table-responsive">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 rounded-lg items-center bg-indigo-600 text-white justify-between text-gray-500">
              <th className="px-4 py-4 text-sm font-normal text-left whitespace-nowrap rtl:text-right bg-indigo-600 text-white capitalize">
                <p>S.No.</p>
              </th>
              <th className="px-4 py-4 text-sm font-normal text-left whitespace-nowrap rtl:text-right bg-indigo-600 text-white capitalize">
                <p>Avatar</p>
              </th>
              <th className="px-4 py-4 text-sm font-normal text-left whitespace-nowrap rtl:text-right bg-indigo-600 text-white capitalize">
                <p>Name</p>
              </th>
              <th className="px-4 py-4 text-sm font-normal text-left whitespace-nowrap rtl:text-right bg-indigo-600 text-white capitalize">
                <p>Phone Number</p>
              </th>
              <th className="px-4 py-4 text-sm font-normal text-left whitespace-nowrap rtl:text-right bg-indigo-600 text-white capitalize">
                <p>Status</p>
              </th>
              <th className="px-4 py-4 text-sm font-normal text-left whitespace-nowrap rtl:text-right bg-indigo-600 text-white capitalize">
                <p>Details</p>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {record.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100  items-center justify-between duration-150 text-gray-700 !mt-0">
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap ">
                  {index + 1}
                </td>
                <td className="img-data items-center text-sm px-2 whitespace-nowrap">
                  <Image
                    width={35}
                    height={35}
                    className="top-2 right-2 p-1 rounded-full"
                    src={item.image_url ? item.image_url : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"} alt={item.index ? item.index : "0"}
                  />
                </td>
                <td className="img-data items-center text-sm px-2 whitespace-nowrap">
                  <div className="text-gray-800 font-medium">{item.name}</div>
                  <div className="text-sm">{item.email}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap ">
                  {item.phone_no ? item.phone_no : "-"}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap ">
                  <div className="flex items-center gap-1 p-1">
                    <button
                      onClick={() =>statusUpdate(item.id, item.status === 0 ? 1 : 0)}
                      >
                        
                    {item.status === 0 ? (
                      <div className="flex items-center border rounded-full px-2 py-1">
                        <p className="text-xs me-1">Disable</p>
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
                      <div className="flex items-center border rounded-full px-2 py-1">
                        <p className="text-xs me-1">Enable</p>
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
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <div className="relative">
                    <div
                      onClick={() => handleRowClick(item.id)}
                      className="cursor-pointer w-12 rounded p-2 hover:bg-gray-200"
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
                      <div className="z-10 absolute top-full right-0 mt-1 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow">
                        <ul
                          className="py-2 text-sm text-gray-700"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          <li className="block px-4 py-2 hover:bg-gray-100">
                            <button
                              // onClick={() => {
                              //   handleRowClick(null);
                              //   statusUpdate(item.id,item.status === 0 ? 1 : 0)
                              // }
                              // }
                            >
                              {item.status === 0 ? (
                                  <p className="text-normal">Enable User</p>
                              ) : 
                                  <p className="text-normal">Suspend User</p> 
                              }
                            </button>
                          </li>
                          <li>
                            <Link
                              href={`users/${item.id}`}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              User Details{" "}
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={() => openModal(item?.id)}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Delete Account{" "}
                            </button>
                          </li>
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

      {record?.length > 0 && !loading && hasmore && (
        <div className="flex justify-center p-2" style={{ cursor: "pointer" }}>
          <div
            className="cursor-pointer mt-4 py-2 px-5 rounded-full text-[#efa3a3] hover:bg-[#efa3a3] hover:text-[#fff] border-2 bg-color-[#efa3a3] border-[#efa3a3]"
            onClick={loadMore}
          >
            {loadingButton ? "Loading..." : "Load More"}
          </div>
        </div>
      )}

      {isOpen && (
        <Modal isOpen={openModal} onClose={closeModal}>
          <div className="flex flex-col">
            <div className="p-4 bg-[#efa3a3]">
              <label
                htmlFor="message"
                className="mx-auto  block text-lg font-medium text-[#fff]"
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
                placeholder="Please enter a reason for account deletion"
                rows={2}
              />
              <div className="flex justify-center">
                <button
                  className="btn filter mt-6 mb-4 w-2/4 mx-auto"
                  onClick={() => deleteAccount(id)}   >
                  {loading ? "Processing..." : "Proceed"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
