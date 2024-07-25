import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

export default function Footer() {
  return (
    <div className="w-full flex flex-col justify-between bg-[#E5E5E5]">
      <div className="container mx-auto">
      {/* Logo and Brand */}
      <div className="items-end footer-menu ">
        <div className="w-full mb-3 mb:mb-0">
          <h3 className="mb-2 text-[20px] text[#3F2A17] font-[400] font-['Baskervville'] capitalize underline">Contact Us</h3>
          <div className="flex flex-col">
            <Link className="text-[#3F2A17] text-[16px] flex " href="mailto:quaintspaces@gmail.com" target="_blank">
                <TfiEmail size={22} color={"#3F2A17"} />
              <span className="text-[#3F2A17] text-[16px]  ml-2" >
                :  quaintspaces@gmail.com
              </span>
            </Link>
            <div className="flex mt-2 ">
              <Link className="text-[#3F2A17] text-[16px] flex" href="tel:+919521410122">
                <MdOutlinePhone size={24} color={"#3F2A17"} />
                <span className="text-[#3F2A17] text-[16px]  ml-2" >
                  +91 9521410122
                </span>
              </Link> &nbsp;/
              <Link className="text-[#3F2A17] text-[16px] " href="tel:+919314022666">
                <span className="text-[#3F2A17] text-[16px]  ml-2">
                  +91  9314022666
                </span>
              </Link>
            </div>

          </div>
          {/* <p><Link href="tel:9314022666">9314022666</Link></p> */}
        </div>
        <div className="w-full mb-3 mb:mb-0">
          <h3 className="uppercase mb-2 text-[20px] text[#3F2A17] font-[400] font-['Baskervville'] capitalize"> </h3>
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
          <h3 className="uppercase mb-2 text-[20px] text[#3F2A17] font-[400] font-['Baskervville'] capitalize underline">Follow Us</h3>
          <div className="">
            <Link href="https://www.facebook.com/share/64gvciqN2UNPMx6V/?mibextid=LQQJ4d" target="_blank">
              <div className="flex">
                <FaFacebook color={"#3F2A17"} size={24} />
                <span className="text-[#3F2A17] text-[16px] capitalize ml-2">: Quaint Spaces</span>
              </div>
            </Link>
          </div>
          <div className="mt-2">
            <Link href="https://www.instagram.com/quaintspacesjaipur" target="_blank">
              <div className="flex">
                <FaInstagram color={"#3F2A17"} size={24} />
                <span className="text-[#3F2A17] text-[16px] ml-2">: @quaintspacesjaipur</span>
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
    </div>
  );
}