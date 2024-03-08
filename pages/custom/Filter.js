import React from 'react'

export default function Filter() {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-right">Filter</h2>
          <div className="mt-4">
            <label className="block mb-2">Check In</label>
            {/* Add your date picker input here */}
            {/* Example: <input type="date" /> */}
          </div>
          <div className="mt-4">
            <label className="block mb-2">Check Out</label>
            {/* Add your date picker input here */}
          </div>
          <div className="mt-6">
            <label className="block mb-2">Price Range</label>
            {/* Add your price range slider here */}
            {/* Example: <input type="range" min="5000" max="50000" /> */}
          </div>
        </div>
      );
}
