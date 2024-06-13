import React from "react";
import Button from "../elements/Button";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <div className="justify-center items-center flex flex-col hero-sec">
      <h1>Live the luxury in jaipur</h1>
      <p>Book the most luxuries and aesthetically pleasing place, Jaipur city has to offer</p>
      <Link href="#places">
      <Button text={"EXPLORE APARTMENTS"} design={"font-inter text-base font-medium leading-tight text-center text-white w-[405px] border-2 border-white p-[18px] rounded-[30px] hover:bg-[#c48b58] hover:border-[#c48b58]"} id="hero" />
      </Link>
    </div>
  );
}