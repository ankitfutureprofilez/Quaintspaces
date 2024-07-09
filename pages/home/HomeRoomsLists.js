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
        <div className="load-more-btn">
          <Link href="/apartments">Show All</Link>
        </div>
      </div>
    </div>
  );
}
