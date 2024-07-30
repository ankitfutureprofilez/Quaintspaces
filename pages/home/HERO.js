import React from 'react'
import HeroBanner from './HeroBanner';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import dynamic from 'next/dynamic';
import 'swiper/css/pagination';
export default function HERO() {
   const images = [
      "/images/banner/Banner4.jpg",
      "/images/banner/Banner1.jpg",
      "/images/banner/Banner2.jpg",
      "/images/banner/Banner3.jpg",
    ];

  return <>
    <div className="overflow-hidden bg-cover bg-center nav-header-sec w-full relative image-wrapper lg:!h-[670px] md:!h-[550px] !h-[450px]">
      <Swiper   
      spaceBetween={0} 
      // autoplay={{ 
      //   delay: 2000, 
      //   disableOnInteraction: false,
      // }}
     loop={true}
      pagination={{
        clickable: true,
      }} 
      // navigation={true} 
      slidesPerView={1}
      modules={[Autoplay, Pagination]}
      className="mySwiper">
         <SwiperSlide>
              <div key={`image-banner-4`} className="relative w-full lg:h-[670px] md:h-[550px] h-[450px]">
                  <Image
                    src={'/images/banner/Banner4.jpg'}
                    alt={`Banner 4`} className="w-full h-full"
                    layout="fill" 
                    objectFit="cover" /> 
                  {/* <div className="absolute inset-0 flex items-center justify-center ">
                    <HeroBanner />
                  </div>  */}
              </div>
          </SwiperSlide>
         <SwiperSlide>
              <div key={`image-banner-1`} className="relative w-full lg:h-[670px] md:h-[550px] h-[450px]">
                  <Image
                    src={'/images/banner/Banner1.JPG'}
                    alt={`Banner 4`} className="w-full h-full"
                    layout="fill" 
                    objectFit="cover" /> 
                  {/* <div className="absolute inset-0 flex items-center justify-center">
                    <HeroBanner />
                  </div>  */}
              </div>
          </SwiperSlide>
         <SwiperSlide>
              <div key={`image-banner-2`} className="relative w-full lg:h-[670px] md:h-[550px] h-[450px] ">
                  <Image
                    src={'/images/banner/Banner2.jpg'}
                    alt={`Banner 4`} className="w-full h-full"
                    layout="fill" 
                    objectFit="cover" /> 
                  {/* <div className="absolute inset-0 flex items-center justify-center">
                    <HeroBanner />
                  </div>  */}
              </div>
          </SwiperSlide>
         <SwiperSlide>
              <div key={`image-banner-3`} className="relative w-full lg:h-[670px] md:h-[550px] h-[450px]">
                  <Image
                    src={'/images/banner/Banner3.jpg'}
                    alt={`Banner 4`} className="w-full h-full"
                    layout="fill" 
                    objectFit="cover" /> 
              </div>
          </SwiperSlide>
    </Swiper>
      <div className="absolute z-[1] top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-full flex items-center justify-center">
        <HeroBanner />
      </div> 
    </div>
  </>
} 
// export default dynamic(()=>Promise.resolve(HERO), { ssr: false });
