import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-transparent shadow ">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize">

      <Link href="/">
          <p className="mx-1.5 sm:mx-6">
            QSJaipur
          </p>
        </Link>

        <Link href="/">
          <p className="text-gray-800 border-b-2 border-blue-500 mx-1.5 sm:mx-6">
            home
          </p>
        </Link>

        <Link href="/apartments">
          <p className="border-b-2 border-transparent hover:text-gray-800 hover:border-blue-500 mx-1.5 sm:mx-6">
            Our Apartments
          </p>
        </Link>

        <Link href="/places">
          <p className="border-b-2 border-transparent hover:text-gray-800 hover:border-blue-500 mx-1.5 sm:mx-6">
            Place in Jaipur
          </p>
        </Link>

        <Link href="/contact">
          <p className="border-b-2 border-transparent hover:text-gray-800 hover:border-blue-500 mx-1.5 sm:mx-6">
            Contact
          </p>
        </Link>
{/* Buttons are present in seperate div */}
        <div>
          <Link href="/login">
            <button className="bg-transparent mx-3">Login</button>
          </Link>
          <Link href="/signup">
            <button className="bg-orange-500 text-white">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
