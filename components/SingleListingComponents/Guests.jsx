import { useEffect, useRef } from "react";
import GuestsPicker from "../Pickers/GuestsPicker";

const Guests = ({ selection, setSelection, result, guests, setGuests }) => {
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelection(null); // Close the GuestsPicker if clicking outside
    }
  };

  useEffect(() => {
    if (selection === "guests") {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selection]);

  return (
    <div className="p-3 relative select-none" ref={containerRef}>
      <div
        className="cursor-pointer"
        onClick={() =>
          setSelection((prev) => (prev === "guests" ? null : "guests"))
        }
      >
        <span className="block text-xs font-semibold">GUESTS</span>
        <span className="block font-medium mt-1">{result || "Add guests"}</span>
      </div>
      {selection === "guests" && (
        <div className="absolute top-full left-0 w-full">
          <GuestsPicker
            css={
              "rounded-lg border border-lightBorderColor shadow px-5 bg-white"
            }
            guests={guests}
            setGuests={setGuests}
          />
        </div>
      )}
    </div>
  );
};

export default Guests;
