import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 767);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    // E5E5E5
    <>
      {isMobile ? (
        <div className="w-full  flex flex-col justify-between bg-[#f2f2f2]">
          <div className="container mx-auto">
            {/* Logo and Brand */}
            <div className="items-end footer-menu ">
              <div className="w-full lg:w-1/3 mb-3 mb:mb-0 xl:text-start text-center">
                <h3 className="mb-[5px] text-[20px] text[#3F2A17] font-[400] font-['Baskervville'] capitalize">
                  Contact Us
                </h3>
                <div className="w-[80px] h-[2px] mx-auto xl:mx-[0] bg-[#efa3a3] mb-[15px]"></div>
                <div className="flex flex-col">
                  <a
                    className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] flex justify-center xl:justify-start"
                    href="mailto:quaintspaces@gmail.com"
                    target="_blank"
                  >
                    <TfiEmail size={16} className="mt-[2px]" color={"#3F2A17"} />
                    <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px]  ml-2">
                      : quaintspaces@gmail.com
                    </span>
                  </a>
                  <div className="flex mt-2 justify-center xl:justify-start">
                    <a
                      className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] flex justify-center md:justify-start"
                      href="tel:+919521410122"
                    >
                      <MdOutlinePhone className="mt-[2px]" size={18} color={"#3F2A17"} />
                      <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] ">
                        : +91 9521410122
                      </span>
                    </a>&nbsp;/&nbsp;
                    <a
                      className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] "
                      href="tel:+919314022666">
                      <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px]">
                        +91 9314022666
                      </span>
                    </a>
                  </div>
                </div>
                {/* <p><Link href="tel:9314022666">9314022666</Link></p> */}
              </div>

              <div className="flex w-full lg:w-1/3 flex-col mb-3 mb:mb-0 text-center xl:text-start">
                <h3 className="uppercase mb-[5px] text-[20px] text[#3F2A17] font-[400] font-['Baskervville'] capitalize">
                  Follow Us
                </h3>
                <div className="w-[80px] h-[2px] mx-auto xl:mx-[0] bg-[#efa3a3] mb-[15px]"></div>
                <div className="">
                  <a
                    href="https://www.facebook.com/share/64gvciqN2UNPMx6V/?mibextid=LQQJ4d"
                    target="_blank"
                  >
                    <div className="flex justify-center xl:justify-start">
                      <FaFacebook color={"#3F2A17"} size={24} />
                      <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] capitalize ml-2">
                        : Quaint Spaces
                      </span>
                    </div>
                  </a>
                </div>
                <div className="mt-2">
                  <a
                    href="https://www.instagram.com/quaintspacesjaipur/"
                    target="_blank"
                  >
                    <div className="flex justify-center xl:justify-start">
                      <FaInstagram color={"#3F2A17"} size={24} />
                      <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] ml-2">
                        : @quaintspacesjaipur
                      </span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="w-full lg:w-1/3 mb-3 mt-1  mb:mb-0 text-center xl:text-start">

                {/* <div className="w-[80px] h-[2px] mx-auto xl:mx-[0] bg-[#efa3a3] mb-[15px]"></div> */}
                <div className="flex flex-col">
                  <Link href="/terms">
                    <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] ">
                      Terms & Conditions
                    </span>
                  </Link>
                  <Link href="/policy" className="mt-2">
                    <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] ">
                      Privacy Policy
                    </span>
                  </Link>
                </div>
              </div>

            </div>

            <div className="text-center copy-right">
              {/* Copyright Notice */}
              <span>&copy; Quaint Spaces Jaipur, 2024</span>
            </div>
          </div>
        </div>
      ) : (

        <div className="w-full  flex flex-col justify-between bg-[#f2f2f2]">
          <div className="container mx-auto">
            {/* Logo and Brand */}
            <div className="items-end footer-menu ">
              <div className="w-full lg:w-1/3 mb-3 mb:mb-0 xl:text-start text-center">
                <h3 className="mb-[5px] text-[20px] text[#3F2A17] font-[400] font-['Baskervville'] capitalize">
                  Contact Us
                </h3>
                <div className="w-[80px] h-[2px] mx-auto xl:mx-[0] bg-[#efa3a3] mb-[15px]"></div>
                <div className="flex flex-col">
                  <a
                    href="mailto:quaintspaces@gmail.com"
                    target="_blank" 
                    className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] flex justify-center xl:justify-start"
                  >
                    <TfiEmail size={18} color={"#3F2A17"} className="mt-1" />
                    <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px]  ml-2">
                      : quaintspaces@gmail.com 
                    </span>
                  </a>
                  <div className="flex mt-2 justify-center xl:justify-start">
                    <a
                      className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] flex justify-center md:justify-start"
                      href="tel:+919521410122"
                    >
                      <MdOutlinePhone size={20} color={"#3F2A17"} className="mt-1" />
                      <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px]  ml-2">
                        : +91 9521410122
                      </span>
                    </a> &nbsp;/
                    <a
                      className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] "
                      href="tel:+919314022666"
                    >
                      <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px]  ml-2">
                        +91 9314022666
                      </span>
                    </a>
                  </div>
                </div>
                {/* <p><Link href="tel:9314022666">9314022666</Link></p> */}
              </div>
              <div className="w-full lg:w-1/3 mb-3 mb:mb-0 text-center xl:text-start">

                {/* <div className="w-[80px] h-[2px] mx-auto xl:mx-[0] bg-[#efa3a3] mb-[15px]"></div> */}
                <div className="flex flex-col">
                  <Link href="/terms">
                    <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] ">
                      Terms & Conditions
                    </span>
                  </Link>
                  <Link href="/policy" className="mt-2">
                    <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] ">
                      Privacy Policy
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex w-full lg:w-1/3 flex-col mb-3 mb:mb-0 text-center xl:text-start">
                <h3 className="uppercase mb-[5px] text-[20px] text[#3F2A17] font-[400] font-['Baskervville'] capitalize">
                  Follow Us
                </h3>
                <div className="w-[80px] h-[2px] mx-auto xl:mx-[0] bg-[#efa3a3] mb-[15px]"></div>
                <div className="">
                  <Link
                    href="https://www.facebook.com/share/64gvciqN2UNPMx6V/?mibextid=LQQJ4d"
                    target="_blank"
                  >
                    <div className="flex justify-center xl:justify-start">
                      <FaFacebook color={"#3F2A17"} size={24} />
                      <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] capitalize ml-2">
                        : Quaint Spaces
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href="https://www.instagram.com/quaintspacesjaipur/"
                    target="_blank"
                  >
                    <div className="flex justify-center xl:justify-start">
                      <FaInstagram color={"#3F2A17"} size={24} />
                      <span className="text-[#3F2A17] text-[14px] lg:text-[14px] xl:text-[16px] ml-2">
                        : @quaintspacesjaipur
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center copy-right">
              {/* Copyright Notice */}
              <span>&copy; Quaint Spaces Jaipur, 2024</span>
            </div>
          </div>
        </div>
      )
      }


    </>

  );
}