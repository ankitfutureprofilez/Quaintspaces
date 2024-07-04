import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-icons';
import { faUtensils, faSnowflake, faSun, faWifi, faParking, faSweeping, faFan, faMapMarkerAlt, faVolumeUp, faBook, faSwimmingPool, faTv } from '';


export default function ReasonToVisit() {

  const amenities = [
    { name: "Kitchen", icon: faUtensils },
    { name: "Refrigerator", icon: faSnowflake },
    { name: "Balcony", icon: faSun },
    { name: "Internet Access", icon: faWifi },
    { name: "Free Parking", icon: faParking },
    { name: "Daily housekeeping", icon: faSweeping },
    { name: "Air conditioning", icon: faFan },
    { name: "Prime location", icon: faMapMarkerAlt },
    { name: "Music Speakers", icon: faVolumeUp },
    { name: "Games & Books", icon: faBook },
    { name: "Pool / Jacuzzi", icon: faSwimmingPool },
    { name: "TV", icon: faTv }
];

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <div className="visit-us-sec relative">
      <Image
        blurDataURL="/images/visitbg.jpg?q=1"
        src="/images/visitbg.jpg"
        alt="QUAINTSPACES JAIPUR Reason to visit"
        layout="fill"
        objectFit="cover"
        style={{ zIndex: -1 }}
        loading="lazy"
      />
      <div className="container capitalize mx-auto relative z-10">
        <h2>Amenities we offer</h2>
        <div className="smart-box">
          <div className="carousel-wrapper">
            <Slider {...settings}>
              {amenities?.map((reason, index) => (
                <div className="iteam" key={index} >
                  <div className="amenity-icon">
                  <FontAwesomeIcon icon={reason.icon} className="amenity-icon" />
                  <h3>{reason?.name}</h3>
                    </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
