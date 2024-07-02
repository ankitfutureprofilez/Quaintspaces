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
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const images = [
    // "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
  ];

  useEffect(() => {
    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(isMobileDevice);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 4 seconds

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
            blurDataURL={`${images[currentIndex]}?q=1`}
            src={images[currentIndex]}
            alt="QUAINTSPACES JAIPUR Background"
            layout="fill"
            objectFit="cover"
            style={{ zIndex: -1 }}
            priority={true}
            quality={isMobile ? 70 : 100}
          />
          <HeroBanner />
          <div className="flex justify-center relative bottom-[12px]">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full mx-[6px] ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-current={index === currentIndex}
                aria-label={`Slide ${index + 1}`}
                data-carousel-slide-to={index}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
          {/* <button
            type="button"
            className="absolute top-1/2 left-4 z-30 transform -translate-y-1/2 flex items-center justify-center h-10 w-10 bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/60 focus:outline-none focus:ring-4 focus:ring-white dark:focus:ring-gray-800/70"
            data-carousel-prev
            onClick={handlePrev}
          >
            <svg
              className="w-6 h-6 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-4 z-30 transform -translate-y-1/2 flex items-center justify-center h-10 w-10 bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/60 focus:outline-none focus:ring-4 focus:ring-white dark:focus:ring-gray-800/70"
            data-carousel-next
            onClick={handleNext}
          >
            <svg
              className="w-6 h-6 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button> */}
        </div>

        <LuxuryStay />
        <HomeRoomsLists />
        {/* <PremiumLocation /> */}
        <ReasonToVisit />
      </div>
    </Layout>
  );
}
