import React from "react";
import Image from "next/image";
import QsJaipur from "../../public/images/QsJaipur.png";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
      <div className="container mx-auto flex flex-col justify-between">
        {/* Logo and Brand */}
        <div className="footer-menu items-end">
          <div className="">
            <h3 className="menu-footer mb-3">CONTACT US</h3>
            <div className="flex flex-col">
            <Link href="mailto:quaintspaces@gmail.com" target="_blank">
            <span className="capiatize">Email : </span>
            quaintspaces@gmail.com</Link>
            <Link href="tel:9521410122">
            <span className="capiatize">Mobile : </span>
            9521410122
            </Link>
            </div>
            {/* <p><Link href="tel:9314022666">9314022666</Link></p> */}

          </div>
          <div className="mt-2">
            <p className="menu-footer ">
              <Link href="/terms">
                TERMS & CONDITION
              </Link></p> <p className="menu-footer">
              <Link href="/policy">
                PRIVACY POLICY
              </Link></p>
          </div>
          <div className="">
  <h3 className="mb-3">Follow Us</h3>
  <div className="">
    <Link href="/">
      <div className="flex">
        <FaFacebook color={"#c48b58"} size={28} />
        <span>: Follow us on Facebook</span>
      </div>
    </Link>
    <Link href="https://www.instagram.com/quaintspacesjaipur">
      <div className="flex">
        <FaInstagram color={"#c48b58"} size={28} />
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
