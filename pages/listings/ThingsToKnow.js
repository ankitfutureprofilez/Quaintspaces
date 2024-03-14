import React from "react";

export default function ThingsToKnow() {
  return (
    <div className="container mx-auto">
      <h1 className="listing-heading text-left">Things to know</h1>
      <div className="flex justify-between">
        <div className="flex flex-col mt-8 mr-4">
          <h2 className="font-semibold mb-2">House Rules</h2>
          <p className="mb-2 text-gray-500">Check-in after 02:00 pm</p>
          <p className="mb-2 text-gray-500">Checkout before 10:00 am</p>
          <p className="mb-2 text-gray-500">6 Guests Maximum</p>
        </div>
        <div className="flex flex-col my-8 mr-4">
          <h2 className="font-semibold mb-2">Safety & Property </h2>
          <p className="mb-2 text-gray-500">Carbon monoxide alarm</p>
          <p className="mb-2 text-gray-500">Smoke Alarm</p>
        </div>
        <div className="flex flex-col my-8 mr-4">
          <h2 className="font-semibold mb-2">House Rules</h2>
          <p className="mb-2 text-gray-500">This reservation is non-refundable.</p>
        </div>
      </div>
    </div>
  );
}
