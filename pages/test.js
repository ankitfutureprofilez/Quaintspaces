import React, { useState } from "react";
import { MdPhonelinkLock } from "react-icons/md";
import { MdOutlineKeyboardAlt } from "react-icons/md";
import { RiDoorLockBoxLine } from "react-icons/ri";
import { GrUserWorker } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io"; //Common icon in checkin and checkout
// Checkout icons began here
import { PiTowelDuotone } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { MdLockOpen } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { VscRequestChanges } from "react-icons/vsc";
import { FaClock } from "react-icons/fa";

const CheckInInstructions = () => {
  const [selectedMethod, setSelectedMethod] = useState("smartlock");

  const options = [
    {
      item: "smartlock",
      data: "Guests will use a code or app to open a wifi-connected lock.",
      icon: <MdPhonelinkLock size={24} />,
    },
    {
      item: "keypad",
      data: "Guests will use the code you provide to open an electronic lock.",
      icon: <MdOutlineKeyboardAlt size={24} />,
    },
    {
      item: "lockbox",
      data: "Guests will use a code you provide to open a small safe that has a key inside.",
      icon: <RiDoorLockBoxLine size={24} />,
    },
    {
      item: "staff",
      data: "Someone will be available 24 hours a day to let guests in.",
      icon: <GrUserWorker size={24} />,
    },
  ];
  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4">
      {/* Left Panel */}
      <div className="md:w-2/3 px-16 flex flex-col mt-4">
        <div className="flex space-x-4 items-center">
          <IoMdArrowRoundBack size={24} />
          <h2 className="text-3xl font-bold">Select a check-in method</h2>
        </div>
        <div className="space-y-8 mt-8 w-full">
          {options &&
            options.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedMethod === item?.item
                    ? "border-black"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedMethod(item?.item)}
              >
                {item?.icon}
                <span className="my-4 text-xl font-semibold capitalize">
                  {item?.item}
                </span>
                <p className="text-gray-500">{item?.data}</p>
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
};

const CheckoutInstructions = () => {
  const [checkoutInstructions, setCheckoutInstructions] = useState([]);
  const [selectedInstruction, setSelectedInstruction] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [text, setText] = useState("");

  const changeText = (e) => {
    setText(e.target.value);
  };
  console.log("checkoutInstructions", checkoutInstructions);

  const instructionSet = [
    {
      option: "Gather used towels",
      icon: <PiTowelDuotone size={28} />,
    },
    {
      option: "Throw rubbish away",
      icon: <FaRegTrashAlt size={24} />,
    },
    {
      option: "Turn things off",
      icon: <FaPowerOff size={24} />,
    },
    {
      option: "Lock up",
      icon: <MdLockOpen size={28} />,
    },
    {
      option: "Return keys",
      icon: <IoKeyOutline size={28} />,
    },
    {
      option: "Additional requests",
      icon: <VscRequestChanges size={28} />,
    },
  ];

  const addInstruction = () => {
    const existingInstructionIndex = checkoutInstructions.findIndex(
      (inst) => inst.instruction === selectedInstruction
    );
    if (existingInstructionIndex !== -1) {
      const updatedInstructions = [...checkoutInstructions];
      updatedInstructions[existingInstructionIndex].details = text;
      setCheckoutInstructions(updatedInstructions);
    } else {
      setCheckoutInstructions([
        ...checkoutInstructions,
        { instruction: selectedInstruction, details: text },
      ]);
    }
    setShowTextArea(false);
    setShowInstructions(false);
    setSelectedInstruction("");
    setText("");
  };

  return (
    <div className="flex p-4 mt-4">
      <div className="flex flex-col space-y-12 w-2/3 px-32 py-4 border-r">
        <div className="flex space-x-4 items-center">
          <IoMdArrowRoundBack size={24} />
          <h2 className="text-3xl font-bold">Checkout Instructions</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Explain what’s essential for guests to do before they leave. Anyone
          can read these before they book.{" "}
          <span className="cursor-pointer font-bold underline">
            Learn More.
          </span>
        </p>
        <button
          className="text-black text-md px-4 py-3 mb-4 font-medium rounded-md border-[1px] border-black"
          onClick={() => {
            setShowInstructions(true);
            setShowTextArea(false);
          }}
        >
          + Add instructions
        </button>
        {checkoutInstructions.map((instruction, index) => (
          <div
            key={index}
            className="flex flex-col items-start space-y-2 px-4 py-4 font-semibold rounded-md border-[1px] border-gray-300 hover:border-black"
            onClick={() => {
              setSelectedInstruction(instruction?.instruction);
              setText(instruction?.details);
              setShowTextArea(true);
              setShowInstructions(false);
            }}
          >
            <div className="flex items-center space-x-2">
              {instruction.instruction === "Gather used towels" && (
                <PiTowelDuotone size={28} />
              )}
              {instruction.instruction === "Throw rubbish away" && (
                <FaRegTrashAlt size={24} />
              )}
              {instruction.instruction === "Turn things off" && (
                <FaPowerOff size={24} />
              )}
              {instruction.instruction === "Lock up" && (
                <MdLockOpen size={28} />
              )}
              {instruction.instruction === "Return keys" && (
                <IoKeyOutline size={28} />
              )}
              {instruction.instruction === "Additional requests" && (
                <VscRequestChanges size={28} />
              )}
              <span>{instruction?.instruction}</span>
            </div>
            <button className="text-black text-md">
              {instruction?.details}
            </button>
          </div>
        ))}
      </div>
      <div className="w-1/3 p-4">
        {showInstructions && (
          <>
            <h3 className="text-3xl font-bold">Choose an instruction</h3>
            <div className="flex flex-col space-y-4 mt-8">
              {instructionSet
                .filter(
                  (item) =>
                    !checkoutInstructions.some(
                      (inst) => inst.instruction === item.option
                    )
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 px-4 py-4 font-semibold rounded-md border-[1px] border-gray-300 hover:border-black"
                    onClick={() => {
                      setSelectedInstruction(item?.option);
                      setShowInstructions(false);
                      setShowTextArea(true);
                    }}
                  >
                    {item?.icon}
                    <button className="text-black text-md ">
                      {item?.option}
                    </button>
                  </div>
                ))}
              <button
                className="cursor-pointer"
                onClick={() => {
                  setShowInstructions(false);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
        {showTextArea && (
          <>
            <h2 className="text-2xl font-bold mb-4 capitalize">
              {selectedInstruction}
            </h2>
            <textarea
              className="w-full p-2 rounded-lg"
              rows="20"
              placeholder={`140 characters available \nAdd optional details.`}
              value={text}
              onChange={changeText}
            />
            <div className="flex space-x-2 items-center mt-4 pb-8 border-b border-gray-300">
              <FaClock color={"#808080"} />
              <p className="text-gray-500">
                Shared at 5pm the afternoon before checkout
              </p>
            </div>
            <div className="flex justify-between items-center mt-8">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg mr-2"
                onClick={() => {
                  setShowInstructions(false);
                  setShowTextArea(false);
                  setSelectedInstruction("");
                  setText("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded-lg"
                onClick={addInstruction}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function test() {
  return (
    <>
      {/* <CheckInInstructions /> */}
      <CheckoutInstructions />
    </>
  );
}
