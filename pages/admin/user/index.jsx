import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import Listing from "../api/Listing";
import Element from "../element"
import { usePathname } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'next/link';

export default function Index() {
  const [record, setRecord] = useState([]);
  const pathname = usePathname()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const main = new Listing();
        const response = await main.userListing();
        console.log("response", response);
        setRecord(response?.data?.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
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

  return (
    <div>
      <AdminLayout>
        <Element/>
        {/* <div className="flex items-center justify-end"> 
          <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
            <Link href={'/admin/user/add'} className={`flex ${pathname === '/admin/user/add' ? 'text-primary' : ''} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}>
              Add user Account
            </Link>
          </button>
        </div> */}
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Role
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {record.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative h-10 w-10">
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src={item.image_url ? item.image_url : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                        alt={item.index ? item.index : "0"}
                      />
                      <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                    </div>
                    <div className="text-sm">
                   <div className="font-medium text-gray-700">{item.name}</div>
                      <div className="text-gray-400">{item.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.phone_no ? item.phone_no : "null"}</td>
                  <td className="px-6 py-4">{item.role}</td>
                  <td className="px-6 py-4">
                  <button onClick={() => statusUpdate(item.id, item.status === 0 ? 1 : 0)}>
                <span className={item.status === 0 ? "relative  inline-block px-3 py-1 font-semibold text-red-900 leading-tight" : "relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"}>
                     <span className="relative">{item.status === 0 ? "Deactivate" : "Activate"}</span>
                         </span> 
                  </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </div>
  );
}
