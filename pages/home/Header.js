import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/Logo.png";
import LocalToken from "../../hooks/LocalToken";
import { useRouter } from "next/router";
import { Context } from "../_app";
import toast from "react-hot-toast";
import Menu from "./Menu";
import Listings from "../api/laravel/Listings";
import { IoMdMenu } from "react-icons/io";
import SecurityIcon from "../../public/icons/SecurityIcon";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineAvTimer } from "react-icons/md";

import { MdOutlineSecurity } from "react-icons/md";





export default function Header() {
  const router = useRouter();
  const { auth, setOpenLogin, setAuth } = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutClick = () => {
    localStorage && localStorage.removeItem("token");
    setAuth(null);
    setTimeout(() => {
      toast.success("Logout Successfully !!");
    }, 1000)
    router.push("/login");
  };

  const webtoken = LocalToken("token");

  async function getAuth(s) {
    if (webtoken) {
      const main = new Listings();
      const response = main.GetUserProfile(s);
      response
        .then((res) => {
          if (res?.data?.status) {
            setAuth(res?.data?.data);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAuth(signal);
    return () => controller.abort();
  }, []);


  const loginNOW = () => {
    setOpenLogin(true);
    toggleMenu();
  }

  return (
    <nav className="bg-white navbar">
      <div className="container flex items-center justify-between">
        <div className="logo">
          <Link href="/">
            <Image src={logo} alt="Quaint Spaces Jaipur Logo" />
          </Link>
        </div>
        <div className="nav-bar flex items-center">
          <div className="menu-icon" onClick={toggleMenu}>
            <IoMdMenu className="h-9 w-9 cursor-pointer block lg:hidden" />
          </div>
          <div
            className={`${auth?.email ? "login" : ""} menu-items overflow-y-auto lg:overflow-visible flex-col lg:flex-row lg:flex lg:gap-8 items-center ${isMenuOpen ? "right-0 opacity-1" : "-right-[100%] opacity-1"
              } lg:flex`}>
            <button className="bg-transparent border-0 p-0 menu-close lg:hidden" onClick={toggleMenu}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.205 1.205C1.41594 0.994324 1.70187 0.87599 2 0.87599C2.29813 0.87599 2.58406 0.994324 2.795 1.205L20.795 19.205C20.9055 19.308 20.9942 19.4322 21.0557 19.5702C21.1172 19.7082 21.1502 19.8572 21.1529 20.0082C21.1556 20.1593 21.1278 20.3093 21.0712 20.4494C21.0146 20.5895 20.9304 20.7167 20.8236 20.8236C20.7167 20.9304 20.5895 21.0146 20.4494 21.0712C20.3093 21.1278 20.1593 21.1556 20.0082 21.1529C19.8572 21.1502 19.7082 21.1172 19.5702 21.0557C19.4322 20.9942 19.308 20.9055 19.205 20.795L1.205 2.795C0.994324 2.58406 0.87599 2.29813 0.87599 2C0.87599 1.70187 0.994324 1.41594 1.205 1.205Z" fill="black" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.795 1.205C21.0057 1.41594 21.124 1.70187 21.124 2C21.124 2.29813 21.0057 2.58406 20.795 2.795L2.795 20.795C2.58174 20.9937 2.29967 21.1019 2.00822 21.0968C1.71676 21.0916 1.43869 20.9736 1.23257 20.7674C1.02645 20.5613 0.90838 20.2832 0.903238 19.9918C0.898096 19.7003 1.00628 19.4183 1.205 19.205L19.205 1.205C19.4159 0.994324 19.7019 0.87599 20 0.87599C20.2981 0.87599 20.5841 0.994324 20.795 1.205Z" fill="black" />
              </svg>
            </button>
            <div className=" lg:flex items-center pt-2">
              <Link href="/apartments" className=" link mb-3 block lg:mb-0 border-b md:me-6 lg:border-0">
                <p>Properties</p>
              </Link>
              <Link href="/#testimonials" className=" link mb-3 block lg:mb-0 border-b md:me-6 lg:border-0">
                <p>Reviews</p>
              </Link>
              <Link href="/about" className=" link mb-3 block lg:mb-0 md:me-6 lg:border-0">
                <p>About Us</p>
              </Link>
            </div>
            {auth?.email ? (
              <>
                <div
                  className="profile-image relative pointer-events-none lg:pointer-events-auto"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} >
                  <div
                    className="profile-image-container items-center"
                    style={{ cursor: "pointer" }} >
                    <Image alt="profile" width={100} height={100}
                      src={auth?.image_url ? auth?.image_url : "/images/profile-no-image.jpg"} />
                    <span className="ml-[5px]">{auth?.first_name}</span>
                  </div>
                  {isDropdownOpen && <Menu />}
                </div>
                <div className="lg:hidden mt-[30px] w-full static">
                  <h3 className="text-[19px] text-gray-500 mb-2 border-t border-gray-200 pt-4">Account Settings</h3>
                  <div className="w-full p-3 divide-y divide-gray-300 profile-navbar static">
                    <div aria-label="navigation" className="py-2">
                      <nav className="grid gap-1">
                        <Link
                          href="/profile"
                          className="mb-3 block link !flex items-center leading-6 space-x-3 w-full text-lg text-gray-600 focus:outline-none hover:text-gray-800 border-b rounded-lg" >
                          <CgProfile size={24} />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          href="/booking-history"
                          className="mb-3 block link !flex items-center leading-6 space-x-3 w-full text-lg text-gray-600 focus:outline-none hover:text-gray-800 border-b rounded-lg"
                        >

                          <MdOutlineAvTimer size={24} />
                          <span>Bookings History</span>
                        </Link>

                        <Link
                          href="/payment-history"
                          className="mb-3 block link !flex items-center leading-6 space-x-3 w-full text-lg text-gray-600 focus:outline-none hover:text-gray-800 border-b rounded-lg"
                        >

                          <MdOutlinePayment size={24} />
                          <span>Payment History</span>
                        </Link>

                        <Link
                          href="/security"
                          className="mb-3 block link !flex items-center leading-6 space-x-3 w-full text-lg text-gray-600 focus:outline-none hover:text-gray-800 border-b rounded-lg"
                        >
                          <MdOutlineSecurity size={24} />
                          <span>Security</span>
                        </Link>

                        <Link
                          href="/account"
                          className="link block mb-3  rounded-lg !flex items-center leading-6 space-x-3 w-full text-lg text-gray-600 focus:outline-none hover:text-gray-800"
                        >
                          <MdOutlineSettings size={24} />
                          <span>Settings</span>
                        </Link>

                        <Link onClick={handleLogoutClick}
                          href="/login"
                          className="link block mb-3 rounded-lg !flex items-center leading-6 space-x-3 w-full text-lg text-gray-600 focus:outline-none hover:text-gray-800">
                          <MdOutlineLogout size={24} />
                          <span>Logout</span>
                        </Link>
                      </nav>
                    </div>

                    {/* <div className="logout_menu w-full">
                      <button
                        
                        type="button"
                        className="!flex items-center leading-6 space-x-3 sm:py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:text-gray-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="w-7 h-7"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                          <path d="M9 12h12l-3 -3"></path>
                          <path d="M18 15l3 -3"></path>
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div> */}
                  </div>
                </div>
              </>
            ) : (
              <div className="login-signup-btn flex mt-2 lg:mt-0">
                <button className="login abtn" onClick={() => setOpenLogin(true)} >
                  <p>Login</p>
                </button>
                <Link className="signup" href="/signup">
                  <p className="text-white">Sign Up</p>
                </Link>
              </div>
            )}

            {auth?.email ? "" : <div className="visible lg:hidden mobilebtns bg-white p-4 absolute bottom-0 left-0 w-full">
              <button className="px-3 py-2 rounded-3xl mb-3 text-center d-block border border-2 border-black w-full" onClick={loginNOW} >
                Login
              </button>
              <Link className="px-3 py-2 rounded-3xl !text-center d-block bg-[#efa3a3] text-black w-full" href="/signup">
                Sign Up
              </Link>
            </div>}
          </div>
        </div>
      </div>
    </nav>
  );
}