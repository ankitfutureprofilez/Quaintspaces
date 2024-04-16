import React from "react";
import Header from "./Header.js";
import HeroBanner from "./HeroBanner.js";
import LuxuryStay from "./LuxuryStay.js";
import dynamic from "next/dynamic";
const PremiumLocation = dynamic(import("./PremiumLocation.js"));
const ReasonToVisit = dynamic(import("./ReasonToVisit.js"));
const HomeRoomsLists = dynamic(import("./HomeRoomsLists.js"));
import Layout from "../layout/Layout.js";
import Image from "next/image";
import Head from "next/head";
import PwaFooter from "../elements/PwaFooter.js";

export default function MainPage() {
  return (
    <Layout>
      <div>
        <Head>
          <title>QS Jaipur</title>
        </Head>
        <PwaFooter />
        <div className="bg-cover bg-center nav-header-sec relative">
          {/* Render the image using next/image */}
          <Image
            blurDataURL="/images/HeaderImg.png?q=1"
            src="/images/HeaderImg.png"
            alt="QUAINTSPACES JAIPUR Background"
            layout="fill"
            objectFit="cover"
            style={{ zIndex: -1 }}
            priority="true"
          />
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
