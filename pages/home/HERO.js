import React from 'react'
import HeroBanner from './HeroBanner';
import Image from "next/image";

export default function HERO() {
   const images = [
      "/images/banner/Banner4.jpg",
      "/images/banner/Banner1.jpg",
      "/images/banner/Banner2.jpg",
      "/images/banner/Banner3.jpg",
    ];

  return <div className="overflow-hidden bg-cover bg-center nav-header-sec relative image-wrapper lg:!h-[670px] md:!h-[550px] sm:!h-[450px] !h-[350px]">
              <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {images && images.map((key, scr)=>{
                  return <SwiperSlide>
                      <div key={`image-banner-${key}`} className="relative w-full lg:h-[670px] md:h-[550px] sm:h-[450px] h-[350px]">
                          <Image
                            src={scr}
                            alt={`Banner 4`} className="w-full"
                            layout="responsive" width="100%" height="100%"
                            objectFit="cover" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <HeroBanner />
                          </div> 
                      </div>
                  </SwiperSlide>
              })}
            </Swiper>
        </div>
}
