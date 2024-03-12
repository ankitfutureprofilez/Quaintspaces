import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/QsJaipur.png";
import Popup from "../elements/Popup";
export default function Header() {
  
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <div className="logo">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
        </div>
        <div className="nav-bar flex items-center">
          <Link href="/apartments">
            <p>Our Apartments</p>
          </Link>
          <Link href="/places">
            <p>Place in Jaipur</p>
          </Link>
          <Link href="/contact">
            <p>Contact</p>
          </Link>
          <div className="login-signup-btn">
            <Link className="login" href={"/login"}>
              <p>Login</p>
            </Link>
            <Link className="signup" href={"/signup"}>
              <p>Sign Up</p>{" "}
            </Link>
          </div>

           <Popup
            isOpen={isOpen}
            togglePopup={togglePopup}
            space={2}
            text={"Hello  World ankit"}
          /> 
         {isOpen && (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => togglePopup(isOpen)}
            >
              Close modal
            </button>
          )} 
        </div>
      </div>
    </nav>
  );
}
