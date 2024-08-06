import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Listing from "../api/Listing";
import Link from "next/link";
import toast from "react-hot-toast";
import Loading from "../hook/spinner";
import Nodata from "../hook/NoRecord";
import userprofile from "../../../public/admin/userprofile.png";
import Image from "next/image";
import { formatMultiPrice } from "../../../hooks/ValueData";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [content, setContent] = useState();
  const [hasmore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);


  const [expandedReview, setExpandedReview] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedReview(expandedReview === index ? null : index);
  };

  console.log("content", content)
  const fetchData = async (pg) => {
    if (pg == 1) { setLoading(true); }
    setLoadingButton(true);
    try {
      const Main = new Listing();
      const response = await Main.getrating(pg);
      const newdata = response?.data?.data?.data || [];
      setContent((prevData) => {
        if (pg === 1) {
          return newdata;
        } else {
          return [...prevData, ...newdata];
        }
      });
      setHasMore(response?.data?.current_page < response?.data?.last_page);
      setPage(response?.data?.current_page);
      setLoading(false);
      setLoadingButton(false);
    } catch (error) {
      console.log("errr", error);
      setLoading(false);
      setLoadingButton(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const loadMore = () => {
    if (!loading && page) {
      fetchData(page + 1);
    }
  };

  const acceptReview = (uuid, id, newStatus) => {
    const main = new Listing();
    main
      .reviewaccept(uuid, id, newStatus)
      .then((response) => {
        if (response && response.data && response?.data?.status === true) {
          setContent((prevContent) =>
            prevContent.map((item) =>
              item.id === id
                ? {
                  ...item,
                  status: newStatus,
                }
                : item
            )
          );
          toast.success(response.data.message);
          fetchData(page);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating review status:", error);
      });
  };
  const truncateEmail = (email, length = 13) => {
    return email.length > length ? email.substring(0, length) + "..." : email;
  };
  return (
    <>
      <style jsx>{`
        .truncate-text {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <AdminLayout heading={"Review "}>
        <section className=" p-4 ">
          <div className="flex flex-col">
            {loading ? (
              <div className="flex flex-wrap justify-center">
                <Loading />
              </div>
            ) : (
              <div>
                {content && content?.length > 0 ? (
                  <div className="">
                    <table className=" w-full table-responsive  ">
                      <thead className="bg-indigo-600">
                        <tr>
                          <th className="px-2 py-2 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-white">
                            Date
                          </th>
                          <th className="px-2 py-2 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-white">
                            Customer
                          </th>
                          <th className="px-2 py-2 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-white">
                            Message
                          </th>
                          <th className="px-2 py-2 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-white">
                            Property Name
                          </th>
                          <th className="px-2 py-2 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-white">
                            Status
                          </th>
                          <th className="px-2 py-2 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-white">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white ">
                        {content.map((item, index) => (
                          <tr key={index}>
                            <td className="px-2 py-2 text-sm  whitespace-nowrap overflow-hidden text-ellipsis text-gray-500">
                              {item?.createdAt}
                            </td>
                            <td className="px-2 py-2 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                              <div className="flex flex-row items-center gap-2 sm:flex-row sm:items-start text-sm">
                                <Image
                                  width={50}
                                  height={50}
                                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                                  src={
                                    item?.rating_user?.image_url
                                  }
                                  alt="User Image"
                                />
                                <div className="p-1">
                                  <div className="text-gray-800 font-normal ">
                                    {item?.rating_user?.name}
                                  </div>
                                  <div className="text-gray-800 font-normal  max-w-[13ch] overflow-hidden whitespace-nowrap text-ellipsis">
                                    {item?.rating_user?.email}
                                  </div>

                                </div>
                              </div>
                            </td>
                            <td className="relative px-2 py-2 text-sm text-gray-500">
                              <div className={expandedReview === index ? "" : "truncate-text"}>
                                {item?.review_text}
                              </div>
                              <button
                                onClick={() => toggleExpanded(index)}
                                className="text-blue-500 underline ml-2"
                              >
                                {expandedReview === index ? "See Less" : "See All"}
                              </button>
                            </td>
                            <td className="px-2 py-2 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis ">
                              <div className="flex items-center gap-x-2">
                                <Link
                                  href={`/property/${item?.get_property_review?.uuid}`}
                                  className="flex items-center gap-x-2"
                                >
                                  <div>
                                    <h2 className="capitalize text-sm font-medium text-gray-800">
                                      {item?.get_property_review?.name}
                                    </h2>
                                    <p className="text-xs font-normal text-gray-600">
                                      {formatMultiPrice(
                                        item?.get_property_review?.price
                                      )}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </td>
                            <td className="px-2 py-2 text-sm text-gray-500">
                              {item?.status === 1 ? (
                                <div className="flex items-center gap-x-2">
                                  {/* <svg
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
                                  </svg> */}
                                  <p className="text-green-600">Accepted</p>
                                </div>
                              ) : item?.status === 0 ? (
                                <div className="flex items-center gap-x-2">
                                  <p className="text-red-600">Rejected</p>
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
                                </div>
                              ) : (
                                <div className="flex items-center gap-x-2">
                                  <p className="text-indigo-600">Pending</p>
                                  {/* <svg
                                    className="text-yellow-400"
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
                                </div>
                              )}
                            </td>
                            <td className="px-2 py-2 text-sm text-gray-500">
                              {item?.status === 1 ? (
                                <div
                                  onClick={() =>
                                    acceptReview(
                                      item?.user_id,
                                      item?.properties_id,
                                      item.status === 1 ? 0 : ""
                                    )
                                  }
                                  className="cursor-pointer text-red-500 flex items-center gap-2 border rounded-full p-2 flex justify-center w-28"
                                >
                                  Reject
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
                                </div>
                              ) : item?.status === 0 ? (
                                <div
                                  onClick={() =>
                                    acceptReview(
                                      item?.user_id,
                                      item?.properties_id,
                                      item.status === 0 ? 1 : ""
                                    )
                                  }
                                  className="cursor-pointer text-green-500 flex items-center gap-2 w-22 border rounded-full p-2 mb-2 flex justify-center"
                                >
                                  Accept
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
                              ) :
                                <>
                                  <div
                                    onClick={() =>
                                      acceptReview(
                                        item?.user_id,
                                        item?.properties_id,
                                        item.status === 2 ? 1 : 1
                                      )
                                    }
                                    className="cursor-pointer text-green-500 flex items-center gap-2 w-22 border rounded-full p-2 mb-2 flex justify-center"
                                  >
                                    Accept
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
                                  <div
                                    onClick={() =>
                                      acceptReview(
                                        item?.user_id,
                                        item?.properties_id,
                                        item.status === 2 ? 0 : 0
                                      )
                                    }
                                    className="cursor-pointer text-red-500 flex items-center gap-2 border rounded-full p-2 flex justify-center w-22"
                                  >
                                    Reject
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
                                  </div>
                                </>
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Nodata heading={"NO Reviews"} />
                )}
              </div>
            )}
          </div>
          {content?.length > 0 && !loading && hasmore && (
            <div className="flex justify-center">
              <div
                className="font-inter font-lg leading-tight bg-indigo-600 text-center text-black-400 w-full sm:w-96 bg-indigo-500 border-0 p-4 rounded-full mt-10 mb-12 text-white cursor-pointer"
                onClick={loadMore}
              >
                {loadingButton ? "Loading..." : "Load More"}
              </div>
            </div>
          )}

        </section>
      </AdminLayout>
    </>
  );
}