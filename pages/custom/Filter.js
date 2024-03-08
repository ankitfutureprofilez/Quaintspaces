import React from 'react'
import RangeSlider from "./RangeSlider.js";

export default function Filter() {
  return (
    <div className="flex flex-col mx-auto max-w-md max-h-md rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Filter</h2>
      <div className='flex flex-col my-4'>
      <h2 className="text-xl font-semibold mb-2">Check Availability</h2>
      <p>Nightly Prices Before Fees and Taxes</p>
      </div>
      <div className='flex justify-between space-x-8'>
        <div className="mb-6 mt-4">
          <label className="block text-sm font-medium text-gray-600">Check In</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="30 March"
          />
        </div>
        <div className="mb-6 mt-4">
          <label className="block text-sm font-medium text-gray-600">Check Out</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="4 April"
          />
        </div>
      </div>
      <div className='flex flex-col mt-4'>
      <h2 className="text-xl font-semibold mb-2">Price Range</h2>
      <p>Nightly prices before fees and taxes</p>
      </div>
      <RangeSlider
       min={5000}
       max={50000}
       onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
      />
    </div>
  );  
}
