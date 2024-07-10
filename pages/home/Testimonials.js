import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';
import StartRating from '../elements/StartRating'; // Ensure you have this component
import Link from 'next/link';

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
    <section id="testimonials" className="bg-gray-50">
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:flex md:items-end md:justify-center text-center">
          <h2 className="listing-heading text-center mb-14 capitalize">
          Real Reviews, Real Guests
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center mb-4">
                {/* Example of an image, replace src with actual image URL */}
                <img src={item?.image} alt={item.title} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="text-2xl font-bold text-[#464646] sm:text-3xl">{item.title}</p>
                  <p className="mt-2 text-sm text-gray-500 flex">
                    <StartRating size={16} value={item.star} />
                    <span className='gap-2'>
                      {item.date}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="leading-relaxed text-gray-700 text-justify" dangerouslySetInnerHTML={{ __html: item.message }} />
              </div>
              <div className="text-sm font-medium text-gray-700 mt-4">
                &mdash; {item.name}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link
            target='_blank'
            href="https://g.co/kgs/jzbLCKG"
            className="inline-flex items-center gap-2 rounded-full border border-[#c48b58] px-5 py-3 text-[#c48b58] transition hover:bg-[#c48b58] hover:text-white md:mt-0"
          >
            <span className="font-base uppercase"> Read all reviews </span>
            <GoArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
