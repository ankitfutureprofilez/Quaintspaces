import React, { useContext, useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight2,
  Element3,
  Add,
} from "iconsax-react";
import { Context } from "../../_app";
import LocalToken from "../../../hooks/LocalToken";
import { usePathname } from "next/navigation";
import Menu from "./menu";
import { useRouter } from "next/router";

function Sidebar() {
  const { auth, setAuth } = useContext(Context);
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const webtoken = LocalToken("Admintoken");
  const router = useRouter();

  const toggleSidebar = () => {
    router.push("/admin");
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prevState) => !prevState);
  };

  async function getAuth() {
    const main = new Listing();
    const response = main.Adminprofile();
    response
      .then((res) => {
        if (res.data.status) {
          setAuth(res.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }



  useEffect(() => {
    if (webtoken) {
      getAuth();
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAuth(signal);
    return () => controller.abort();
}, []);

  return (
    <div
      className={` shrink-0 md:block h-screen sticky top-0 overflow-hidden ${
        isSidebarOpen ? "!fixed" : "hidden"
      }`}
    >
      <div
        className={`w-60 h-full bg-white border-r ${
          isMobileSidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <div
          className="p-4 md:p-6 flex cursor-pointer group items-center gap-2 z-10 h-24"
          onClick={toggleSidebar}
        >
          <div className="h-10 outline outline-indigo-300 w-10 flex items-center bg-indigo-600 justify-center rounded-full from-indigo-500 to-indigo-400 text-white">
         
            QS
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-800">Admin</h1>
            <p className="text-xs text-gray-500 font-medium">
              Admin Management
            </p>
          </div>
        </div>
        <hr className="bg-gray-400 mx-2" />
        <div className="flex flex-col h-full justify-between">
          <div className="pt-6 text-gray-500 font-medium space-y-2 md:px-2 text-normal">
            <Link
              href={"/admin"}
              className={`flex ${
                pathname === "/admin"
                  ? "text-primary font-bold"
                  : "text-gray-500"
              } hover:px-8 duration-200 rounded-md w-full py-2 px-6 items-center gap-2 focus:text-indigo-400`}
            >
              <Element3 variant="Outline" size={16} />
              Dashboard
            </Link>
            <Link
              href={"/admin/property/add"}
              className={`flex ${
                pathname === "/admin/property/add"
                  ? "text-primary font-bold"
                  : "text-gray-500"
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2 focus:text-indigo-400`}
            >
              <Add color="#080341" size={16} />
              Add Property
            </Link>
            <Link
              href={"/admin/property"}
              className={`flex ${
                pathname === "/admin/property"
                  ? "text-primary font-bold text-gray-500 "
                  : "text-gray-600"
              } hover:px-8 duration-200 px-6 py-2  items-center gap-2 focus:text-indigo-400`}
            >
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.1875L21.4501 10.275L21.0001 11.625H20.25V20.25H3.75005V11.625H3.00005L2.55005 10.275L12 3.1875ZM5.25005 10.125V18.75H18.75V10.125L12 5.0625L5.25005 10.125Z"
                  fill="#080341"
                />
              </svg>
              Properties
            </Link>
            <Link
              href={"/admin/payment-history"}
              className={`flex ${
                pathname === "/admin/payment-history"
                  ? "text-primary font-bold"
                  : "text-gray-500"
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2 focus:text-indigo-400`}
            >
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="6"
                  width="18"
                  height="13"
                  rx="2"
                  stroke="#080341"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 10H20.5"
                  stroke="#080341"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 15H9"
                  stroke="#080341"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              Payment History
            </Link>
            <Link
              href={"/admin/booking-history"}
              className={`flex ${
                pathname === "/admin/booking-history"
                  ? "text-primary font-bold"
                  : "text-gray-500"
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2 focus:text-indigo-400`}
            >
              <svg
                fill="#080341"
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2,7V21a1,1,0,0,0,1,1H13V6H3A1,1,0,0,0,2,7ZM5,9h5v2H5Zm0,4h5v2H5Zm0,4h5v2H5ZM22,3V21a1,1,0,0,1-1,1H15V4H10V3a1,1,0,0,1,1-1H21A1,1,0,0,1,22,3Z" />
              </svg>
              Bookings History
            </Link>
            <Link
              href={"/admin/user-history"}
              className={`flex ${
                pathname === "/admin/user-history"
                  ? "text-primary font-bold"
                  : "text-gray-500"
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2 focus:text-indigo-400`}
            >
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="User / Users_Group">
                  <path
                    id="Vector"
                    d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"
                    stroke="#080341"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              User History
            </Link>
            <Link
              href={"/admin/review"}
              className={`flex ${
                pathname === "/admin/review"
                  ? "text-primary font-bold"
                  : "text-gray-500"
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2 focus:text-indigo-400`}
            >
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#080341"
                  fillRule="evenodd"
                  d="M8,0 C8.55228,0 9,0.447715 9,1 L11,1 L11,2 L13,2 C13.5523,2 14,2.44772 14,3 L14,15 C14,15.5523 13.5523,16 13,16 L3,16 C2.44772,16 2,15.5523 2,15 L2,3 C2,2.44772 2.44772,2 3,2 L5,2 L5,1 L7,1 C7,0.447715 7.44772,0 8,0 Z M5,4 L4,4 L4,14 L12,14 L12,4 L11,4 L11,5 L5,5 L5,4 Z M6,10 L10,10 C10.5523,10 11,10.4477 11,11 C11,11.51285 10.613973,11.9355092 10.1166239,11.9932725 L10,12 L6,12 C5.44772,12 5,11.5523 5,11 C5,10.48715 5.38604429,10.0644908 5.88337975,10.0067275 L6,10 Z M10,7 C10.5523,7 11,7.44772 11,8 C11,8.55228 10.5523,9 10,9 L6,9 C5.44772,9 5,8.55228 5,8 C5,7.44772 5.44772,7 6,7 L10,7 Z M8,2 C7.44772,2 7,2.44772 7,3 C7,3.55228 7.44772,4 8,4 C8.55228,4 9,3.55228 9,3 C9,2.44772 8.55228,2 8,2 Z"
                />
              </svg>
              Reviews
            </Link>
            <Link
              href={"/admin/enquiry"}
              className={`flex ${
                pathname === "/admin/enquiry"
                  ? "text-primary font-bold"
                  : "text-gray-500"
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2 focus:text-indigo-400`}
            >
              <svg
                fill="#080341"
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.29,15.29a1.58,1.58,0,0,0-.12.15.76.76,0,0,0-.09.18.64.64,0,0,0-.06.18,1.36,1.36,0,0,0,0,.2.84.84,0,0,0,.08.38.9.9,0,0,0,.54.54.94.94,0,0,0,.76,0,.9.9,0,0,0,.54-.54A1,1,0,0,0,13,16a1,1,0,0,0-.29-.71A1,1,0,0,0,11.29,15.29ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,7A3,3,0,0,0,9.4,8.5a1,1,0,1,0,1.73,1A1,1,0,0,1,12,9a1,1,0,0,1,0,2,1,1,0,0,0-1,1v1a1,1,0,0,0,2,0v-.18A3,3,0,0,0,12,7Z" />
              </svg>
              Enquiry
            </Link>
          </div>
          <div>
            <hr className="bg-gray-400 mx-2 my-4" />
            {auth ? (
              <div
                className="flex pb-28 justify-between px-4 md:px-6 items-center cursor-pointer hover:pr-5 duration-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={auth?.image_url}
                    alt="User"
                    width={36}
                    height={36}
                    className="rounded-full user-img"
                  />
                  <div className="">
                    <p className="text-sm font-semibold text-gray-800 capitalize	">
                      {auth?.name}
                    </p>
                    <p className="text-xs font-medium text-gray-500">
                      {auth?.email}
                    </p>
                  </div>
                </div>
                <button className="text-gray-500" aria-label="button">
                  <Menu isOpen={isDropdownOpen} record={auth} />
                </button>
              </div>
            ) : (
              <div className="flex pb-28 justify-between px-4 md:px-6 items-center cursor-pointer hover:pr-5 duration-200">
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      "https://th.bing.com/th/id/OIP.aPrAXebVFheO1nA-8qU47gHaJA?rs=1&pid=ImgDetMain"
                    }
                    alt="User"
                    width={36}
                    height={36}
                    className="rounded-full user-img"
                  />
                  <div className="">
                    <p className="text-sm font-semibold text-gray-800">
                      Steve Jobs
                    </p>
                    <p className="text-xs font-medium text-gray-500">
                      steve@adminle.com
                    </p>
                  </div>
                </div>
                <button className="text-gray-500" aria-label="ss">
                  <ArrowRight2 size={24} color="#4B0082" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden fixed top-[10px] left-0 z-50 p-4">
        <button onClick={toggleMobileSidebar}>
          {isMobileSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M21 19H3v-2h18v2zm0-7H3v-2h18v2zm0-7H3V3h18v2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;