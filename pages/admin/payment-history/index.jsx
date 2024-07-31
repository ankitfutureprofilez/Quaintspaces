import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";
import Spinner from "../hook/spinner";
import Nodata from "../hook/NoRecord";
import userprofile from "../../../public/admin/userprofile.png";
import Link from "next/link";
import { formatMultiPrice } from "../../../hooks/ValueData";
export default function Index() {
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasMore] = useState(true);
  function fetchData(pg) {
    if (pg == 1) { setLoading(true); }
    setLoadingButton(true);
    const main = new Listing();
    const response = main.all_user_payment_history(pg);
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
        setPage(pg);
        setLoadingButton(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoadingButton(false);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (content && content?.length < 1) {
      fetchData(page);
    }
  }, []);

  const loadMore = () => {
    if (!loading) {
      fetchData(page + 1);
    }
  };
  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <AdminLayout heading={"Payment History"}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto mt-3">
          <div className="w-full">
            <div className="overflow-x-auto border border-gray-200 md:rounded-lg">
              {content && content?.length > 0 ? (
               <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                 <tr>
                   <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                     S. No.
                   </td>
                   <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                     Payment Id
                   </td>
                   <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                     Customer
                   </td>
                   <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                     Purchase
                   </td>
                   <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                     Method
                   </td>
                   <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                     Status
                   </td>
                   <td className="px-4 py-4 text-sm font-normal text-left rtl:text-right bg-indigo-600 text-white whitespace-nowrap capitalize">
                     Amount
                   </td>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                 {content &&
                   content.map((item, index) => (
                     <tr key={index}>
                       <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                         {index + 1}
                       </td>
                       <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                         {item?.payment_id}
                       </td>
                       <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                         <Link
                           href={`/admin/user-history/${item?.booking_history?.booking_user[0]?.id}`}
                         >
                           <div className="flex gap-2 items-center text-sm">
                             <Image
                               width={35}
                               height={35}
                               className="rounded-full"
                               src={
                                 item?.booking_history?.booking_user[0]?.image_url || userprofile
                               }
                               alt="User Image"
                             />
                             <div>
                               <div className="text-gray-800 font-medium capitalize">
                                 {item?.booking_history?.booking_user[0]?.name}
                               </div>
                               <div className="text-sm">
                                 {item?.booking_history?.booking_user[0]?.email}
                               </div>
                             </div>
                           </div>
                         </Link>
                       </td>
                       <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                         <Link
                           href={`/property/${item?.booking_history?.booking_property?.uuid}`}
                         >
                           <div className="flex gap-2 items-center text-sm">
                             <Image
                               width={35}
                               height={35}
                               className="rounded-full"
                               src={
                                 item?.booking_history?.booking_property?.property_image[0]?.image_url
                               }
                               alt="Property"
                             />
                             <div>
                               <div className="text-gray-800 font-medium capitalize">
                                 {item?.booking_history?.booking_property?.name}
                               </div>
                               <div className="text-sm capitalize">
                                 {item?.booking_history?.booking_property?.properties_type?.replace("_", " ")}
                               </div>
                             </div>
                           </div>
                         </Link>
                       </td>
                       <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                         {item?.method}
                       </td>
                       <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                         <span
                           className={`inline-flex w-max items-center rounded-full py-2 px-3 text-xs text-white ${item?.payment_status === "success"
                             ? "bg-green-600"
                             : item?.payment_status === "cancelled"
                               ? "bg-red-600"
                               : item?.payment_status === "confirm"
                                 ? "bg-green-600"
                                 : "bg-blue-600"
                             }`}
                         >
                           {item?.payment_status}
                         </span>
                       </td>
                       <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                         <span className={`${item?.payment_status === "success" || item?.payment_status === "confirm"
                           ? "text-green-600"
                           : "text-red-600"
                           }`}>
                           {item?.payment_status === "success" || item?.payment_status === "confirm" ? (
                             ` + ${formatMultiPrice(item?.price)}`
                           ) : (
                             ` - ${formatMultiPrice(item?.price)}`
                           )}
                         </span>
                       </td>
                     </tr>
                   ))}
               </tbody>
             </table>
             
              ) : (
                <Nodata heading={"No Payment History"} />
              )}
            </div>
          </div>
        </div>
      )}
      {content?.length > 0 && !loading && hasmore && (
        <div className="flex justify-center">
          <div
            className="cursor-pointer mt-4 py-2 px-5 rounded-full text-[#efa3a3] hover:bg-[#efa3a3] hover:text-[#fff] border-2 bg-color-[#efa3a3] border-[#efa3a3] "
            onClick={loadMore}
          >
            {loadingButton ? "Loading..." : "Load More"}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
