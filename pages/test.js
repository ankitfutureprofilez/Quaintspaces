import React, { useState } from "react";

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

export default function test() {
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
