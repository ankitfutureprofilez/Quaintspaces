import React from 'react';
import Image from "next/image";
import Vaishali from "../../public/images/jhotwara-1.jpg";
import Mansarovar from "../../public/images/jhotwara-2.jpg";
import Jhotwara from "../../public/images/jhotwara-3.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

export default function PremiumLocation() {
  const images = [
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar' },
    { src: Jhotwara, alt: 'Image 3', text: 'Malviya Nagar' },
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar' },
    { src: Jhotwara, alt: 'Image 3', text: 'Malviya Nagar' },
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar' },
    { src: Jhotwara, alt: 'Image 3', text: 'Malviya Nagar' },
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar' },
    { src: Jhotwara, alt: 'Image 3', text: 'Malviya Nagar' },
    { src: Vaishali, alt: 'Image 1', text: 'Vaishali Nagar' },
    { src: Mansarovar, alt: 'Image 2', text: 'Mansarovar' },
    { src: Jhotwara, alt: 'Image 3', text: 'Malviya Nagar' },
  ];

  return (
    <div className="premium-location-slider z-0" id="premium">
      <div className='container mx-auto'>
        <h1>Premium Location in Jaipur</h1>
        <div className="relative flex items-center">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            slidesPerView={1}
            centeredSlides={false}
            slidesPerGroupSkip={1}
            grabCursor={true}
            keyboard={{ enabled: true }}
            breakpoints={{
              769: {
                slidesPerView: 3,
                slidesPerGroup: 1,
              },
            }}
            className="mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="item flex-shrink-0 mx-2 relative transition-transform duration-500 ease-in-out transform">
                  <Image src={image.src} alt={image.alt} loading="lazy" />
                  <div className="w-full py-4">
                    <h2 className="location-name">{image.text}</h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
