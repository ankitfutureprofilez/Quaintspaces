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
      <title>Login - Quaintspaces Jaipur</title>
    </Head>
    <CheckAuth />
    <div
      className="h-screen sm:min-h-screen sm:flex items-center bg-cover overflow-auto sm:max-h-[100vh]">
      <Image  src="/images/banner/login_img.JPG"
          blurDataURL="/images/banner/login_img.JPG?q=1"
          placeholder="blur"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
          className="z-[-1]"  />

      <div className="container ">
        <div className=" flex items-center relative signup-tab-sec">
          <div className="pt-[3vh] md:pt-0 left-logo-login w-6/12 px-3">
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
                Homepage
              </Link>
            </div>
            <Link href="/" className="cursor-pointer">
                <Image src={logologin} alt="Quaintspaces Jaipur logo" />
            </Link>
            {/* <Image src={logologin} alt="Quaintspaces Jaipur logo" /> */}
            <p>
            Indulge in the finest and most charming accommodation in Jaipur!
            </p>
          </div>
          <div className="w-full md:w-6/12">
          <LoginLogic/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}