import React from "react";
import Image from "next/image";
import QsJaipur from "../../public/images/QsJaipur.png";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto flex flex-col justify-between items-center">
        {/* Logo and Brand */}
        <div className="footer-menu">
          <div className="flex items-left space-x-4">
            <Link href="/">
              <FaFacebook color={"#c48b58"} size={28} />
            </Link>
            <Link href="https://www.instagram.com/quaintspacesjaipur">
              <FaInstagram color={"#c48b58"} size={28} />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="ml-auto flex space-x-4">
            <Link href="/contact">
              <p className="menu-footer">CONTACT US</p>
            </Link>
            <Link href="/terms">
              <p className="menu-footer">TERMS & CONDITION</p>
            </Link>
            <Link href="/policy">
              <p className="menu-footer">PRIVACY POLICY</p>
            </Link>
          </nav>
        </div>

        <div className="text-center copy-right">
          {/* Copyright Notice */}
          <span>&copy; QUAINTSPACES JAIPUR 2024</span>
        </div>
      </div>
    </footer>
  );
}
