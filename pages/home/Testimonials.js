import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';
import StartRating from '../elements/StartRating'; // Ensure you have this component
import Link from 'next/link';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      title: 'Quaint Suite',
      name: 'Simran',
      date: 'May 2024',
      star: 5,
      message: 'An absolutely flawless stay. Everything was so tastefully done, the interiors were a work of art. Truly a gem. The beds were super comfortable, loved the mattress. The TV, speakers and of course the highlight was the bath tub. We had such a memorable stay that I am looking forward to coming back. The host and his team were very responsive and super nice, special shout out to Arjun. Worth every single penny.'
    },
    {
      id: 2,
      title: 'Quaint Stay',
      name: 'Vivek Mundhra',
      date: '2 years ago',
      star: 5,
      message: 'Based on our stay at this property for our weekend trip to Jaipur, we can vouch on the fact that this gorgeous boutique apartment is one of the best Airbnb properties in the city, ‘coz it literally checks ALL the parameters one takes into consideration while booking an accommodation, including:<br/><br/>LOCATION: Just a 15 minutes drive to the city centre with all the prime tourist spots.<br/><br/>THE PROPERTY: Exactly as seen in the pictures (or even better :D) with all the amenities listed.<br/><br/>THE HOST: Not only was Mr. Atul present to personally greet us and show us around the home, but also, was sweet enough to check on us as well as share his recommendations for places to visit in the city.<br/><br/>All in all, if you’re considering this property for your stay in Jaipur, you needn’t even think twice to go ahead with it!'
    },
    {
      id: 3,
      title: 'Quaint Studio',
      name: 'Mahesh',
      date: 'September 2023',
      star: 5,
      message: 'The stay at quaint Studio simply turns out to be the best decision for having peaceful and out of city environment... with beautifully studio designed, gallery view, very clean and neat with perfect ambience, projector movie experience and luxury atmosphere.<br/><br/>The place was simply amazing. I would really like to take a moment here and pass my special thank you to Mr. Rahul (Assigned for room assistance) Has been very helpful and always been there whenever needed. Really a genuine person.<br/><br/>Once again really wanna thanks to you too Mr. Chirag for wonderful experience during my stay. I would definitely visit again and recommend my friend too if they are looking out for a lovely experience out of city life to have a beautiful quaint Studio Apartments.'
    }
  ];

  const [expanded, setExpanded] = useState(false); 

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <section id="testimonials" className="bg-gray-50">
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:flex md:items-end md:justify-center text-center">
          <h2 className="listing-heading text-center mb-14 capitalize">
            testimonials
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
                <img src="" alt={item.title} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="text-2xl font-bold text-rose-600 sm:text-3xl">{item.title}</p>
                  <p className="mt-2 text-sm text-gray-500 flex">
                    <StartRating size={16} value={item.star} />
                    <span>
                      {item.date}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                {expanded ? (
                  <p className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: item.message }} />
                ) : (
                  <p className="leading-relaxed text-gray-700">
                    {item.message.length > 100
                      ? item.message.slice(0, 100) + '...'
                      : item.message}
                    <span
                      className="text-blue-500 cursor-pointer ml-1"
                      onClick={toggleExpanded}
                    >
                      Read more
                    </span>
                  </p>
                )}
              </div>
              <div className="text-sm font-medium text-gray-700 mt-4">
                &mdash; {item.name}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link
            href="#"
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
