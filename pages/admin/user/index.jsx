import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import Listing from "../api/Listing";
import Element from "../element"
import LoadingSpinner from "../LoadingSpinner"
import { usePathname } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import  Link from 'next/link';

export default function Index() {
  const [record, setRecord] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const fetchData = async (pg) => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.userListing(pg); 
      console.log("response", response);
      if (response?.data?.data) {
        const newdata = response?.data?.data?.data || [];
        console.log("newdata",newdata)
        setRecord((prevData) => {
          if (pg === 1) {
            return newdata;
          } else {
            return [...prevData, ...newdata];
          }
        });
        setPage(response.data.current_page);
        if (response.data.current_page === response.data.last_page) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        setRecord([]);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData(1);
  }, []);

  const statusUpdate = (id, newStatus) => {
    console.log("id, newStatus0",id, newStatus)
    const main = new Listing();
    main
      .userStauts(id, newStatus)
      .then((response) => {
        console.log("response",response)
        toast.success(response.data.message);
        setRecord((prevRecord) =>
          prevRecord.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Failed to update status");
      });
  };

  const loadMore = () => {
    if (!loading && hasmore) {
      fetchData(page + 1);
    }
  };
  console.log("ddd",record)

  return (
    <div>
      <AdminLayout>
        <Element text="User List " par="User Listing here " />
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">User List</h3>
                </div>
              </div>
            </div>
            {loading ? (
              <p>
                <LoadingSpinner />
              </p>
            ) : (
              <table className="w-full overflow-x-auto text-sm rounded-md">
                <thead className="bg-gray-50">
                  <tr className="hover:bg-gray-100 flex items-center justify-between duration-150 text-gray-700">
                    <th scope="col" className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                      Name
                    </th>
                    <th scope="col" className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                      Phone Number
                    </th>
                    <th scope="col" className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="space-y-2 divide-y">
                  {record && record.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100 flex items-center justify-between duration-150 text-gray-700">
                      <td className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">
                        <div className="relative h-10 w-10">
                          <img
                            className="h-full w-full rounded-full object-cover object-center"
                            src={item.image_url ? item.image_url : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"}
                            alt={item.index ? item.index : "0"}
                          />
                          <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                        </div>
                        <div className="text-sm">
                          <div className="text-gray-800 font-medium">{item.name}</div>
                          <div className="text-xs">{item.email}</div>
                        </div>
                      </td>
                      <td className="flex gap-2 items-center w-[220px] text-sm py-1.5 px-2">{item.phone_no ? item.phone_no : ""}</td>
                      <td className="flex gap-2 items-center text-sm py-1.5 px-2 justify-between w-[180px]">
                       <button onClick={() => statusUpdate(item.id, item.status === 0 ? 1 : 0)}>
    {item.status === 0 ? (
      <div classname ="flex items-center gap-1 border rounded-full p-1">
      <p className="text-xs">
      Deactivate{" "}
        </p>
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
      <div className ="flex items-center gap-1 border rounded-full p-1">
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


                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {record && record.length > 0 && hasmore && !loading && (
  <div className="flex justify-center">
    <div className="btn blue-gradient-btn text-center bg-indigo-500" onClick={loadMore} style={{ marginBottom: "1rem" }}>
      Load More
    </div>
  </div>
)}


            {!loading && !hasmore && record.length < 0 && (
              <div className="loader-btn">
                <button className="btn blue-gradient-btn">No More Data !!</button>
                </div>)}
                </div>
                </div>
                </AdminLayout>
                </div>)};