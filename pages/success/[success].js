import React from "react";
import AuthLayout from "../layout/AuthLayout";
import { formatMultiPrice } from "../../hooks/ValueData";
import { useRouter } from "next/router";


const success = () => {
  const router=useRouter();

    console.log("router",router)
    console.log("datat",router?.components?.property?.[slug]?.props?.pageProps?.record?.data)

  return (
    <AuthLayout>
      <div className=" container mx-auto">
        <div className="pt-16 pb-16">
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <linearGradient
                id="5zzMGVQnN_QyRYWGmJUsQa_A8xKzsTKHhzn_gr1"
                x1="9.858"
                x2="38.142"
                y1="9.858"
                y2="38.142"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#21ad64"></stop>
                <stop offset="1" stop-color="#088242"></stop>
              </linearGradient>
              <path
                fill="url(#5zzMGVQnN_QyRYWGmJUsQa_A8xKzsTKHhzn_gr1)"
                d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
              ></path>
              <path
                d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z"
                opacity=".05"
              ></path>
              <path
                d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z"
                opacity=".07"
              ></path>
              <path
                fill="#fff"
                d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-center mt-4">
            Your Appointment Booked Successfully!
          </h2>
          <p className="text-gray-400 text-2xl text-center mt-2">
            We have sent your booking information to your email address.
          </p>

          <div className=" pt-16 sm:text-xl text-sm 
          flex flex-wrap justify-center m-auto max-w-[600px]">
            <div className="w-full flex justify-between mb-4 flex-wrap  ">
              <p className="text-gray-400">Booking ID</p>
              <p className="text-start text-gray-400 font-semibold">BJ0000435</p>
            </div>
            <div className="w-full flex justify-between mb-4 flex-wrap ">
              <p className="text-gray-400">Date & Time:</p>
              <p className="text-start text-gray-400 font-semibold">
                December 29, 2021 | 9:00 AM
              </p>
            </div>
            <div className="w-full flex justify-between mb-4 flex-wrap ">
              <p className="text-gray-400">Customer Name:</p>
              <p className="text-start text-gray-400 font-semibold">Mary Christy</p>
            </div>
            <div className="w-full flex justify-between mb-4 flex-wrap ">
                <p className="text-gray-400">Amount Paid</p>
                <p className="text-start text-gray-400 font-semibold">{formatMultiPrice(10000)}</p>
              </div>
              <div className="w-full flex justify-between mb-4 flex-wrap ">
                <p className="text-gray-400">Total Members</p>
                <p className="text-start text-gray-400 font-semibold">6</p>
              </div>
              <div className="w-full flex justify-between mb-4 flex-wrap ">
                <p className="text-gray-400">Total stay</p>
                <p className="text-start text-gray-400 font-semibold">6 Days</p>
              </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default success;
