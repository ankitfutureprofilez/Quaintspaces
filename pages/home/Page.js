import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "../layout/Layout.js";
import Image from "next/image";
import Head from "next/head";
import PwaFooter from "../elements/PwaFooter.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReasonToVisit = dynamic(() => import("./ReasonToVisit.js"));
const HomeRoomsLists = dynamic(() => import("./HomeRoomsLists.js"));
const Testimonials = dynamic(() => import("./Testimonials.js"));
const HeroBanner = dynamic(() => import("./HeroBanner.js"));
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

  const images = [
    "/images/banner/Banner4.jpg",
    "/images/banner/Banner1.JPG",
    "/images/banner/Banner2.jpg",
    "/images/banner/Banner3.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000, // Adjusted autoplay speed for smoother transitions
    fade: true, // Adding fade transition effect
    cssEase: "ease-in-out", // Smooth easing function
    fade: true,
  };

  return (
    <Layout>
      <div>
        <Head>
          <title>Quaintspaces</title>
        </Head>
        <PwaFooter />
        <div className="bg-cover bg-center nav-header-sec relative image-wrapper lg:!h-[670px] md:!h-[550px] sm:!h-[450px] !h-[350px]">
          <Slider {...settings}>
            {images.map((item, index) => (
              <div key={index} className="relative w-full lg:h-[670px] md:h-[550px] sm:h-[450px] h-[350px]">
                <Image
                  src={item}
                  alt={`Banner ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <HeroBanner />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <LuxuryStay />
        <HomeRoomsLists />
        <Testimonials />
        <ReasonToVisit />
      </div>
    </Layout>
  );
}
