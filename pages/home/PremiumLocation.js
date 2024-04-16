import React, { useState } from 'react';
import Image from "next/image";
import Vaishali from "../../public/images/jhotwara-1.jpg";
import Mansarovar from "../../public/images/jhotwara-2.jpg";
import Jhotwara from "../../public/images/jhotwara-3.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import 'swiper/css/scrollbar'; 
// import SwiperCore, { Keyboard, Scrollbar, Navigation } from 'swiper';
// Install Swiper modules
// SwiperCore.use([Keyboard, Scrollbar, Navigation]);

export default function PremiumLocation() {
  const [swiper, setSwiper] = useState(null);

  const images = [
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar ' },
    { src: Jhotwara, alt: 'Image 1', text: 'Malviya Nagar' },
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar ' },
    { src: Jhotwara, alt: 'Image 1', text: 'Malviya Nagar' },
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar ' },
    { src: Jhotwara, alt: 'Image 1', text: 'Malviya Nagar' },
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar ' },
    { src: Jhotwara, alt: 'Image 1', text: 'Malviya Nagar' },
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar ' },
    { src: Jhotwara, alt: 'Image 1', text: 'Malviya Nagar' },
  ];

  const handleSwiper = (swiper) => {
    setSwiper(swiper);
  };

  const slideNext = () => {
    if (swiper) swiper.slideNext();
  };

  const slidePrev = () => {
    if (swiper) swiper.slidePrev();
  };

  return (
    <div className="premium-location-slider z-0" id="premium">
      <div className='container mx-auto '>
        <h1>Premium Location in Jaipur</h1>
        <div className="relative flex items-center ">
          <Swiper
            slidesPerView={1}
            centeredSlides={false}
            slidesPerGroupSkip={1}
            grabCursor={true}
            keyboard={{
              enabled: true,
            }}
            breakpoints={{
              769: {
                slidesPerView: 3,
                slidesPerGroup: 1,
              },
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            className="mySwiper"
            onSwiper={handleSwiper}
          >
            {images.map((reason, index) => (
              <SwiperSlide key={index}>
                <div className="item flex-shrink-0 mx-2 relative transition-transform duration-500 ease-in-out transform" key={index}>
                  <Image src={reason?.src} alt={reason?.alt} className="" loading="lazy"/>
                  <div className="w-full py-4">
                    <h2 className="location-name">{reason?.text}</h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button  name="next" title='next' onClick={slideNext} className="text-[0px] absolute -right-5 z-10 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white px-2 py-1 rounded-r">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.0941 13.5428H0.314991V10.4572L19.0941 10.4572L10.8185 2.18154L13 0L25 12L13 24L10.8185 21.8185L19.0941 13.5428Z" fill="white"/>
        </svg>
         Next Button 
          </button>
          <button name="previous" title='previous' className="text-[0px] absolute -left-5 z-10 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white px-2 py-1 rounded-r" onClick={slidePrev}>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.90589 13.5428H24.685V10.4572L5.90589 10.4572L14.1815 2.18154L12 0L0 12L12 24L14.1815 21.8185L5.90589 13.5428Z" fill="white"/>
        </svg>
        Previous Button 
          </button>
        </div>
      </div>
    </div>
  );
}
