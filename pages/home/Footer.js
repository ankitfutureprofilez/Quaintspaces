import React from "react";
import Image from "next/image";
import QsJaipur from "../../public/images/QsJaipur.png";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="container mx-auto flex flex-col justify-between">
      {/* Logo and Brand */}
      <div className="items-start footer-menu ">
        <div className="w-full mb-3 mb:mb-0">
          <h3 className="mb-2 text-[20px] text[#3F2A17] font-[400] font-['Baskervville']">CONTACT US</h3>
          <div className="flex flex-col">
            <Link className="text-[#3F2A17] text-[16px] " href="mailto:quaintspaces@gmail.com" target="_blank">
              <span >Email : </span>
              quaintspaces@gmail.com
            </Link>
            <Link className="text-[#3F2A17] text-[16px] uppercase" href="tel:9521410122">
              <span >Mobile : </span>
              9521410122
            </Link>
            <Link className="text-[#3F2A17] text-[16px] uppercase" href="tel:9314022666">
              <span >Mobile : </span>
              9314022666
            </Link>
          </div>
          {/* <p><Link href="tel:9314022666">9314022666</Link></p> */}
        </div>
        <div className="w-full mb-3 mb:mb-0">
        <h3 className="uppercase mb-2 text-[20px] text[#3F2A17] font-[400] font-['Baskervville']">Quick Links</h3>
          <div className="flex flex-col">
            <Link href="/terms">
              <span className="text-[#3F2A17] text-[16px] uppercase">Terms & Condition</span>
            </Link>
            <Link href="/policy">
              <span className="text-[#3F2A17] text-[16px] uppercase">Privacy Policy</span>
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-col mb-3 mb:mb-0">
          <h3 className="uppercase mb-2 text-[20px] text[#3F2A17] font-[400] font-['Baskervville']">Follow Us</h3>
          <div className="">
            <Link href="https://www.facebook.com/share/64gvciqN2UNPMx6V/?mibextid=LQQJ4d" target="_blank">
              <div className="flex">
                <FaFacebook color={"#3F2A17"} size={24} />
                <span className="text-[#3F2A17] text-[16px] uppercase ml-2">: Follow us on Facebook</span>
              </div>
            </Link>
            </div>
            <div className="mt-2">
            <Link href="https://www.instagram.com/quaintspacesjaipur" target="_blank">
              <div className="flex">
                <FaInstagram color={"#3F2A17"} size={24} />
                <span className="text-[#3F2A17] text-[16px] uppercase ml-2">: @quaintspacesjaipur</span>
              </div>
            </Link>
            </div>          
        </div>
      </div>


      <div className="text-center copy-right">
        {/* Copyright Notice */}
        <span>&copy; Quaintspaces Jaipur 2024</span>
      </div>
    </div>
  );
}