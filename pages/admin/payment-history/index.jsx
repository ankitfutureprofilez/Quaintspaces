import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import AdminLayout from "../AdminLayout";
import Spinner  from  "../hook/spinner";
import Nodata from "../hook/NoRecord"

export default function Index() {
  const[loading ,setLoading] =useState(false)
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const main = new Listing();
        const response = await main.all_user_payment_history();
        setContent(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout heading={"Payment History"}>
      {loading ? (
        <Spinner/>
      ) : (

        <div className="overflow-x-auto">
        <div className="w-full">
          <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
    {content && content.length > 0 ? (

<table className="min-w-[1200px] w-full break-all divide-gray-200 dark:divide-gray-700">
<thead className="bg-gray-50 dark:bg-gray-800">
  <tr >
    <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Payment Id </td>
    <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Customer</td>
    <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Purchase</td>
    <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Method</td>
    <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</td>
    <td className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Amount</td>
  </tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
  {content && content.map((item, index) => (
    <tr key={index}>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">{item?.payment_id}</td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
        <div className="flex gap-2 items-center  text-sm p-2 ">
          <Image
            width={35}
            height={35}
            className="top-2 right-2 p-1 rounded-full"
            src={item?.booking_history?.booking_user[0]?.image_url}
            alt="User Image"
          />
          <div>
            <div className="text-gray-800 font-medium">{item?.booking_history?.booking_user[0]?.name}</div>
            <div className="text-sm">{item?.booking_history?.booking_user[0]?.email}</div>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
        <div className="items-center flex gap-2 text-sm p-2 ">
          <Image
            width={35}
            height={35}
            className="top-2 right-2 p-1 rounded-full user-profile-img"
            src={item?.booking_history?.booking_property?.property_image[0]?.image_url}
            alt="Property"
          />
          <div>
            <div className="text-gray-800 font-medium">{item?.booking_history?.booking_property?.name}</div>
            <div className="text-sm">{item?.booking_history?.booking_property?.properties_type}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">{item?.method}</td>
      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
        
      <td
                        className={`inline-flex items-center rounded-full py-2 px-3 text-xs text-white ${item?.payment_status === "success"
                          ? "bg-green-600"
                          : item?.payment_status === "cancelled"
                            ? "bg-red-600"
                            : item?.payment_status === "confirm"
                              ? "bg-green-600"
                              : "bg-blue-600"
                          }`}
                      >
        {item?.payment_status}
                      </td>
        
        
        </td>
     
      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{item?.price}</td>
     
    </tr>
  ))}
</tbody>
</table>
    )  :(

      <Nodata heading ={"No Payment History"}/>
    ) }
    
  
  </div>
</div>
</div>
      ) }
    
    </AdminLayout>
  );
}
