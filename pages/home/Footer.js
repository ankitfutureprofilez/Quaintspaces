import React from "react";
import Image from "next/image";
import QsJaipur from "../../public/images/QsJaipur.png";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  
  return (
    <div className="container mx-auto flex flex-col justify-between">
      {/* Logo and Brand */}
      <div className="footer-menu items-start sm:items-end gap-4 sm:gap-0">
        <div className="">
          <h3 className="menu-footer mb-3">CONTACT US</h3>
          <div className="flex flex-col">
            <Link className="text-[#3F2A17] text-[16px] " href="mailto:quaintspaces@gmail.com" target="_blank">
              <span >Email : </span>
              quaintspaces@gmail.com
            </Link>
            <Link href="tel:9521410122">
              <span className="capiatize">Mobile : </span>
              9521410122
            </Link>
          <Link href="tel:9314022666">
              <span className="capiatize">Mobile : </span>
          9314022666</Link>
          </div>
          
        </div>
        <div className="">
          <h3 className="menu-footer mb-3"></h3>
          <div className="flex flex-col">
            <Link href="/terms">
              <span className="text-[#3F2A17] text-[16px] uppercase">Terms & Condition</span>
            </Link>
            <Link href="/policy">
              <span className="text-[#3F2A17] text-[16px] uppercase">Privacy Policy</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="uppercase mb-3 text-[20px] text[#3F2A17] font-[400] font-['Baskervville']">Follow Us</h3>
          <div className="">
            <Link href="https://www.facebook.com/share/64gvciqN2UNPMx6V/?mibextid=LQQJ4d">
              <div className="flex">
                <FaFacebook color={"#c48b58"} size={24} />
                <span>: Follow us on Facebook</span>
              </div>
            </Link>
            </div>
            <div className="mt-2">
            <Link href="https://www.instagram.com/quaintspacesjaipur">
              <div className="flex">
                <FaInstagram color={"#c48b58"} size={24} />
                <span>: @quaintspacesjaipur</span>
              </div>
            </Link>
            </div>          
        </div>
      </div>

      <div className="text-center copy-right">
        {/* Copyright Notice */}
        <span>&copy; QUAINTSPACES JAIPUR 2024</span>
      </div>
    </div>
  );
}
