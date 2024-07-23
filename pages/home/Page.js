import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "../layout/Layout.js";
import Head from "next/head";
import PwaFooter from "../elements/PwaFooter.js";
const ReasonToVisit = dynamic(() => import("./ReasonToVisit.js"),{ ssr: false });
const HomeRoomsLists = dynamic(() => import("./HomeRoomsLists.js"),{ ssr: false });
const Testimonials = dynamic(() => import("./Testimonials.js"),{ ssr: false });
const LuxuryStay = dynamic(() => import("./LuxuryStay.js"),{ ssr: false });
const HERO = dynamic(() => import('./HERO.js'), { ssr: false });

 function MainPage() {
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
export default MainPage;
