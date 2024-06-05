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
    <div className="h-full  w-full p-7">
      <h2 className="text-3xl text-center font-bold mb-4">
        Share some basics about your place
      </h2>
      <h2 className="text-xl text-center mb-8">
        You'll add more details later, such as bed types.
      </h2>
      <div className="grid  m-auto table gap-y-4  mt-5 ">
        <div className="flex items-center mt-5 pt-4 pb-4  justify-between border-b-2 border-black-600 p-2">
          <span className="font-normal leading-snug text-lg   ">Guests</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={decrement(setGuests)}
              className="rounded-full border border-black-600 px-3 py-1"
            >
              -
            </button>
            <span className="font-normal">{Guests}</span>
            <button
              onClick={increment(setGuests)}
              className="rounded-full border  border-black-600 px-3 py-1"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center pt-4 pb-4 justify-between border-b-2 border-black-600 p-2">
          <span className="font-normal leading-snug text-lg ">Bedrooms</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={decrement(setBedrooms)}
              className="rounded-full border-black-600  border px-3 py-1"
            >
              -
            </button>
            <span>{Bedrooms}</span>
            <button
              onClick={increment(setBedrooms)}
              className="rounded-full border border-black-600  px-3 py-1"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center pt-4 pb-4 justify-between border-b-2 border-black-600 p-2 ">
          <span className="font-normal leading-snug text-lg  ">Bathrooms</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={decrements(setBathrooms)}
              className="rounded-full border border-black-600 px-3 py-1"
            >
              -
            </button>
            <span>{Bathrooms}</span>
            <button
              onClick={increments(setBathrooms)}
              className="rounded-full border border-black-600  px-3 py-1"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center pt-4 pb-4 justify-between border-b-2 border-black-600 p-2">
          <span className="font-normal leading-snug text-lg ">Beds</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={decrement(setBeds)}
              className="rounded-full border-black-600  border px-3 py-1"
            >
              -
            </button>
            <span>{Beds}</span>
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
