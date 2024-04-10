import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/QsJaipur.png";
import LocalToken from "../../hooks/LocalToken";
import { useContext } from 'react';
import { useRouter } from "next/router";
import { Context } from "../_app";
import { toast } from 'react-hot-toast';
import Menu from "./Menu";
import Listings from "../api/laravel/Listings";

export default function Header() {

  const router = useRouter();
  const auth = useContext(Context)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { setAuth } = useContext(Context);
  const webtoken = LocalToken('token');
  
  async function getAuth (s) { 
    if(webtoken){
      const main = new Listings();
      const response =  main.GetUserProfile(s);
      response.then((res) => {
        if (res?.data?.status) {
          setAuth(res?.data?.data);
        } 
      }).catch((error) => {
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
 

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <div className="logo">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
        </div>
        <div className="nav-bar flex items-center">
          <div className="menu-icon" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer block md:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
          <div className={`menu-items md:flex items-center  ${isMenuOpen ? 'block' : 'hidden'}`}>
            <Link href="/apartments">
              <p>Our Apartments</p>
            </Link>
            <Link href="/#premium">
              <p>Place in Jaipur</p>
            </Link>
            {/* <Link href="/contact">
              <p>Contact</p>
            </Link> */}
            {auth?.auth?.email ? (
              <div className="profile-image" >
                <div
                  className="profile-image-container"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{ cursor: 'pointer' }} >
                  <Image
                    src={auth?.auth?.image_url ? auth?.auth?.image_url : "https://w7.pngwing.com/pngs/812/572/png-transparent-computer-icons-user-name-heroes-monochrome-black-thumbnail.png"}
                    alt="profile"
                    width={100}
                    height={100}
                  />
                </div>
                {isDropdownOpen ? <Menu /> : ''}
              </div>
            ) : (
              <div className="login-signup-btn">
                <Link className="login" href={"/login"}>
                  <p>Login</p>
                </Link>
                <Link className="signup" href={"/signup"}>
                  <p>Sign Up</p>{" "}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
