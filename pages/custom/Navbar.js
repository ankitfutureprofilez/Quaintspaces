import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import LoginPop from "../login/LoginPop";
import Signuppop from "../signup/Signuppop";
import Popup from "../elements/Popup";
// import Logo from "";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [isOpens, setIsOpens] = useState(false);

  const togglePopups = () => {
    setIsOpens(!isOpens);
  };
  return (
    <nav className="bg-transparent navbar">
      <div className="container flex items-center justify-between">
        <div className="logo">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <div className="nav-bar flex items-center">
        <Link href="/apartments">
          <p>
            Our Apartments
          </p>
        </Link>
        <Link href="/places">
          <p>
            Place in Jaipur
          </p>
        </Link>
        <Link href="/contact">
          <p>
            Contact
          </p>
        </Link>
        <div className="login-signup-btn">
            <Link  className="login" href={"/login"} >
              <p>
              Login
                </p></Link>
            <Link  className="signup" href={"/signup"} >
              <p>
              Sign Up
                </p> </Link>
        </div>
        </div>
      </div>
    </nav>
  );
}
