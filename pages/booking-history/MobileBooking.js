import React from 'react';
import BookingImg from "../../public/images/booking_list_img.png";
import { formatMultiPrice } from '../../hooks/ValueData.js';
import Link from "next/link";
import NoData from '../elements/NoData.js';
import SuccessDate from '../success/SuccessDate.jsx';
import DateComponent from '../elements/DateFormat.jsx';
export default function MobileBooking({ listings, selectedButton, loading }) {
  console.log("listings", listings)



  const Loading = () => { 
    return <>
      <div role="status" class="w-full animate-pulse mb-4 border border-gray-300 rounded-xl p-4">
        <div className='flex justify-between items-center'>
          <div class="h-[80px] w-[25%] bg-gray-200 rounded-xl mb-2 p-4"></div>
          <div class="h-[80px] w-[70%] bg-gray-200 rounded-xl mb-2 p-4"></div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div class="h-[70px] w-[100%] bg-gray-200 rounded-xl p-4"></div>
          <div class="h-[70px] w-[100%] bg-gray-200 rounded-xl p-4"></div>
        </div>
      </div>
  </>
  }
  return (
    <>
    {loading ?  
      <>
    <Loading />
    <Loading />
      </>
    : 
    <>
     {listings && listings.length > 0 ? (
        listings?.map((item, index) => (
          <div className="pb-[30px]">
            <div className="space-y-[10px]">
              <div className="border-[1px] border-[#0000001a] rounded-[10px] ">
                <div className="p-[10px]">
                  <div className="flex flex-wrap items-center justify-between border-b-[1px] border-[#0000001a] pb-[15px] mb-[15px]">
                    <div className="flex items-center">
                      <img
                        src={item?.booking_property?.property_image ? item?.booking_property?.property_image[0]?.image_url : BookingImg}
                        alt="BookingImg"
                        className="w-[56px] h-[56px] object-cover rounded-[6px] mr-[10px]"
                      />
                      <div className="">
                        <h3 className="text-[15px] font-normal leading-[18.38px] text-[#3F2A17] mb-[5px] capitalize">
                          <Link href={`/property/${item?.booking_property?.uuid}`}>
                            {item?.booking_property?.name}
                          </Link>
                        </h3>
                        <p className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A]">
                          {item?.booking_number}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <h3 className="text-[15px] font-normal leading-[18.38px] text-[#3F2A17] mb-[5px]">
                        {formatMultiPrice(item?.price)}
                      </h3>
                      <p className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A]">
                        INR
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-1/2 border-r-[1px] border-[#0000001a] flex items-center">
                      <span className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A] leading-[22px]">
                        <DateComponent item=
                          {item?.check_in} />
                      </span>
                    </div>
                    <div className="w-1/2 text-end flex justify-end items-center">
                      <span className="text-[13px] uppercase font-normal leading-[15.77px] text-[#80746A] leading-[22px]">
                        <DateComponent item=
                          {item?.check_out} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
     )):(
      <NoData
        url={"/apartments"}
        Heading={"Booking History Not Found"}
        content={selectedButton === "cancelled" ? ("You have not cancelled any booking yet.") : ("You have not made any bookings yet. Please click the link below to visit the apartment page.")}
      />
     )}
    </> }
    </>
  );
}
