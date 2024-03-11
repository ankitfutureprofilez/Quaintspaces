import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import Popup from "../elements/Popup";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
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
      <Popup isOpen={isOpen} togglePopup={togglePopup}  space={2}  text={"Hello  data"} />

        </div>
      </div>
    </nav>
  );
}
