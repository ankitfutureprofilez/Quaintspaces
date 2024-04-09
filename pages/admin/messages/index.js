import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Link from "next/link";
import toast from "react-hot-toast";
import Loading from "../hook/spinner";
import Dateformat from "../hook/Dateformat";
import Nodata from "../hook/NoRecord";
import Listing from "../api/Listing";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const Main = new Listing();
      const response = await Main.UserMessages();
      setContent(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log("errr", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AdminLayout heading="User Messages">
        <section className=" p-4 ">
          <div className="flex flex-col">
            {loading ? (
              <div className="flex flex-wrap justify-center">
                <Loading />
              </div>
            ) : (
              <div className=" overflow-x-auto ">
                <div className="inline-block  align-middle ">
                  <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                    <table className="min-w-[1200px] table-auto divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            style={{ width: "20%" }}
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Message Date
                          </th>
                          <th
                            style={{ width: "20%" }}
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            User
                          </th>
                          <th
                            style={{ width: "60%" }}
                            scope="col"
                            className="min-w-50 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Message
                          </th>
                        </tr>
                      </thead>
                      <tbody className=" bg-white divide-y divide-gray-200">
                        {content && content?.length > 0 ? ( content &&
                          content.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="px-4 py-4 text-sm text-gray-500 ">
                                  <Dateformat item={item?.createdAt} />
                                  {/* {item?.createdAt} */}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 ">
                                  <div className="flex items-center gap-x-2">
                                    <div>
                                      <h2 className="text-sm font-medium text-gray-800 ">
                                        {item?.name}
                                      </h2>
                                      <p className="text-xs font-normal text-gray-600">
                                        {item?.email}
                                      </p>
                                    </div>
                                  </div>
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
                            <Nodata heading ={"No Requeest"}/>
                          ) }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </AdminLayout>
    </>
  );
}
