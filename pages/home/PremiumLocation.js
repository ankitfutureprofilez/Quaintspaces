import React from 'react';
import Image from "next/image";
import Vaishali from "../../public/images/jhotwara-1.jpg";
import Mansarovar from "../../public/images/jhotwara-2.jpg";
import Jhotwara from "../../public/images/jhotwara-3.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import 'swiper/css/scrollbar'; 
import { useSwiper } from 'swiper/react';
import SwiperCore, { Keyboard, Scrollbar, Navigation } from 'swiper';
// Install Swiper modules
SwiperCore.use([Keyboard, Scrollbar, Navigation]);

export default function PremiumLocation() {
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
  const swiper = useSwiper();

  return (
    <div className="premium-location-slider">
      <div className='container mx-auto '>
        <h1>Premium Location in Jaipur</h1>
        <div className="relative flex items-center ">
          <Swiper
            slidesPerView={3}
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
            navigation={true}
            className="mySwiper"
          >
            {images.map((reason, index) => (
              <SwiperSlide key={index}>
                <div className="item flex-shrink-0 mx-2 relative transition-transform duration-500 ease-in-out transform" key={index}>
                  <Image src={reason.src} alt={reason.alt} className="" />
                  <div className="w-full py-4">
                    <h2 className="location-name">{reason.text}</h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-next" onClick={() => swiper.slideNext()}></div>
          <div className="swiper-button-prev" onClick={() => swiper.slidePrev()}></div>
        </div>
      </div>
    </div>
  );
}
