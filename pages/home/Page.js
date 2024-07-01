import React, { useEffect, useState } from "react";
import Header from "./Header.js";
import HeroBanner from "./HeroBanner.js";
import LuxuryStay from "./LuxuryStay.js";
import dynamic from "next/dynamic";
const PremiumLocation = dynamic(() => import("./PremiumLocation.js"));
const ReasonToVisit = dynamic(() => import("./ReasonToVisit.js"));
const HomeRoomsLists = dynamic(() => import("./HomeRoomsLists.js"));
import Layout from "../layout/Layout.js";
import Image from "next/image";
import Head from "next/head";
import PwaFooter from "../elements/PwaFooter.js";

export default function MainPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Added state for currentImageIndex

  const images = [
    "/images/HeaderImg.png",
    "/images/tip-top-1.jpg",
    "/images/tip-top-2.jpg",
    "/images/tip-top-3.jpg",
  ];

  useEffect(() => {
    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;
    setIsMobile(isMobileDevice);
  }, []); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div>
        <Head>
          <title>QS Jaipur</title>
        </Head>
        <PwaFooter />
        <div className="bg-cover bg-center nav-header-sec relative image-wrapper">
          <Image
            blurDataURL={`${images[currentImageIndex]}?q=1`}
            src={images[currentImageIndex]} 
            alt="QUAINTSPACES JAIPUR Background"
            layout="fill"
            objectFit="cover"
            style={{ zIndex: -1 }}
            priority={true}
            quality={isMobile ? 70 : 100}
          />
          <HeroBanner />
        </div>
        <LuxuryStay />
        <HomeRoomsLists />
        {/* <PremiumLocation /> */}
        <ReasonToVisit />
      </div>
    </Layout>
  );
}
