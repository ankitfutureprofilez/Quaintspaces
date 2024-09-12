import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  parse,
  startOfToday,
} from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { days as Days } from "../../utils/datePickerUtils";
import Button from "../Button";

const DatePicker = ({
  selectedDay,
  setSelectedDay,
  selectEnd,
  setSelectEnd,
  css,
  footer = false,
  datePickerFunction = null,
}) => {
  const today = startOfToday();
  const [hoveredDate, setHoveredDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [nextMonthState, setNextMonth] = useState(
    add(firstDayCurrentMonth, { months: 1 })
  );

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  let nextMonthDays = eachDayOfInterval({
    start: nextMonthState,
    end: endOfMonth(nextMonthState),
  });

  function previousMonth() {
    if (width < 767) {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
      setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));

      let firstDayNextNextMonth = add(nextMonthState, { months: -1 });
      setNextMonth(firstDayNextNextMonth);
    } else {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -2 });
      setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));

      let firstDayNextNextMonth = add(nextMonthState, { months: -2 });
      setNextMonth(firstDayNextNextMonth);
    }
  }

  useEffect(() => {
    if (selectedDay === null && selectEnd === null) {
    }
  }, [selectedDay, selectEnd]);

  const [width, setWidth] = useState();
  function setWid() {
    setWidth(window && window.innerWidth);
  }
  useEffect(() => {
    window && window.addEventListener("resize", setWid);
    setWid();
  }, []);

  function nextMonth() {
    if (width < 767) {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
      setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
      let firstDayNextNextMonth = add(nextMonthState, { months: 1 });
      setNextMonth(firstDayNextNextMonth);
    } else {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 2 });
      setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));

      let firstDayNextNextMonth = add(nextMonthState, { months: 2 });
      setNextMonth(firstDayNextNextMonth);
    }
  }

  return (
    <div
      className={`${css ||
        "date-picker w-full relative z-10 mx-auto shadow border border-gray-300 bg-white rounded-3xl px-8 py-8"
        }`}
    >
      <div className="flex gap-6 p-2">
        <div className="sm:block hidden w-full">
          <div className="flex items-center">
            <h2 className="flex-auto font-semibold text-gray-900 text-center">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
          </div>
          <div className="grid grid-cols-7 mt-10 text-xs leading-6 font-semibold text-center text-gray-500">
            {Days?.map((day) => (
              <div key={uuidv4()}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 mt-2 text-sm">
            {days?.map((day, dayIdx) => {
              const isDisabled = isBefore(day, today);
              return (
                <Button
                  key={uuidv4()}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  selectEnd={selectEnd}
                  setSelectEnd={setSelectEnd}
                  firstDayCurrentMonth={firstDayCurrentMonth}
                  day={day}
                  dayIdx={dayIdx}
                  setHoveredDate={setHoveredDate}
                  hoveredDate={hoveredDate}
                  isDisabled={isDisabled}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center">
            <h2 className="flex-auto font-semibold text-gray-900 text-center">
              {width < 767
                ?format(nextMonthState, "MMM-yyyy")
                : format(nextMonthState, "MMM-yyyy")}
            </h2>

            <button
              type="button"
              onClick={previousMonth}
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-7 mt-10 text-xs leading-6 font-semibold text-center text-gray-500">
            {Days?.map((day) => (
              <div key={uuidv4()}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 mt-2 text-sm">
            {nextMonthDays?.map((day, dayIdx) => {
              const isDisabled = isBefore(day, today);
              return (
                <Button
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  selectEnd={selectEnd}
                  setSelectEnd={setSelectEnd}
                  firstDayCurrentMonth={firstDayCurrentMonth}
                  day={day}
                  key={uuidv4()}
                  dayIdx={dayIdx}
                  setHoveredDate={setHoveredDate}
                  hoveredDate={hoveredDate}
                  isDisabled={isDisabled}
                />
              );
            })}
          </div>
        </div>
      </div>
      {footer && typeof datePickerFunction === "function" && (
        <div className="flex justify-end gap-6 mt-3 mb-2 mr-2 ">
          <button
            onClick={(e) => {
              e.preventDefault();
              setSelectedDay(null);
              setSelectEnd(null);
            }}
            className="text-sm underline text-blackColor capitalize"
          >
            Clear Dates
          </button>

          <button
            onClick={() => datePickerFunction()}
            className="rounded-md border border-gray-700 bg-black text-white transition duration-200 px-4 py-2 text-sm"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};
export default DatePicker;
