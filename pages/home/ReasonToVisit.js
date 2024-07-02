import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";

export default function ReasonToVisit() {
  const reasons = [
    "Smart Television",
    "Laundry",
    "Complimentary internet",
    "Speakers",
    "Ironing",
    "Microwave",
    "Geyser",
  ];
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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
              {reasons.map((reason, index) => (
                <div className="iteam" key={index} >
                  <h3>{reason}</h3>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
