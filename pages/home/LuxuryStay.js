import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import "aos/dist/aos.css"; // You can also use <link> for styles
import AOS from "aos";
import "aos/dist/aos.css";
import Luxury1 from "../../public/images/Luxury1.jpg";
import Luxury2 from "../../public/images/Luxury2.jpg";
import Luxury3 from "../../public/images/Luxury3.jpg";

export default function LuxuryStay() {
  useEffect(() => {
    AOS.init({});
  }, []);
  return (
    <div className="luxury-stay">
      <div className="container mx-auto">
        <h1>OPPULENT </h1>
        <div className="luxury-stay-img">
          <div className="img-box" data-aos="fade-right">
            <Image
              src={Luxury1}
              alt="QUAINTSPACES JAIPUR"
              priority="true"
              blurDataURL={Luxury1}
            />
          </div>
          <div
            className="img-box"
            id="hero"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <Image
              src={Luxury2}
              alt="QUAINTSPACES JAIPUR"
              priority="true"
              blurDataURL={Luxury2}
            />
          </div>
          <div className="img-box" data-aos="fade-left">
            <Image
              src={Luxury3}
              alt="QUAINTSPACES JAIPUR"
              priority="true"
              blurDataURL={Luxury3}
            />
          </div>
        </div>
        <h1 className="in-jaipur"> ESCAPES</h1>
        <p>
          Stay in the heart of Jaipur's pink city, our modern, well-appointed
          apartments, perfect for business or leisure. We go the extra mile to
          tailor your stay to your preferences, ensuring a memorable and unique
          experience. Whether you’re sipping morning coffee or relaxing in the
          tranquil ambience of your private space, you’ll find every moment here
          unique and unforgettable. Quaint Spaces is sure to be your Home Away
          from Home.
        </p>
      </div>
    </div>
  );
}
