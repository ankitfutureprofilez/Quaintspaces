import React, { useState } from "react";
import { MdPhonelinkLock } from "react-icons/md";
import { MdOutlineKeyboardAlt } from "react-icons/md";
import { RiDoorLockBoxLine } from "react-icons/ri";
import { GrUserWorker } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function test() {
  const [selectedMethod, setSelectedMethod] = useState("smartlock");
  const options = [
    {
      item: "smartlock",
      data: "Guests will use a code or app to open a wifi-connected lock.",
      icon: <MdPhonelinkLock size={24}/>,
    },
    {
      item: "keypad",
      data: "Guests will use the code you provide to open an electronic lock.",
      icon: <MdOutlineKeyboardAlt size={24}/>,
    },
    {
      item: "lockbox",
      data: "Guests will use a code you provide to open a small safe that has a key inside.",
      icon: <RiDoorLockBoxLine size={24}/>,
    },
    {
      item: "staff",
      data: "Someone will be available 24 hours a day to let guests in.",
      icon: <GrUserWorker size={24}/>,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4">
      {/* Left Panel */}
      <div className="md:w-2/3 px-16 flex flex-col mt-4">
        <div className="flex space-x-4 items-center">
        <IoMdArrowRoundBack size={24}/>
        <h2 className="text-3xl font-bold">Select a check-in method</h2>
        </div>
        <div className="space-y-8 mt-8 w-full">
          {options && options.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedMethod === item?.item ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedMethod(item?.item)}
            >
                {item?.icon}
                <span className="my-4 text-xl font-semibold capitalize">
                  {item?.item}
                </span>
              <p className="text-gray-500">
                {item?.data}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="md:w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4 capitalize">
          Add {selectedMethod} details
        </h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows="10"
          placeholder={`Add any important details for getting inside your place. This info will be shared with guests 24-48 hours before check-in.`}
        />
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500">Shared 48 hours before check-in</p>
          <div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg mr-2">
              Cancel
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-lg">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
