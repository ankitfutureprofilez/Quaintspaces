import React from "react";

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
  return (
    <>
      {/* <CheckInInstructions /> */}
      <InputGroups />
    </>
  );
}
