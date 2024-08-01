import React from "react";
import Button from "../elements/Button";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <div className="justify-center items-center flex flex-col hero-sec px-2">
      <h1>Discover Your Perfect Getaway with Us</h1>
      <p className="max-w-[800px] m-auto text-center">
        Experience the comfort and convenience of home, no matter where you are.
      Our properties are fully equipped to ensure a seamless stay.
      </p>
      <Link href="/apartments">
        <Button
          text={"EXPLORE APARTMENTS"}
          design={
            "font-inter text-base font-medium leading-tight text-center text-white w-[405px] border-2 border-white p-[18px] rounded-[30px] hover:bg-[#efa3a3] hover:border-[#efa3a3]"
          }

          id="hero"
        />
      </Link>
    </div>
  );
}