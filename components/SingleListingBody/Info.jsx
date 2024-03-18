import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Times from "../../public/_svgs/Times";
import Star from "../../public/_svgs/star";

const Info = React.forwardRef(({ listing }, ref) => {
  const [amenitiesModal, setAmenitiesModal] = useState(false);

  const stringToArray= (str) => {
    // Split the string by commas and trim each element to remove any leading or trailing spaces
    return str.split(',').map(item => item.trim());
}

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
          {listing.loading ? (
            <div className="h-7 mb-2 rounded-md bg-lightBorderColor w-7/12"></div>
          ) : (
            <h1 className="text-lg md:text-2xl mb-2 font-semibold">
              {listing.data?.lt}
            </h1>
          )}
          {listing.loading ? (
            <div className="h-7 mb-2 rounded-md bg-lightBorderColor w-4/12"></div>
          ) : (
            <>
              <div className="flex items-center gap-1 text-md">
                {listing.data?.guests} guests{" · "}
                {listing.data?.children > 0 &&
                  `${listing.data?.guests} pets`}
                {" · "}
                {listing.data?.bedrooms} bedrooms {" · "} {listing.data?.beds}{" "}
                beds
              </div>
              <div className="flex items-center gap-2 text-md">
                <span className="flex gap-1 items-center text-md font-medium">
                  <span>
                    <Star />
                  </span>
                  {/* {listing.data?.rating} */}
                  5.0
                </span>
                <div className="hidden">·</div>
                <span className="underline text-md font-medium">
                  {listing.data?.reviews?.length || 0} review
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="py-8 border-y border-darkBorderColor">
        {listing.loading ? (
          <div className="w-full h-7 bg-lightBorderColor rounded-md"></div>
        ) : (
          <p className="text-md text-lightTextColor">{listing.data?.description}</p>
        )}
      </div>
      <div className="py-8" ref={ref}>
        <h1 className="text-2xl mb-4 font-semibold">What this place offers?</h1>
        <ul className="block md:flex flex-wrap">
          {listing.data?.amenities &&
            listing.data.amenities.split(',').map((amenity) => (
              <li
                className="w-[calc(100%/2-10px)] flex gap-2 my-2 py-2 md:py-0"
                key={amenity.trim()}
              >
                <img
                  src={`/icons/${amenity
                    .toLowerCase()
                    .trim()
                    .replaceAll(" ", "_")}.png`}
                  className="w-6 h-6 mt-1"
                  alt=""
                />
                {amenity}
              </li>
            ))}
        </ul>
        <button
          className="btn-normal mt-8"
          onClick={() => setAmenitiesModal(true)}
        >
          See all {listing.data?.amenities?.length} amenities
        </button>
        {amenitiesModal && (
          <AmenitiesModal
            amenities={listing.data?.amenities}
            setAmenitiesModal={setAmenitiesModal}
          />
        )}
      </div>
    </div>
  );
  
});

export default React.memo(Info);

const AmenitiesModal = ({ amenities, setAmenitiesModal }) => {
  return (
    <div className="fixed w-screen h-screen inset-0 z-30 flex items-center justify-center">
      <div
        className="fixed top-0 left-0 w-full h-full z-30 bg-black bg-opacity-40"
        onClick={() => setAmenitiesModal(false)}
      ></div>
      <div className="w-[50rem] h-full max-h-[calc(100vh-110px)] bg-white z-40 relative rounded-xl animation_primary">
        <header className="flex items-center py-6 px-4">
          <button onClick={() => setAmenitiesModal(false)}>
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
                <img
                  src={`/icons/${e
                    .toLowerCase()
                    .trim()
                    .replaceAll(" ", "_")}.png`}
                  className="w-6 h-6"
                  alt=""
                />
                {e}
              </li>
            ))}
            {amenities?.map((e) => (
              <li
                className="w-full py-6 border-b border-borderColor flex gap-2 items-center my-2"
                key={uuidv4()}
              >
                <img
                  src={`/icons/${e
                    .toLowerCase()
                    .trim()
                    .replaceAll(" ", "_")}.png`}
                  className="w-6 h-6"
                  alt=""
                />
                {e}
              </li>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
