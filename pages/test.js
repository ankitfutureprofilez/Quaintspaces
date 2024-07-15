import React, { useState } from "react";
import Slider from "react-slick";

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
  "/images/HeaderImg.png",
    "/images/tip-top-1.jpg",
    "/images/tip-top-2.jpg",
    "/images/tip-top-3.jpg",
];

function MultipleItems() {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}

export default function test() {
    return (
      // <RadioButtons/>
      <MultipleItems/>      
    );
}
