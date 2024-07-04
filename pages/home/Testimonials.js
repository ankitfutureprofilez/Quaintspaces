import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { GoArrowRight } from 'react-icons/go';
import StartRating from '../elements/StartRating';
import Link from 'next/link';

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-gray-50">
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:flex md:items-end md:justify-center text-center">
            <h2 className="listing-heading text-center mb-14">
              Read trusted reviews from our customers
            </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8"
            >
              <div>
                <StartRating size={16} value={5} />
                <div className="mt-4">
                  <p className="text-2xl font-bold text-rose-600 sm:text-3xl">Stayin' Alive</p>
                  <p className="mt-4 leading-relaxed text-gray-700">
                    No, Rose, they are not breathing. And they have no arms or legs … Where are they? You
                    know what? If we come across somebody with no arms or legs, do we bother resuscitating
                    them? I mean, what quality of life do we have there?
                  </p>
                </div>
              </div>
              <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                &mdash; Michael Scott
              </footer>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link
            href="#"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#c48b58] px-5 py-3 text-[#c48b58] transition hover:bg-[#c48b58] hover:text-white md:mt-0"
          >
            <span className="font-medium"> Read all reviews </span>
            <GoArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
