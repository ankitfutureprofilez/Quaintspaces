import React, { useState } from 'react';
import Image from "next/image";
import Vaishali from "../../public/images/jhotwara-1.jpg";
import Mansarovar from "../../public/images/jhotwara-2.jpg";
import Jhotwara from "../../public/images/jhotwara-3.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper';

export default function PremiumLocation() {
  const images = [
    
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar ' },
    { src: Jhotwara, alt: 'Image 1', text: 'Malviya Nagar' },
    { src: Vaishali, alt: 'Image 2', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 1', text: 'Mansarovar ' },
    { src: Jhotwara, alt: 'Image 2', text: 'Malviya Nagar' },
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar ' },
    { src: Jhotwara, alt: 'Image 1', text: 'Malviya Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Vaishali Nagar' },
    { src: Vaishali, alt: 'Image 1', text: 'Mansarovar ' },
    { src: Jhotwara, alt: 'Image 2', text: 'Malviya Nagar' },
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar ' },
    { src: Vaishali, alt: 'Image 1', text: 'Malviya Nagar' },
    { src: Jhotwara, alt: 'Image 2', text: 'Vaishali Nagar' },
    // Add more images as needed
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="premium-location-slider">
      <div className='container mx-auto '>
        <h1>Premium Location in Jaipur</h1>
        <div className="relative flex items-center ">
        {/* <Swiper
              slidesPerView={3}
              spaceBetween={2}
            centeredSlides={false}
              autoplay={{
                delay: 1000, 
                disableOnInteraction: false,
              }}
              navigation={true}
            >
              {images.map((reason, index) => (
                <SwiperSlide key={index} >
                  <div  className="iteam flex-shrink-0 mx-2 relative transition-transform duration-500 ease-in-out transform" key={index}>
              <Image src={reason.src} alt={reason.alt} className="" />
 <div className="w-full py-4">
                <h2 className="loction-name">{reasons.text}</h2>
              </div>
                   
                  </div>
                </SwiperSlide>
              ))}
            </Swiper> */}
          {[currentSlide, (currentSlide + 1) % images.length, (currentSlide + 2) % images.length].map(index => (
            <div key={index} className="iteam flex-shrink-0 mx-2 relative transition-transform duration-500 ease-in-out transform">
              <Image src={images[index].src} alt={images[index].alt} className="" />
              <div className="w-full py-4">
                <h2 className="loction-name">{images[index].text}</h2>
              </div>
            </div>
          ))}
          <button onClick={prevSlide} className="absolute -left-5 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white px-2 py-1 rounded-l">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.90589 13.5428H24.685V10.4572L5.90589 10.4572L14.1815 2.18154L12 0L0 12L12 24L14.1815 21.8185L5.90589 13.5428Z" fill="white"/>
        </svg>

        </button>
        <button onClick={nextSlide} className="absolute -right-5 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white px-2 py-1 rounded-r">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.0941 13.5428H0.314991V10.4572L19.0941 10.4572L10.8185 2.18154L13 0L25 12L13 24L10.8185 21.8185L19.0941 13.5428Z" fill="white"/>
        </svg>

        </button>
        </div>
      </div>
    </div>
  
  );
}
