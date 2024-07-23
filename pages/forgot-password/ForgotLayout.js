import React, { useContext, useState } from "react";
import Link from "next/link";

export default function ForgotLayout({ children, showHeader }) {
  return (
    <>
      <div
        className="h-screen tab-mob-height"
        style={{ backgroundImage: `url(/images/banner/login_img.JPG)` ,backgroundPosition: "center",
          backgroundSize: "cover"
         }}
      >
        <div className="container h-full">
          <div className="flex items-center  h-full relative signup-tab-sec">
            {
              showHeader == true
                ?
                <div className="backtohome">
                  <Link href="/">
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="43.5"
                        width="43"
                        height="43"
                        rx="21.5"
                        transform="rotate(-90 0.5 43.5)"
                        stroke="white"
                      />
                      <path
                        d="M20.828 22.636L25.778 27.586L24.364 29L18 22.636L24.364 16.272L25.778 17.686L20.828 22.636Z"
                        fill="white"
                      />
                    </svg>
                    HOMEPAGE
                  </Link>
                </div>
                :
                null
            }
            <div className=" align-center mx-auto sm:w-6/12 w-full  px-3">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
