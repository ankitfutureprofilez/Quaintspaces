import React, { useState } from "react";
import Image from "../public/images/HeaderImg.png"
import { Link } from "iconsax-react";

const InputGroups = () => {
  return (
    <div>
      {/* Input group with prepend URL text */}
      <div className="mb-3 flex items-center">
        <span className="inline-block bg-gray-200 p-2 rounded-l">https://quant-stay.vercel.app/properties/</span>
        <input
          type="text"
          className="form-control flex-1 px-4 py-2 border rounded-r"
          id="basic-url"
          aria-describedby="basic-addon3"
        />
      </div>
    </div>
  );
};
const RadioButtons = () =>{
  const [selectedOption, setSelectedOption] = useState(null);
  console.log("selectedOption",selectedOption);

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
  };

  return (
    <div className="max-w-[100%] m-auto w-full md:mt-10 mt-4">
      <h2 className="text-xl md:text-2xl lg:text-3xl text-center mt-2 font-bold md:mb-8 mb-4 capitalize">
        Please select Property Book Status
      </h2>
      <div className="flex items-center space-x-4 md-4 md:mb-8">
        <label className="flex items-center space-x-2 sm:text-[1.15rem] text-[17px] font-normal">
          <input
            type="radio"
            value={1}
            checked={selectedOption === 1}
            onChange={handleOptionChange}
            className="form-radio"
          />
          <span>Request to Book</span>
        </label>
        <label className="flex items-center space-x-2 sm:text-[1.15rem] text-[17px] font-normal">
          <input
            type="radio"
            value={0}
            checked={selectedOption === 0}
            onChange={handleOptionChange}
            className="form-radio"
          />
          <span>Instant Book</span>
        </label>
      </div>
    </div>
  );
}
const images = [
  Image,
  Image,
  Image,
  Image,
  Image,
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'block' : 'hidden'}`}
            data-carousel-item
          >
            <img src={image} className="block w-full h-full object-cover" alt={`Slide ${index + 1}`} />
          </div>
        ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-2">
          <h1>Live the luxury in Jaipur</h1>
          <p>Book the most luxurious and aesthetically pleasing place, Jaipur city has to offer</p>
          <Link to="#places">
            <button className="font-inter text-base font-medium leading-tight text-center text-white w-[405px] border-2 border-white p-[18px] rounded-[30px] hover:bg-[#c48b58] hover:border-[#c48b58]">
              EXPLORE APARTMENTS
            </button>
          </Link>
        </div>
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-current={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={handlePrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};
export default function test() {
    return (
      // <RadioButtons/>
      <Carousel/>      
    );
}
