
import React, { useEffect, useState } from "react";
import Listings from './../api/laravel/Listings';
import Link from "next/link";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
export default function RoomListings() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    setLoading(true);
    const main = new Listings();
    main.TopPropertyListing().then((r) => {
      setLoading(false);
      const data = r?.data?.data;
      let filteredListings = [];

      if (Array.isArray(data)) {
        filteredListings = data.filter(item => item?.status === 1);
      }

      if (filteredListings.length > 0) {
        setListings(filteredListings);
      }
    }).catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }, []);
  const parseLocation = (location) => {
    try {
      const record  = JSON.parse(location);
    const data = JSON.parse(record)
      return data?.location;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  return (
    <div className=" ">
      <div className="swiperdiv">
      <Swiper   
      spaceBetween={0} 
      // autoplay={{ 
      //   delay: 2000, 
      //   disableOnInteraction: false,
      // }}
      // loop={true}
      pagination={{
        clickable: true,
      }} 
      // navigation={true} 
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween:0,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
      }}
      modules={[Pagination]}
      className="mySwiper pb-10 lg:pb-0 ">
        <div className="slider-container">
          {listings?.map((item, index) => (
            <SwiperSlide className="p-2 sm:p-3">
              <Link key={index} className="bg-white w-full banipark-box rounded-lg block relative overflow-hidden pb-[85px] h-full" href={`/property/${item?.uuid}`}>
              {item?.discount_offer ? (
                <div className="absolute bg-[#efa3a3] -rotate-45 text-white px-2 py-1 w-32 text-center -left-[32px] top-[18px] shadow-[0_0_17px_-5px_#3c3c3c;]">
                  {item?.discount_offer}% off
                </div>
              ) : null}
              <Image
                width={100}
                height={300}
                layout="responsive"
                src={item?.property_image[0]?.image_url}
                blurDataURL={`${item?.property_image[0]?.image_url}?q=1`}
                placeholder="blur"
                alt="Property cover image"
                className="!rounded-[7px_7px_0px_0px]"
              />
              <div className="flat-info p-3 lg:p-6">
                <h2 className="line-clamp-1 !pb-[5px]">
                  {
                    parseLocation(item?.location)

                }
                </h2>
                <h3 className="line-limit capitalize" style={{ WebkitLineClamp: 1 }}>
                  {capitalizeFirstLetter(item?.name)}
                </h3>
                <p>
                  <span className="capitalize">{capitalizeAndReplace(item?.type)}  ·</span> &nbsp;
                  <span className="capitalize">{capitalizeAndReplace(item?.properties_type)}   ·</span> &nbsp;
                  {item?.bedrooms} Bedrooms · {item?.beds} Bed · {item?.guests} Guests · {item?.no_of_pet_allowed} Pets
                </p>
                <h4>
                  <span className="card-price">
                    {formatMultiPrice(item?.price) || 0}
                  </span>{" "}
                  /night
                </h4>
              </div>
              <div className="explor-btn absolute w-full left-0 bottom-0">
                Explore
              </div>
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      </div>
    </div>
  );
}

function capitalizeFirstLetter(string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

function capitalizeAndReplace(string) {
  return string?.replace(/_/g, ' ')?.toLowerCase();
}

function formatMultiPrice(price) {
  return price?.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR'
  });
}
