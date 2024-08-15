import React, { useState } from "react";

export default function Test() {
  // Initialize state
  const [item, setItem] = useState({ additional: "" });

  // Handle change function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col mb-2 ml-4">
      <h1 className="capitalize text-lg font-bold my-4">
        Additional Fees (%){" "}
      </h1>
      <label className="flex items-center space-x-2 text-xl font-normal w-1/3">
        <input
          className="p-4 py-2 w-36 md:w-full mt-1 block text-[16px] md:text-lg border border-[#ccc] rounded-md"
          placeholder="% Additional Fees"
          type="number"
          name="additional"
          value={item.additional}
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
}
