import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function ReasonToVisit() {
  const reasons = [
    'Smart Television',
    'Laundry',
    'Complimentary internet',
    'Speakers',
    'Ironing',
    'Microwave',
    'Geyser'
  ];

  return (
    <>
      <div className="visit-us-sec" style={{ backgroundImage: `url(/images/visitbg.jpg)` }}>
        <div className='container mx-auto'>
          <h2>Reason to Visit US</h2>
          <div className="smart-box">
            <Swiper
              slidesPerView={2}
              spaceBetween={30}
            centeredSlides={false}
              autoplay={{
                delay: 1000, 
                disableOnInteraction: false,
              }}
              breakpoints={{
                769: {
                  slidesPerView: 4,
                  slidesPerGroup: 1,
                },
              }}
            >
              {reasons.map((reason, index) => (
                <SwiperSlide key={index} >
                  <div className="iteam">
                    <h3>{reason}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
