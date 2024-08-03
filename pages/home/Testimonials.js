import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';
import StartRating from '../elements/StartRating'; // Ensure you have this component
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
export default function Testimonials() {
  const testimonials = [
    {
      image: "/images/banner/Banner2.jpg",
      id: 1,
      title: 'Quaint Suite',
      name: 'Simran',
      star: 5,
      message: 'An absolutely flawless stay. Everything was so tastefully done, the interiors were a work of art. Truly a gem. The beds were super comfortable, loved the mattress. The TV, speakers and of course the highlight was the bath tub. We had such a memorable stay that I am looking forward to coming back. The host and his team were very responsive and super nice, special shout out to Arjun. Worth every single penny.'
    },
    {
      id: 2,
      image: "/images/banner/Banner3.jpg",
      title: 'Quaint Stay',
      name: 'Devayani',
      star: 5,
      message:"The home, a well done  and the 2 bed matches the images on the listing perfectly. The home has great wifi and an aircon that also works as a heater (helped us stay warm through the harsh Jaipur winter.)The hosts were fantastic, stocking up the fridge with necessary amenities and also sending us a welcome package with treats!The location of the home was great, close to the city centre and about 15 mins from city palace, hawa mahal and the bapu and johri bazaar. Restaurants and bars are easily accessible from the property too!",
    },
    {
      image: "/images/banner/Banner1.JPG",
      id: 3,
      title: 'Quaint Studio',
      name: 'Mahesh',
      star: 5,
      message:"The stay at quaint Studio simply turns out to be the best decision for having peaceful and out of city environment with a beautifully studio designed gallery view, very clean and neat with perfect ambience, projector movie experience and luxury atmosphere.The place was simply amazing. I would really like to take a moment here and pass my special thank you to Mr. Rahul (Assigned for room assistance) Has been very helpful and always been there whenever needed. I would definitely visit again and recommend my friend too if they are looking out for a lovely experience out of city life to have a beautiful Quaint Studio Apartments."
    }
  ];
  return (
    //bg-gray-50  bg-[#F5F5DC]
    <section id="testimonials" className="bg-[#dacaa4]">
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:flex md:items-end md:justify-center text-center">
          <h2 className="listing-heading text-center mb-14 capitalize">
          Real Reviews, Real Guests
          </h2>
        </div>
        <div className="review-slider">
        <Swiper   
          spaceBetween={0} 
          autoplay={{ 
            delay: 2000, 
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }} 
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween:0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween:0,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper pb-10 lg:pb-0 ">
        
        {testimonials.map((item) => (
        <SwiperSlide className="p-2 sm:p-3">
            <div
              key={item.id}
              className="flex h-full flex-col bg-white p-6 shadow-sm sm:p-8" >
              <div className="flex items-center mb-4">
                <img src={item?.image} alt={item.title} className=" min-h-12 min-w-12 max-w-12 max-h-12 w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="text-[16px] font-semibold text-[#464646] sm:text-[18px]">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-500 flex">
                    <StartRating size={16} value={item.star} />
                    <span className='gap-2'>
                      {item.date}
                    </span>
                  </p>
                </div>
              </div>
              <div >
                <p className="leading-relaxed text-[#61554E] testimo-text text-[15px] leading-[20px] font-normal" dangerouslySetInnerHTML={{ __html: item.message }} />
              </div>
              <div className="text-sm font-medium text-gray-700 mt-4">
                &mdash; {item.name}
              </div>
            </div>
          </SwiperSlide>
          ))}
          </Swiper>
        </div>
        <div className="flex justify-center mt-6">
          <Link
            target='_blank'
            href="https://g.co/kgs/jzbLCKG"
            className="bg-[#efa3a3] text-[#fff] text-[13px] md:text-[16px] border border-[#efa3a3] px-[30px] py-[12px] flex rounded-full hover:text-[#efa3a3] hover:bg-[#ffffff00]"
          >
            <span className="font-base uppercase"> Read all reviews </span>
            {/* <GoArrowRight size={20} /> */}
          </Link>
        </div>
      </div>
    </section>
  );
}
