import React from 'react'
import Image from "next/image";
import QsJaipur from "../../public/images/QsJaipur.png";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="p-4 bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto flex flex-col justify-between items-center">
        {/* Logo and Brand */}
        <div className='flex py-8'>
        <div className="flex items-left space-x-4">
          <Image src={QsJaipur} alt="QS Jaipur Logo" width={80} height={80} />
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4 align-left">
          <Link href=""><p className="text-gray-600 hover:text-blue-500">OUR APARTMENTS</p></Link>
          <Link href=""><p className="text-gray-600 hover:text-blue-500">CONTACT US</p></Link>
          <Link href=""><p className="text-gray-600 hover:text-blue-500">TERMS & CONDITION</p></Link>
          <Link href=""><p className="text-gray-600 hover:text-blue-500">PRIVACY POLICY</p></Link>
        </nav>
        </div>
        <div className=''>
        {/* Copyright Notice */}
        <span className="text-gray-500">&copy; QUAINTSPACES JAIPUR 2024</span>
        </div>
      </div>
    </footer>
  );
}
