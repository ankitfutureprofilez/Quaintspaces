import React, { useEffect, useState } from "react";
import Listings from './../api/laravel/Listings';
import Link from "next/link";
import Image from 'next/image';

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
      } else {
        console.log("No listings match the status and step conditions.");
      }
    }).catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }, []);
  const parseLocation = (location) => {
    try {
      const record  = JSON.parse(location);
      return JSON.parse(record?.location);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  return (
    <div className="banipark-box rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings?.map((item, index) => (
          <Link key={index} className="block relative overflow-hidden pb-[85px] h-full" href={`/property/${item?.uuid}`}>
            {item?.discount_offer ? (
              <div className="absolute bg-[#e0c4c3] -rotate-45 text-white px-2 py-1 w-32 text-center -left-[32px] top-[18px] shadow-[0_0_17px_-5px_#3c3c3c;]">
                {item?.discount_offer}% off
              </div>
            ) : null}
            <Image
              width={100}
              height={300}
              layout="responsive"
              src={item?.property_image[0]?.image_url || "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-2000x1333.jpg"}
              alt="Property cover image"
              className="!rounded-[7px_7px_0px_0px]"
            />
            <div className="flat-info p-4">
              <h2 className="line-limit sm:min-h-[77px]">
                {
                  parseLocation(item?.location)

              }
              </h2>
              <h3 className="line-limit" style={{ WebkitLineClamp: 1 }}>
                {capitalizeFirstLetter(item?.name)}
              </h3>
              <p>
                <span>{capitalizeAndReplace(item?.type)}</span> &nbsp;
                <span>{capitalizeAndReplace(item?.properties_type)}</span> &nbsp;
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
        ))}
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
