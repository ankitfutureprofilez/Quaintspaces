import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Loading from "../hook/spinner";
import Dateformat from "../hook/Dateformat";
import userprofile from "../../../public/admin/userprofile.png";
import Nodata from "../hook/NoRecord";
import Listing from "../api/Listing";
import Image from 'next/image';
export default function Index() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState();

  const [hasmore, setHasMore] = useState(true);

  const [page, setPage] = useState(0);

  const fetchData = async (pg) => {
    setLoading(true);
    try {
      const Main = new Listing();
      const response = await Main.UserMessages(pg);
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
    } catch (error) {
      console.log("errr", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData(page + 1);
  }, []);

  const loadMore = () => {
    if (!loading && page) {
      fetchData(page + 1);
    }
  };

  return (
    <>
      <AdminLayout heading="Enquiry ">
        <section className="p-2 sm:p-4 ">
          <div className="flex flex-col">
            {loading ? (
              <div className="flex flex-wrap justify-center">
                <Loading />
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <div className="border border-gray-200 md:rounded-lg">
                  <table className="min-w-[1200px] overflow-x-auto table-auto divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          S.No
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          Message Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          User
                        </th>
                        <th
                          scope="col"
                          className="min-w-50 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          Message
                        </th>
                        <th
                          scope="col"
                          className="min-w-50 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          Reply Message
                        </th>
                        <th
                          scope="col"
                          className="min-w-50 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" bg-white divide-y divide-gray-200">
                      {content && content?.length > 0 ? (content &&
                        content.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="px-4 py-4 text-sm text-gray-500 ">
                                {index + 1}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 ">
                                {item?.createdAt}
                              </td>

                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                                <div className="text-gray-800 font-medium capitalize ">{item?.name}</div>
                                <div className="text-sm capitalize"> {item?.email}</div>
                              </td>

                              <td
                                style={{ width: "50%" }}
                                className="px-4 py-4 text-sm text-gray-500 "
                              >
                                {item?.message}
                              </td>
                            </tr>
                          );
                        })) : (
                        <Nodata heading={"No Request"} />
                      )}
                    </tbody>
                  </table>
                </div>
                {!loading && hasmore  && (
          <div className="flex justify-center">
            <div
              className="font-inter font-lg leading-tight bg-indigo-600 text-center text-black-400 w-full sm:w-96 bg-indigo-500 border-0 p-4 rounded-full mt-10 mb-12 text-white"
              onClick={loadMore}
            >
              Load More
            </div>
          </div>
        )}
        {!loading && !hasmore  && (

<div className="flex justify-center">
<div
  className="font-inter font-lg leading-tight bg-indigo-600 text-center text-black-400 w-full sm:w-96 bg-indigo-500 border-0 p-4 rounded-full mt-10 mb-12 text-white"
>
  No More Data
</div>
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
