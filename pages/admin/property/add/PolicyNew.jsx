import React, { useState } from 'react';

export default function PolicyNew(is_refundable,setIsRefundable,handlePolicyChanges) {
  // Initialize is_refundable state with 1
//   const [is_refundable, setIsRefundable] = useState(1);

  // Handle change function
//   const handlePolicyChanges = (refundable) => {
//     setIsRefundable(refundable);
//   };

  return (
    <div className="flex flex-wrap mb-4">
      <div className="w-full md:w-2/3 mx-auto pr-2">
        <h2 className="text-center font-bold text-2xl text-slate-900 mt-3 md:mb-4 capitalize">Cancellation policy</h2>
        <div className="p-4">
          <p className="text-gray-500 mb-4">
            To understand the full policies, visit the{" "}
            <span className="underline font-semibold cursor-pointer">
              Help Centre
            </span>.
          </p>
          <div>
            <div
              className={`flex justify-center mb-4 p-4 relative items-center border-2 cursor-pointer ${is_refundable === 1 ? "border-indigo-600" : "border-gray-200"}`}
              onClick={() => handlePolicyChanges(1)}
            >
              <div className="flex flex-col">
                <label className="flex items-center cursor-pointer mx-auto text-center text-lg mb-2">
                  Refundable
                </label>
                <p className="text-gray-500">
                  Amount is refundable if the user cancels his/her booking at least 5 days before check-in.
                </p>
              </div>
              <input
                type="radio"
                name="cancellationPolicy"
                value="1"
                checked={is_refundable === 1}
                onChange={() => handlePolicyChanges(1)}
                className="ml-2 w-4 h-4 cursor-pointer absolute top-2 right-2"
              />
            </div>
            <div
              className={`flex justify-center p-4 mb-4 relative items-center border-2 cursor-pointer ${is_refundable === 0 ? "border-indigo-600" : "border-gray-200"}`}
              onClick={() => handlePolicyChanges(0)}
            >
              <div className="flex flex-col">
                <label className="flex items-center cursor-pointer mx-auto text-center text-lg mb-2">
                  Not Refundable
                </label>
                <p className="text-gray-500 ml-4">
                  Amount is not refundable under any circumstances. Once a property is booked no refund would be provided to the user on cancellation.
                </p>
              </div>
              <input
                type="radio"
                name="cancellationPolicy"
                value="0"
                checked={is_refundable === 0}
                onChange={() => handlePolicyChanges(0)}
                className="mr-2 w-4 h-4 cursor-pointer absolute top-2 right-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
