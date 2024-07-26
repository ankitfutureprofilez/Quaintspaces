import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import "aos/dist/aos.css"; // You can also use <link> for styles
import AOS from "aos";
import "aos/dist/aos.css";
import Luxury1 from "../../public/images/Luxury1.jpg";
import Luxury2 from "../../public/images/Luxury2.jpg";
import Luxury3 from "../../public/images/Luxury3.jpg";

export default function LuxuryStay() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    AOS.init({});
  }, []);
  return (

    <>
      {isMobile ? (
        <div className="container">
          <div className="flex justify-center items-center w-full mb-4">
            <div className="w-1/3  justify-center p-4 " >
              <Image
                src={Luxury1}
                alt="Quaintspaces Jaipur"
                priority="true"
                blurDataURL={`${Luxury1}?q=1`}
                placeholder="blur"
                className="gap-2 mb-2"
              />
              <Image
                src={Luxury3}
                alt="Quaintspaces Jaipur"
                priority="true"
                blurDataURL={`${Luxury1}?q=1`}
                placeholder="blur"
              />
            </div>
            <div className="w-1/3  justify-center" >
              <h1 className="ml-2">Opulent</h1>
              <Image
                src={Luxury2}
                alt="Quaintspaces Jaipur"
                priority="true"
                blurDataURL={`${Luxury1}?q=1`}
                placeholder="blur"
              />
              <h1 className="ml-2">Escapes</h1>
            </div>
          </div>
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
      ) : (
        <div className="luxury-stay">
          <div className="container mx-auto">
            <h1>Opulent </h1>
            <div className="luxury-stay-img">
              <div className="img-box">
                <Image
                  src={Luxury1}
                  alt="Quaintspaces Jaipur"
                  priority="true"
                  blurDataURL={`${Luxury1}?q=1`}
                  placeholder="blur"
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
                  alt="Quaintspaces Jaipur"
                  priority="true"
                  blurDataURL={`${Luxury2}?q=1`}
                  placeholder="blur"
                />
              </div>
              <div className="img-box" data-aos="fade-left">
                <Image
                  src={Luxury3}
                  alt="Quaintspaces Jaipur"
                  priority="true"
                  blurDataURL={`${Luxury3}?q=1`}
                  placeholder="blur"
                />
              </div>
            </div>
            <h1 className="in-jaipur capitalize "> Escapes </h1>
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
      )}
    </>
  );
}
