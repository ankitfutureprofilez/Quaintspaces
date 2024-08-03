import React, { useContext, useState } from "react";
import Image from "next/image";
import logologin from "../../public/images/Login_Logo.png";
import Link from "next/link";
import LoginLogic from "./LoginLogic";
import Head from "next/head";
import CheckAuth from "../signup/CheckAuth";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login - Quaint Spaces Jaipur</title>
      </Head>
      <CheckAuth />
      <div className="h-screen sm:min-h-screen  bg-cover  overflow-auto sm:max-h-[100vh]">
        <Image
          src="/images/banner/login_img.JPG"
          placeholder="blur"
          priority={true}
          blurDataURL="/images/banner/login_img.JPG?q=0.5"
          alt="Login Background"
          layout="responsive"
          width="1000"
          height="1000"
          objectFit="cover"
          className="fixed top-0 left-0 !w-full !h-full object-cover"
        />
        
        <div className="container h-full sm:flex items-center">
          <div className=" h-full sm:flex items-center m-auto">
            <div className="relative z-[1]">
              <div className="backtohome ms-2 lg:ms-0 ">
                <Link href="/">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <rect
                      x="0.5"
                      y="43.5"
                      width="43"
                      height="43"
                      rx="21.5"
                      transform="rotate(-90 0.5 43.5)"
                      stroke="white"
                    />{" "}
                    <path
                      d="M20.828 22.636L25.778 27.586L24.364 29L18 22.636L24.364 16.272L25.778 17.686L20.828 22.636Z"
                      fill="white"
                    />{" "}
                  </svg>
                  Homepage
                </Link>
              </div>

              <div className=" flex items-center signup-tab-sec">
                <div className="pt-[3vh] md:pt-0 left-logo-login w-6/12 px-3">
                  <Link href="/" className="cursor-pointer">
                    <Image src={logologin} alt="Quaint Spaces Jaipur logo" />
                  </Link>
                  <p>
                    Indulge in the finest and most charming accommodation in Jaipur!
                  </p>
                </div>
                <div className="w-full md:w-6/12">
                  <LoginLogic />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
