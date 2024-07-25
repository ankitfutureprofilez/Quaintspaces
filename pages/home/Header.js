import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/Logo.png";
import LocalToken from "../../hooks/LocalToken";
import { useRouter } from "next/router";
import { Context } from "../_app";
import { toast } from "react-hot-toast";
import Menu from "./Menu";
import Listings from "../api/laravel/Listings";
import { IoMdMenu } from "react-icons/io";

export default function Header() {
  const router = useRouter();
  const auth = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { setAuth } = useContext(Context);
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

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <div className="logo">
          <Link href="/">
            <Image src={logo} alt="Quaintspaces Jaipur Logo" />
          </Link>
        </div>
        <div className="nav-bar flex items-center">
          <div className="menu-icon" onClick={toggleMenu}>
            <IoMdMenu className="h-6 w-6 cursor-pointer block lg:hidden" />
          </div>
          <div
            className={`menu-items flex-col lg:flex-row lg:flex lg:gap-8 items-center ${
              isMenuOpen ? "flex" : "hidden"
            } lg:flex`}
          >
            <Link href="/apartments" className="border-b lg:border-0">
              <p>Properties</p>
            </Link>
            <Link href="/#testimonials" className="border-b lg:border-0">
              <p>Reviews</p>
            </Link>
            <Link href="/about" className="border-b lg:border-0">
              <p>About Us</p>
            </Link>
            {/* <Link href="/contact">
              <p>Contact</p>
            </Link> */}
            {auth?.auth?.email ? (
              <div
                className="profile-image relative"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div
                  className="profile-image-container items-center"
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={
                      auth?.auth?.image_url
                        ? auth?.auth?.image_url
                        : "/images/profile-no-image.jpg"
                    }
                    alt="profile"
                    width={100}
                    height={100}
                  />
                  <span className="ml-[5px]">{auth?.auth?.first_name}</span>
                </div>
                {isDropdownOpen && <Menu />}
              </div>
            ) : (
              <div className="login-signup-btn flex mt-2 lg:mt-0">
                <Link className="login" href="/login">
                  <p>Login</p>
                </Link>
                <Link className="signup" href="/signup">
                  <p className="text-white">Sign Up</p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
