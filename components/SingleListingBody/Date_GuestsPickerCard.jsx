import React from "react";
import Star from "../../public/_svgs/star";
import Dates from "../SingleListingComponents/Dates";
import Guests from "../SingleListingComponents/Guests";
import { format } from "date-fns";
import BtnPrimary from "../Button/BtnPrimary";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Date_GuestsPickerCard = React.forwardRef(
  (
    {
      selection,
      setSelection,
      selectedDay,
      selectEnd,
      setSelectedDay,
      setSelectEnd,
      result,
      guests,
      setGuests,
      listing,
    },
    ref
  ) => {

    const router = useRouter();
    console.count("Card");


    return (
      <div className="sticky top-28 left-0 min-w-[25rem]">
        <div className="rounded-xl shadow border border-orange-300 p-5">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-md font-normal">
              <span className="font-medium text-orange-300 text-2xl">₹{listing?.price}</span> /night
            </h1>
            {/* <span className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Star />
                {listing?.rating}
              </span>
              <span>·</span>
              <span className="underline">
                {listing?.reviews?.length} reviews
              </span>
            </span> */}
          </div>

          <div className="rounded-lg border border-orange-300 mb-6 relative">
            <Dates
              selection={selection}
              setSelection={setSelection}
              selectedDay={selectedDay}
              selectEnd={selectEnd}
              setSelectedDay={setSelectedDay}
              setSelectEnd={setSelectEnd}
            />
            <Guests
              selection={selection}
              setSelection={setSelection}
              result={result}
              guests={guests}
              setGuests={setGuests}
            />
          </div>

          <div ref={ref}>
            <button
            className="filter mx-2 btn w-full "
              onClick={() => {
                if(selectedDay==null ||selectEnd==null)
                {
                  toast.error("Date not selected");
                  return;
                }
                // console.log("selectedDay",selectedDay)
                // console.log("selectEnd",selectEnd)
                router.push(
                  `/book/${encodeURIComponent(listing?.uuid)}?numberOfAdults=${guests.adults.value}&numberOfChildren=${guests.children.value}&numberOfInfants=${guests.infants.value}&numberOfPets=${guests.pets.value}&checkin=${format(selectedDay,"yyyy-MM-dd")}&checkout=${format(selectEnd, "yyyy-MM-dd")}`
                );
              }}
            >
              Check Availability
            </button>
            <button
            className="sort mx-2 btn w-full mt-4"
              // onClick={() => {
              //   router.push(
              //     `/book/${listing?._id}?numberOfAdults=${guests.adults.value}&numberOfChildren=${guests.children.value}&numberOfInfants=${guests.infants.value}&numberOfPets=${guests.pets.value}&checkin=${format(selectedDay,"yyyy-MM-dd")}&checkout=${format(selectEnd, "yyyy-MM-dd")}`
              //   );
              // }}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default Date_GuestsPickerCard;
