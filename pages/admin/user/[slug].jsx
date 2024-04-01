import React, { useState, useEffect } from 'react';
import Listing from "../api/Listing";
import { useRouter } from "next/router";
import AdminLayout from "../AdminLayout";
import Element from "../element";
import Link from "next/link"

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
    <AdminLayout >
      <div className="bg-gray-300 antialiased">
      <div className="container mx-auto my-20">
        <div>
          <div className=" relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
            <div className="flex justify-center">
              <img src={record?.image_url ? record?.image_url : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"} alt="" className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
            </div>
            
            <div className="mt-16">
              <h1 className="font-bold text-center  text-3xl text-white-900"> {record?.name}</h1>
              <p className="text-center text-sm text-white-400 font-medium">{record?.email}</p>
              <p className="text-center text-sm text-white-400 font-medium">{record?.phone_no}</p>
              {/* <div className="my-5 px-6">
                <Link href="#" className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Connect with <span className="font-bold">@pantazisoft</span></Link>
              </div> */}
              {/* <div className="flex justify-between items-center my-5 px-6">
                <Link href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Facebook</Link>
                <Link href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Twitter</Link>
                <Link href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Instagram</Link>
                <Link href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Email</Link>
              </div> */}

              {/* <div className="w-full">
                <h3 className="font-medium text-gray-900 text-left px-6">Recent activites</h3>
                <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                  <Link href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" className="rounded-full h-6 shadow-md inline-block mr-2" />
                    Updated his status
                    <span className="text-gray-500 text-xs">24 min ago</span>
                  </Link>

                  <Link href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" className="rounded-full h-6 shadow-md inline-block mr-2" />
                    Added new profile picture
                    <span className="text-gray-500 text-xs">42 min ago</span>
                  </Link>

                  <Link href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" className="rounded-full h-6 shadow-md inline-block mr-2" />
                    Posted new article in <span className="font-bold">#Web Dev</span>
                    <span className="text-gray-500 text-xs">49 min ago</span>
                  </Link>

                  <Link href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" className="rounded-full h-6 shadow-md inline-block mr-2" />
                    Edited website settings
                    <span className="text-gray-500 text-xs">1 day ago</span>
                  </Link>

                  <Link href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 overflow-hidden">
                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" className="rounded-full h-6 shadow-md inline-block mr-2" />
                    Added new rank
                    <span className="text-gray-500 text-xs">5 days ago</span>
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}

export default index;
