import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Times from "../../public/_svgs/Times";
import Star from "../../public/_svgs/star";
import Image from "next/image";

const Info = React.forwardRef(({ listing, loading, handleClick }, ref) => {
  const [amenitiesModal, setAmenitiesModal] = useState(false);

  console.log("amenities", listing)
  function capitalizeAndReplace(inputString) {
    let words = inputString && inputString?.split("_");
    for (let i = 0; i < words?.length; i++) {
      words[i] = words[i]?.charAt(0)?.toUpperCase() + words[i]?.slice(1);
    }
    let result = words?.join(" ");
    return result;
  }
  const stringToArray = (str) => {
    // Split the string by commas and trim each element to remove any leading or trailing spaces
    return str && str?.split(",")?.map((item) => item?.trim());
  };

  useEffect(() => {
    if (amenitiesModal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [amenitiesModal]);

  return (
    <div className="w-full">
      <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4 pb-6">
        <div className="flex-1 h-full">
          {loading ? (
            <div className="h-7 mb-2 rounded-md bg-lightBorderColor w-7/12"></div>
          ) : (
            <h1 className="text-lg md:text-2xl mb-2 font-semibold">
              {listing?.data?.lt}
            </h1>
          )}
          {loading ? (
            <div className="h-7 mb-2 rounded-md bg-lightBorderColor w-4/12"></div>
          ) : (
            <>
              <div className="flex items-center gap-1 text-md">
                {capitalizeAndReplace(listing?.data?.type)}
                {" . "}
                {listing?.data?.guests > 0 && `${listing?.data?.guests} Guests`}
                {" · "}
                {listing?.data?.no_of_pet_allowed > 0 &&
                  `${listing?.data?.no_of_pet_allowed} Pets`}
                {" · "}
                {listing?.data?.bedrooms > 0 &&
                  `${listing?.data?.bedrooms} Bedrooms`}
                {" · "}
                {listing?.data?.beds > 0 && `${listing?.data?.beds} Beds`}
              </div>

              <div className="flex items-center gap-2 text-md">
                <span className="flex gap-1 items-center text-md font-medium">
                  <span>
                    <Star />
                  </span>
                  {parseFloat(
                    listing?.data?.rating && listing?.data?.rating?.toFixed(2)
                  )}
                </span>
                <div className="hidden">·</div>
                <span
                  className="underline text-md font-medium cursor-pointer"
                  onClick={handleClick}
                >
                  {listing && listing.data && listing.data.review > 0 ? (
                    <>{listing.data.review} Review</>
                  ) : "No Review"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="py-8 border-y border-darkBorderColor">
        {loading ? (
          <div className="w-full h-7  bg-lightBorderColor rounded-md"></div>
        ) : (
          <p className="text-md text-lightTextColor break-all">
            {listing?.data?.description}
          </p>
        )}
      </div>
      <div className="py-8" ref={ref}>
        <h1 className="text-2xl mb-4 font-semibold">What this place offers?</h1>
        {/* <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex">
            01
            </div>
        </div> */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {listing?.data?.amenities &&
            listing?.data?.amenities
              ?.split(",")
              ?.slice(0, 6) // Limit to first 6 elements
              ?.map((amenity) => (
                <div className="flex items-center mt-4" key={amenity?.trim()}>
                  <Image
                    src={`/icons/${amenity
                      ?.toLowerCase()
                      ?.trim()
                      ?.replaceAll(" ", "_")}.png`}
                    alt="amenity icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="ms-1">{formatAmenities(amenity)}</span>
                </div>
              ))}

          {listing?.data?.standout_amenity &&
            listing?.data?.standout_amenity
              ?.split(",")
              ?.slice(0, 6) // Limit to first 6 elements
              ?.map((amenity) => (
                <div className="flex items-center mt-4" key={amenity?.trim()}>
                  <Image
                    src={`/icons/${amenity
                      ?.toLowerCase()
                      ?.trim()
                      ?.replaceAll(" ", "_")}.png`}
                    alt="amenity icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="ms-1">{formatAmenities(amenity)}</span>
                </div>
              ))}
        </div>
        <button
          className="btn-normal mt-8 capitalize"
          onClick={() => setAmenitiesModal(true)}
        >
          See all{" "}
          {
            (() => {
              const amenitiesLength = stringToArray((listing && listing?.data && listing?.data?.amenities) || "").length;
              const standoutAmenityLength = stringToArray((listing && listing?.data && listing?.data?.standout_amenity) || "").length;
              return amenitiesLength + standoutAmenityLength;
            })()
          }
          {" "}
          amenities
        </button>

        {amenitiesModal && (
          <AmenitiesModal
            amenities={stringToArray(listing?.data?.amenities)}
            standout_amenity={stringToArray(listing?.data?.standout_amenity)}
            setAmenitiesModal={setAmenitiesModal}
          />
        )}
      </div>
    </div>
  );
});

export default React.memo(Info);
function formatAmenities(input) {
  // Replace underscores with spaces and split by commas or hyphens
  const words = input?.replace(/_/g, " ")?.split(/,|-/);

  // Capitalize the first letter of each word
  const formattedWords = words?.map((word) => {
    return word?.charAt(0)?.toUpperCase() + word?.slice(1);
  });

  // Join the words back together with commas and return the formatted string
  return formattedWords?.join(", ");
}

const AmenitiesModal = ({ amenities, setAmenitiesModal, standout_amenity }) => {
  return (
    <div className="fixed w-screen h-screen inset-0 z-30 flex items-center justify-center px-2">
      <div
        className="fixed top-0 left-0 w-full h-full z-30 bg-black bg-opacity-40"
        onClick={() => setAmenitiesModal(false)}
      ></div>
      <div className="w-[50rem] h-full max-h-[calc(100vh-110px)] bg-white z-40 relative rounded-xl animation_primary">
        <header className="flex items-center py-6 px-4">
          <button
            className="absolute right-[23px] top-[20px]"
            onClick={() => setAmenitiesModal(false)}>
            <Times />
          </button>
        </header>
        <main className="h-full w-full max-h-[calc(100vh-180px)] pt-3 md:pt-6 overflow-auto px-4">
          <h1 className="text-2xl font-semibold">What this place offers?</h1>
          <div className="h-full w-full">
            {amenities?.map((e) => (
              <li
                className="w-full py-4 md:py-6 border-b border-borderColor flex gap-2 items-center my-2"
                key={uuidv4()}
              >
                <Image
                  src={`/icons/${e
                    ?.toLowerCase()
                    ?.trim()
                    ?.replaceAll(" ", "_")}.png`}
                  alt="amenity icon"
                  width={24} // adjust width as needed
                  height={24} // adjust height as needed
                  className="w-6 h-6 mt-1"
                />
                {formatAmenities(e)}
              </li>
            ))}

            {standout_amenity?.map((e) => (
              <li
                className="w-full py-4 md:py-6 border-b border-borderColor flex gap-2 items-center my-2"
                key={uuidv4()}
              >
                <Image
                  src={`/icons/${e
                    ?.toLowerCase()
                    ?.trim()
                    ?.replaceAll(" ", "_")}.png`}
                  alt="amenity icon"
                  width={24} // adjust width as needed
                  height={24} // adjust height as needed
                  className="w-6 h-6 mt-1"
                />
                {formatAmenities(e)}
              </li>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
