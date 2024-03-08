import React from 'react'
import Image from "next/image";
import QsJaipur from "../../public/images/QsJaipur.png";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer >
  <div className="container mx-auto flex flex-col justify-between items-center">
    {/* Logo and Brand */}
    <div className='footer-menu'>
      <div className="flex items-left space-x-4">
        <Image src={QsJaipur} alt="QS Jaipur Logo" width={80} height={80} />
      </div>

      {/* Navigation Links */}
      <nav className="ml-auto flex space-x-4">
        <Link href=""><p className="menu-footer">OUR APARTMENTS</p></Link>
        <Link href=""><p className="menu-footer">CONTACT US</p></Link>
        <Link href=""><p className="menu-footer">TERMS & CONDITION</p></Link>
        <Link href=""><p className="menu-footer">PRIVACY POLICY</p></Link>
      </nav>
    </div>

    <div className='text-center copy-right'>
      {/* Copyright Notice */}
      <span className="text-gray-500">&copy; QUAINTSPACES JAIPUR 2024</span>
    </div>
  </div>
</footer>

  );
}
