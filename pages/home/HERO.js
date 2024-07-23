import React from 'react'
import Slider from "react-slick";
import HeroBanner from './HeroBanner';
import Image from "next/image";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export default function HERO() {
   const images = [
      "/images/banner/Banner4.jpg",
      "/images/banner/Banner1.jpg",
      "/images/banner/Banner2.jpg",
      "/images/banner/Banner3.jpg",
    ];
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1, 
      slidesToScroll: 1
    };

  return (
      <div className="overflow-hidden bg-cover bg-center nav-header-sec relative image-wrapper lg:!h-[670px] md:!h-[550px] sm:!h-[450px] !h-[350px]">
          <Slider {...settings} > 
              {images && images.map((key, scr)=>{
                return <div key={`image-banner-${key}`} className="relative w-full lg:h-[670px] md:h-[550px] sm:h-[450px] h-[350px]">
                  <Image
                     src={scr}
                     alt={`Banner 4`} className="w-full"
                     layout="responsive" width="100%" height="100%"
                     objectFit="cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <HeroBanner />
                  </div> 
              </div>
              })}
          </Slider>
        </div>
  )
}
