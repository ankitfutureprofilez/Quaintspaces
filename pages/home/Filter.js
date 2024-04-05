import React, { useState } from "react";
import format from "date-fns/format";
import RangeSlider from "./RangeSlider.js";
import { DatePicker, Dates } from "../../components/index.js";

export default function Filter({
  min,
  max,
  onChange,
  selection,
  setSelection,
  selectedDay,
  selectEnd,
  setSelectedDay,
  setSelectEnd,
  onClick,
}) {
  return (
    <div className="flex flex-col mx-auto max-w-md max-h-md rounded-lg px-6 pt-6">
      <div className="flex flex-col my-4">
        <h2 className="text-xl font-semibold mb-2">Check Availability</h2>
        <p>Nightly Prices Before Fees and Taxes</p>
      </div>
      <div className="flex justify-between space-x-8">
        <Dates
          selection={selection}
          setSelection={setSelection}
          selectedDay={selectedDay}
          selectEnd={selectEnd}
          setSelectedDay={setSelectedDay}
          setSelectEnd={setSelectEnd}
          position={`filter-calendar-position`}
        />
      </div>
      <div className="flex flex-col mt-4">
        <h2 className="text-xl font-semibold my-2">Price Range</h2>
        <p>Nightly prices before fees and taxes</p>
      </div>
      <RangeSlider min={min} max={max} onChange={onChange} />
      <button className="btn filter w-1/2 mx-auto " onClick={onClick}>
        Apply
      </button>
    </div>
  );
}
