import { differenceInDays, format } from "date-fns";
import DatePicker from "../Pickers/DatePicker";
import CheckinCheckOut from "./CheckinCheckout";

const Dates = ({
  selection,
  setSelection,
  selectedDay,
  setSelectedDay,
  selectEnd,
  setSelectEnd,
  position,
}) => {

  return (
    
    <>
      <CheckinCheckOut
        setSelection={setSelection}
        rounded={false}
        selectedDay={selectedDay}
        selectEnd={selectEnd}
      />

      {selection === "date" && (
        <div className={`absolute z-20 ${position} w-[24rem] shadow-2xl sm:w-[48rem] z-10 bg-white p-6 rounded-xl border-main pt-32`}>
          <div className="flex flex-col sm:absolute sm:top-8 sm:right-8 rounded-lg border border-b-0 border-[#efa3a3] flex w-[22.1rem]">
            <CheckinCheckOut
              setSelection={setSelection}
              rounded={true}
              selectedDay={selectedDay}
              selectEnd={selectEnd}
            />
          </div>

          <div className="absolute top-8 left-8">
          <h1 className="text-xl font-semibold">
  {(selectedDay && selectEnd && (
    differenceInDays(selectEnd, selectedDay) === 1
      ? "1 night"
      : differenceInDays(selectEnd, selectedDay) + " nights"
  )) || "Select dates"}
</h1>

            <p className="text-sm mt-1 text-lightTextColor font-normal">
              {(selectedDay &&
                selectEnd &&
                format(selectedDay, "MMM-dd,yyyy") +
                  " - " +
                  format(selectEnd, "MMM-dd,yyyy")) ||
                "Add your travel dates for exact pricing"}
            </p>
          </div>
          <DatePicker
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectEnd={selectEnd}
            setSelectEnd={setSelectEnd}
            css={"bg-white border-2"}
            footer={true}
            datePickerFunction={() => setSelection(null)}
          />
        </div>
      )}
    </>
  );
};

export default Dates;
