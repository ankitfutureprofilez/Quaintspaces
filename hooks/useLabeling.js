import { useEffect, useState } from "react";

const useLabeling = (guests) => {
  const [result, setResult] = useState("");

  useEffect(() => {
    const totalGuests = guests.adults.value + guests.children.value;
    const guestLabel = totalGuests === 1 ? "guest" : "guests";
    let label = "";

    if (totalGuests > 0) {
      label = `${totalGuests} ${guestLabel}`;
    }

    if (guests.infants.value) {
      label += `, ${guests.infants.value} infant${guests.infants.value > 1 ? "s" : ""}`;
    }

    if (guests.pets.value) {
      label += `, ${guests.pets.value} pet${guests.pets.value > 1 ? "s" : ""}`;
    }

    setResult(label || null);
  }, [guests]);

  return result;
};

export default useLabeling;
