import React from "react";
import Header from "./Header.js";
import HeroBanner from "./HeroBanner.js";
import LuxuryStay from "./LuxuryStay.js";
import dynamic from 'next/dynamic'
const PremiumLocation = dynamic(import("./PremiumLocation.js"));
const ReasonToVisit = dynamic(import("./ReasonToVisit.js"));
import Footer from "./Footer.js";
import HomeRoomsLists from "./HomeRoomsLists.js";
import Layout from "../layout/Layout.js";

export default function MainPage() {
  return (
    <Layout>
      <div>
        <div
          className="bg-cover bg-center nav-header-sec"
          style={{ backgroundImage: `url(/images/HeaderImg.png)` }}
        >
          <HeroBanner />
          
        </div>
        <LuxuryStay />
        <HomeRoomsLists />
        <PremiumLocation />
        <ReasonToVisit />
      </div>
    </Layout>
  );
}
