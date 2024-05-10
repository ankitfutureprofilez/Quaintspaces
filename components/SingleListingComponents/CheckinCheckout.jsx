import { format } from "date-fns";
import { useEffect, useState } from "react";

const CheckinCheckOut = ({ setSelection, rounded, selectedDay, selectEnd }) => {

  const [dates, setDates] = useState({
    selectedDay: null,
    selectEnd: null,
  });

  useEffect(() => {
      setDates({
        selectedDay: selectedDay,
        selectEnd: selectEnd,
      });
  }, [selectedDay, selectEnd]);

  const handleClearDates = () => {
    setDates({
      selectedDay: null,
      selectEnd: null,
    });
  };

  return (
    <div
      className={`flex border-b border-orange-300 w-full ${
        rounded ? "rounded-lg" : ""
      }`}
    >
      <div
        className={`w-1/2 p-3 relative z-10 select-none cursor-pointer border-r border-orange-300`}
        onClick={() => setSelection((prev) => (prev === "date" ? null : "date"))}
      >
        <span className="block text-xs font-semibold">CHECK IN</span>
        <span className="block font-medium mt-1">
          {dates?.selectedDay ? (
            <div className="text-sm font-semibold mt-2">
              <span>
                {dates?.selectedDay?.toLocaleString("en-US", { weekday: "long" })}
              </span>
              <div>
                <span>{dates?.selectedDay?.getDate()}{" "}</span>
                <span>
                  {dates?.selectedDay?.toLocaleString("en-US", { month: "long" })}
                </span>
                <span>{","}{dates?.selectedDay?.getFullYear()}</span>
              </div>
            </div>
          ) : (
            <span onClick={handleClearDates}>Add date</span>
          )}
        </span>
      </div>
      <div
        className={`w-1/2 p-3 relative z-10 select-none cursor-pointer`}
        onClick={() => setSelection((prev) => (prev === "date" ? null : "date"))}
      >
        <span className="block text-xs font-semibold">CHECK OUT</span>
        <span className="block font-medium mt-1">
          {dates?.selectEnd ? (
             <div className="text-sm font-semibold mt-2">
              <span>
                {dates?.selectEnd?.toLocaleString("en-US", { weekday: "long" })}
              </span>
              <div>
                <span>{dates?.selectEnd?.getDate()}{" "}</span>
                <span>
                  {dates?.selectEnd?.toLocaleString("en-US", { month: "long" })}
                </span>
                <span>{","}{dates?.selectEnd?.getFullYear()}</span>
              </div>
            </div>
          ) : (
            <span onClick={handleClearDates}>Add date</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default CheckinCheckOut;


