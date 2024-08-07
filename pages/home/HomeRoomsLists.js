import React, { useEffect, useState } from "react";
import Link from "next/link";
import Tiptop1 from "../../public/images/tip-top-1.jpg";
import RoomListings from "./RoomListings";

export default function Card() {
  const [categories, setCategories] = useState({
    loading: true,
    data: [],
  });

  return (
    <div className="tip-top-sec" id="places">
      <div className="container">
        <h2 className="listing-heading text-center mb-14">
          Stylish Apartments for Your Dream Vacation
        </h2>
        <RoomListings />
        {/* <div className="load-more-btn w-full flex justify-center lg:mt-6">
          <Link href="/apartments" className="block">Show All</Link>
        </div> */}

        <div className="flex justify-center mt-6">
          <Link
            href="/apartments"
            className="bg-[#efa3a3] text-[#fff] text-[13px] md:text-[16px] border border-[#efa3a3] px-[30px] py-[12px] flex rounded-full hover:text-[#efa3a3] hover:bg-[#ffffff00]"
          >
            <span className="font-base uppercase"> Show All </span>
            {/* <GoArrowRight size={20} /> */}
          </Link>
        </div>
      </div>
    </div>
  );
}
