import React from 'react';
import BookingImg from "../../public/images/booking_list_img.png";
import Image from "next/image";

export default function MobileBooking() {
  return (
    <>
      <div className="pb-[30px]">
        <h2 className="text-[17px] text-[#787069] font-normal uppercase tracking-[-0.06em] leading-[14.56px] mb-[15px]">
          Today
        </h2>
        <div className="space-y-[10px]">
          <div className="border-[1px] border-[#0000001a] rounded-[10px] ">
            <div className="p-[10px]">
              <div className="flex flex-wrap items-center justify-between border-b-[1px] border-[#0000001a] pb-[15px] mb-[15px]">
                <div className="flex items-center">
                  <Image
                    src={BookingImg}
                    alt="BookingImg"
                    className="w-[56px] h-[56px] object-cover rounded-[6px] mr-[10px]"
                  />
                  <div className="">
                    <h3 className="text-[15px] font-normal leading-[18.38px] text-[#3F2A17] mb-[5px]">
                      Quaint Stay
                    </h3>
                    <p className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A]">
                      BKGQSJAI_20 2400259
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <h3 className="text-[15px] font-normal leading-[18.38px] text-[#3F2A17] mb-[5px]">
                    ₹35,000
                  </h3>
                  <p className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A]">
                    INR
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-1/2 border-r-[1px] border-[#0000001a] flex items-center">
                  <span className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A] leading-[22px]">
                    16 Apr 2024, 05:00PM
                  </span>
                </div>
                <div className="w-1/2 text-end flex justify-end items-center">
                  <span className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A] leading-[22px]">
                    24 Apr 2024, 08:00PM
                  </span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
