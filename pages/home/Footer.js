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
            <Link href="mailto:quaintspaces@gmail.com" target="_blank">
              <span className="capiatize">Email : </span>
              quaintspaces@gmail.com
            </Link>
            <Link href="tel:9521410122">
              <span className="capiatize">Mobile : </span>
              9521410122
            </Link>
          </div>
          {/* <p><Link href="tel:9314022666">9314022666</Link></p> */}
        </div>
        <div className="">
          <h3 className="menu-footer sm:mb-3"></h3>
          <div className="flex flex-col">
            <Link href="/terms">
              <span className="capiatize">Terms & Condition</span>
            </Link>
            <Link href="/policy">
              <span className="capiatize">Privacy Policy</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="mb-2">Follow Us</h3>
          <div className="">
            <Link href="https://www.facebook.com/share/64gvciqN2UNPMx6V/?mibextid=LQQJ4d">
              <div className="flex">
                <FaFacebook color={"#c48b58"} size={24} />
                <span className="ml-[2px]">: Quaint Spaces</span>
              </div>
            </Link>
            </div>
            <div className="mt-2">
            <Link href="https://www.instagram.com/quaintspacesjaipur">
              <div className="flex">
                <FaInstagram color={"#c48b58"} size={24} />
                <span className="ml-[2px]">: @quaintspacesjaipur</span>
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
