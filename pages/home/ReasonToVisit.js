import React, { useState, useEffect } from "react";
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

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % reasons.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [reasons.length]);

  const visibleReasons = reasons.slice(currentSlide, currentSlide + 4).concat(
    reasons.slice(0, Math.max(0, 4 - reasons.slice(currentSlide).length))
  );

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
      <div className="container mx-auto relative z-10">
        <h2>Reason to Visit US</h2>
        <div className="smart-box">
          <div className="carousel-wrapper">
            <div className="carousel-container" style={{ display: 'flex', transition: 'transform 0.5s ease-in-out' }}>
              {visibleReasons.map((reason, index) => (
                <div className="iteam" key={index} >
                  <h3>{reason}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
