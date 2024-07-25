import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "../layout/Layout.js";
import Head from "next/head";
import PwaFooter from "../elements/PwaFooter.js";
import HERO from "./HERO.js";
const ReasonToVisit = dynamic(() => import("./ReasonToVisit.js"));
const HomeRoomsLists = dynamic(() => import("./HomeRoomsLists.js"));
const Testimonials = dynamic(() => import("./Testimonials.js"), {ssr: false});
const LuxuryStay = dynamic(() => import("./LuxuryStay.js"));
 
export default function MainPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <Layout>
      <div>
        <Head>
          <title>Quaint Spaces</title>
        </Head>
        <PwaFooter />
        <HERO />
        <LuxuryStay />
        <HomeRoomsLists />
        <Testimonials />
        <ReasonToVisit />
      </div>
    </Layout>
  );
}
