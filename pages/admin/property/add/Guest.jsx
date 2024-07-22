import React, { useState } from "react";

export default function Guest({
  Guests, setGuests, Bedrooms, setBedrooms, Bathrooms, setBathrooms, Beds, setBeds
}) {
  const decrement = (setter) => () => setter((prev) => Math.max(0, prev - 1));
  const increment = (setter) => () => setter((prev) => prev + 1);
  const decrements = (Bathrooms) => () =>
    setBathrooms((prev) => Math.max(0, prev - 0.5));
  const increments = (Bathrooms) => () => setBathrooms((prev) => prev + 0.5);
  return (
    <div className="h-full  w-full ">
      <h2 className="text-[20px] md:text-[24px] capitalize lg:text-[28px] text-center mt-2 font-[500] text-[#222222] mb-2">
        Share some basics about your place
      </h2>
      <h2 className="text-[16px] text-center mb-4">
        You'll add more details later, such as bed types.
      </h2>
      <div className="grid  m-auto table gap-y-2  my-5 ">
        <div className="flex items-center  py-3 sm:py-4  justify-between border-b-2 border-black-600 px-2">
          <span className="font-normal leading-snug text-base lg:text-lg   ">Guests</span>
          <div className="flex items-center">
            <button
              onClick={decrement(setGuests)}
              className="rounded-full border border-black-600 px-3 py-1"
            >
              -
            </button>
            <span className="font-normal w-12 text-center">{Guests}</span>
            <button
              onClick={increment(setGuests)}
              className="rounded-full border  border-black-600 px-3 py-1"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center pt-4 pb-4 justify-between border-b-2 border-black-600 p-2">
          <span className="font-normal leading-snug text-base lg:text-lg">Bedrooms</span>
          <div className="flex items-center ">
            <button
              onClick={decrement(setBedrooms)}
              className="rounded-full border-black-600  border px-3 py-1"
            >
              -
            </button>
            <span className="font-normal w-12 text-center">{Bedrooms}</span>
            <button
              onClick={increment(setBedrooms)}
              className="rounded-full border border-black-600  px-3 py-1"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center pt-4 pb-4 justify-between border-b-2 border-black-600 p-2 ">
          <span className="font-normal leading-snug text-base lg:text-lg ">Bathrooms</span>
          <div className="flex items-center  ">
            <button
              onClick={decrements(setBathrooms)}
              className="rounded-full border border-black-600 px-3 py-1"
            >
              -
            </button>
            <span className="font-normal w-12 text-center">{Bathrooms}</span>
            <button
              onClick={increments(setBathrooms)}
              className="rounded-full border border-black-600  px-3 py-1"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center pt-4 pb-4 justify-between border-b-2 border-black-600 p-2">
          <span className="font-normal leading-snug text-base lg:text-lg">Beds</span>
          <div className="flex items-center ">
            <button
              onClick={decrement(setBeds)}
              className="rounded-full border-black-600  border px-3 py-1"
            >
              -
            </button>
            <span className="font-normal w-12 text-center">{Beds}</span>
            <button
              onClick={increment(setBeds)}
              className="rounded-full border border-black-600  px-3 py-1"
            >
              +
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
