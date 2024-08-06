
import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Listing from "../api/Listing";
import Link from "next/link";
import toast from "react-hot-toast";
import Loading from "../hook/spinner";
import Nodata from "../hook/NoRecord";
import Image from "next/image";
import { formatMultiPrice } from "../../../hooks/ValueData";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [content, setContent] = useState([]);
  const [hasmore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState([]);

  const toggleExpanded = (index) => {
    setExpandedReviews((prevExpandedReviews) => {
      const isExpanded = prevExpandedReviews.includes(index);
      if (isExpanded) {
        return prevExpandedReviews.filter((i) => i !== index);
      } else {
        return [...prevExpandedReviews, index];
      }
    });
  };

  const fetchData = async (pg) => {
    if (pg === 1) setLoading(true);
    setLoadingButton(true);
    try {
      const Main = new Listing();
      const response = await Main.getrating(pg);
      const newdata = response?.data?.data?.data || [];
      setContent((prevData) => (pg === 1 ? newdata : [...prevData, ...newdata]));
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
    if (!loading && page) fetchData(page + 1);
  };

  const acceptReview = (uuid, id, newStatus) => {
    const main = new Listing();
    main
      .reviewaccept(uuid, id, newStatus)
      .then((response) => {
        if (response?.data?.status === true) {
          setContent((prevContent) =>
            prevContent.map((item) =>
              item.id === id ? { ...item, status: newStatus } : item
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

  const ShowToolTip = ({text}) => { 
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <>
      <div className={`tooltip-text ${isExpanded ? "open" : "closed"}`}>
        <h2 className="mb-3 text-black">Message</h2>
        {text}
        <button className="close-tooltip text-black text-3xl absolute top-4 right-4" onClick={toggleExpanded}>
          &times;
        </button>
      </div>
      <button
        onClick={toggleExpanded}
        className="text-blue-500 underline ml-2" >
        View Message
      </button>
    </>
    );
  }

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
        <section className="p-4">
          <div className="flex flex-col">
            {loading ? (
              <div className="flex flex-wrap justify-center">
                <Loading />
              </div>
            ) : (
              <div>
                {content && content.length > 0 ? (
                  <div className="mytable">
                    <table className="w-full table-responsive">
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
                      <tbody className="bg-white">
                        {content.map((item, index) => (
                          <tr key={index}>
                            <td className="px-2 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis text-gray-500">
                              {item?.createdAt}
                            </td>
                            <td className="px-2 py-2 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                            <Link
                                  href={`/admin/users//${item?.rating_user?.id}`}
                                  className="flex items-center gap-x-2"
                                >
                              <div className="flex flex-row items-center gap-2 sm:flex-row sm:items-start text-sm">
                              
                                <Image
                                  width={50}
                                  height={50}
                                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                                  src={item?.rating_user?.image_url}
                                  alt="User Image"
                                />
                                <div className="p-1">
                                  <div className="text-gray-800 font-normal">
                                    {item?.rating_user?.name}
                                  </div>
                                  <div className="text-gray-800 font-normal max-w-[13ch] overflow-hidden whitespace-nowrap text-ellipsis">
                                    {item?.rating_user?.email}
                                  </div>
                                </div>
                              </div>
                              </Link>
                            </td>
                            <td className="relative px-2 py-2 text-sm text-gray-500">
                            <ShowToolTip text={item?.review_text} />
                            </td>
                            <td className="px-2 py-2 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
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
                                  <p className="text-green-600">Accepted</p>
                                </div>
                              ) : item?.status === 0 ? (
                                <div className="flex items-center gap-x-2">
                                  <p className="text-red-600">Rejected</p>
                                </div>
                              ) : (
                                <div className="flex items-center gap-x-2">
                                  <p className="text-indigo-600">Pending</p>
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
                                      0
                                    )
                                  }
                                  className="cursor-pointer text-red-500 flex items-center gap-2 border rounded-full p-1 flex justify-center w-22"
                                >
                                  Reject
                                  {/* <svg
                                    className="text-red-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="m19.53 5.53-14 14c-.02.02-.03.03-.05.04-.38-.32-.73-.67-1.05-1.05A9.903 9.903 0 0 1 2 12C2 6.48 6.48 2 12 2c2.49 0 4.77.91 6.52 2.43.38.32.73.67 1.05 1.05-.01.02-.02.03-.04.05ZM22 12c0 5.49-4.51 10-10 10-1.5 0-2.92-.33-4.2-.93-.62-.29-.74-1.12-.26-1.61L19.46 7.54c.48-.48 1.32-.36 1.61.26.6 1.27.93 2.7.93 4.2ZM7.29 3.7c-.48-.48-.36-1.32.26-1.61A9.953 9.953 0 0 1 12 2c1.5 0 2.92.33 4.2.93.62.29.74 1.12.26 1.61L4.54 16.46c-.48.48-1.32.36-1.61-.26C2.33 14.73 2 13.3 2 12c0-2.65 1.05-5.05 2.76-6.76.29-.29.74-.29 1.04 0L7.3 3.7Z"
                                      fill="currentColor"
                                    ></path>
                                  </svg> */}
                                </div>
                              ) : (
                                <div
                                  onClick={() =>
                                    acceptReview(
                                      item?.user_id,
                                      item?.properties_id,
                                      1
                                    )
                                  }
                                  className="cursor-pointer text-green-500 flex items-center gap-2 border rounded-full p-1 flex justify-center w-22"
                                >
                                  Accept
                                  {/* <svg
                                    className="text-green-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M12 2C6.48 2 2 6.48 2 12c0 1.5.33 2.92.93 4.2.29.62 1.12.74 1.61.26L16.46 4.54c.48-.48.36-1.32-.26-1.61A9.953 9.953 0 0 0 12 2Zm7.77 3.24c.48.38.73.67 1.05 1.05.02.02.03.03.04.05-.32.38-.67.73-1.05 1.05L6.24 19.77c-.48.48-1.32.36-1.61-.26A9.903 9.903 0 0 1 2 12c0-5.49 4.51-10 10-10 2.49 0 4.77.91 6.52 2.43ZM12 22c5.52 0 10-4.48 10-10 0-1.3-.33-2.73-.93-4.2-.29-.62-1.12-.74-1.61-.26L7.54 19.46c-.48.48-.36 1.32.26 1.61 1.28.6 2.7.93 4.2.93Z"
                                      fill="currentColor"
                                    ></path>
                                  </svg> */}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {hasmore && (
                      <div className="py-2 flex justify-center">
                        <button
                          className="bg-indigo-600 text-white p-2 rounded-md"
                          onClick={loadMore}
                          disabled={loadingButton}
                        >
                          {loadingButton ? "Loading..." : "Load More"}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Nodata />
                )}
              </div>
            )}
          </div>
        </section>
      </AdminLayout>
    </>
  );
}
