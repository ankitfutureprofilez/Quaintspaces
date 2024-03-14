import React from "react";
import Head from "next/head";
import Image from "next/image";
import Luxury1 from "../../public/images/Luxury1.png";
import Luxury2 from "../../public/images/Luxury2.png";
import Luxury3 from "../../public/images/Luxury3.png";

export default function LuxuryStay() {
  return (
    <div className="luxury-stay">
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script>
        AOS.init();
      </script>
      </Head>

      <div className="container mx-auto">
        <h1>Luxury Stay</h1>
        <div className="luxury-stay-img">
          <div className="img-box">
            <Image src={Luxury1} />
          </div>
          <div className="img-box" id="hero" >
            <Image data-aos="fade-up" src={Luxury2} />
          </div>
          <div className="img-box">
            <Image src={Luxury3} />
          </div>
        </div>
        <h1 className="in-jaipur">In Jaipur</h1>
        <p>
          Our place offers luxe amenities from a smart television set to a fully
          equipped kitchen. It is sure to bring in vacation vibes with its muted
          neutral tones teamed with soft hues & floral motifs handprinted on the
          walls, inspired by the pink city. From fresh bedding, complimentary
          internet, speakers, to in-house laundry and ironing facilities, Our
          Place has everything you need for a perfect stay in Jaipur.
        </p>
      </div>
    </div>
  );
}
