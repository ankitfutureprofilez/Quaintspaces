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
          <div className="w-4/12">
              <h3 className="menu-footer mb-3">CONTACT US</h3>
              <p><Link href="gg"> info@airbnb.com</Link></p>
              <p><Link href="gg"> 9988776655</Link></p>
          </div>
          <nav className="w-4/12">
          <p className="menu-footer ">
            <Link href="/terms">
              TERMS & CONDITION
            </Link></p> <p className="menu-footer">
            <Link href="/policy">
             PRIVACY POLICY
            </Link></p>
          </nav>
          <div className="w-4/12">
            <h3 className="menu-footer mb-3">Follow US</h3>
            <p className="flex"><Link href="/">
              <FaFacebook color={"#E0C4C3"} size={28} className="mr-3" />
            </Link>
            <Link href="https://www.instagram.com/quaintspacesjaipur">
              <FaInstagram color={"#E0C4C3"} size={28} />
            </Link></p>
          </div>
        </div>

        <div className="text-center copy-right">
          {/* Copyright Notice */}
          <span>&copy; QUAINTSPACES JAIPUR 2024</span>
        </div>
      </div>
    </footer>
  );
}
