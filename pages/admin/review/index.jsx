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
  const [expandedReviewId, setExpandedReviewId] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedReviewId((prevId) => (prevId === index ? null : index));
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

  const ShowToolTip = ({text, index}) => { 
    const isExpanded = expandedReviewId === index;

    return (
      <>
        {isExpanded && (
          <div className="tooltip-text open">
            <h2 className="mb-3 text-black">Message</h2>
            {text}
            <button
              className="close-tooltip text-black text-3xl absolute top-4 right-4"
              onClick={() => toggleExpanded(index)}>
              &times;
            </button>
          </div>
        )}
        <button
          onClick={() => toggleExpanded(index)}
          className="text-blue-500 underline ml-2">
          {isExpanded ? "Hide Message" : "View Message"}
        </button>
      </>
    );
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
                      <thead className="">
                        <tr>
                          <th className="px-2 py-2 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-white">
                            Date
                          </th>
                          <th className="px-2 py-2 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-white">
                            Avatar
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
                                <Image
                                  width={50}
                                  height={50}
                                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                                  src={item?.rating_user?.image_url}
                                  alt="User Image"
                                />
                              </Link>
                            </td>
                            <td className="px-2 py-2 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                            <Link
                                  href={`/admin/users//${item?.rating_user?.id}`}
                                  className="flex items-center gap-x-2"
                                >
                                <div className="">
                                  <div className="text-gray-800 font-normal">
                                    {item?.rating_user?.name}
                                  </div>
                                  <div className="text-gray-800 font-normal sm:max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis">
                                    {item?.rating_user?.email}
                                  </div>
                                </div>
                              </Link>
                            </td>
                            <td className="relative px-2 py-2 text-sm text-gray-500 ">
                            <ShowToolTip text={item?.review_text} index={index} />
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
                          onClick={loadMore}
                          disabled={loadingButton}
                          className="px-4 py-2 text-white bg-indigo-500 rounded-full"
                        >
                          {loadingButton ? "Loading..." : "Load More"}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Nodata />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </AdminLayout>
    </>
  );
}
