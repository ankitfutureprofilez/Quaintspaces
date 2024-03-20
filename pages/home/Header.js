import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/QsJaipur.png";
import userprofile from "../../public/images/profile.png";

export default function Header() {
  const [token, setToken] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    // Check if localStorage is available (in a browser environment)
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <div className={`menu-items md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
            <Link href="/apartments">
              <p>Our Apartments</p>
            </Link>
            <Link href="#premium">
              <p>Place in Jaipur</p>
            </Link>
            <Link href="/contact">
              <p>Contact</p>
            </Link>
            {token ? (
              <div className="profile-image">
                <Image src={userprofile} alt="profile" />
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
