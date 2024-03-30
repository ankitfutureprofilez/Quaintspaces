import React, { useState, useEffect } from 'react';
import Listing from "../api/Listing";
import { useRouter } from "next/router";
import AdminLayout from "../AdminLayout";
import Element from "../element";

function index() {
  const Router = useRouter();
  const { slug } = Router.query;
  const [record, setRecord] = useState("");

  useEffect(() => {
    const main = new Listing();
    const response = main.userdetails(slug);
    response.then((res) => {
      setRecord(res?.data?.data);
    }).catch((error) => {
      console.log("error", error);
    });
  }, [slug]);

  return (
    <AdminLayout>
      <Element text={"User Details"} />
      <div className="p-5 text-center w-full">
        <img className="w-32 h-32 rounded-full mx-auto" src={record?.image_url ? record?.image_url : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"} alt="" />
        <div className="text-sm mt-5">
          <div className="font-medium leading-none text-gray-900 mb-3">
            {record?.name}
          </div>
          <p className="text-sm mt-3 font-medium">{record?.email}</p>
        </div>
        <p className="mt-2 text-sm text-gray-900">{record?.phone_no}</p>
        <button className="mt-4 focus:outline-none">
          {record.status === 0 ? (
            <>
              <div className="flex items-center gap-1 border rounded-full p-1 bg-gray-100">
                <p className="text-xs">Deactivate</p>{" "}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 border rounded-full p-1 bg-gray-100">
                <p className="text-xs">Activate</p>{" "}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z" clipRule="evenodd" />
                </svg>
              </div>
            </>
          )}
        </button>
      </div>
    </AdminLayout>
  );
}

export default index;
