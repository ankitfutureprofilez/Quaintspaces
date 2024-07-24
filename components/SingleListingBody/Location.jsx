import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MdApartment } from "react-icons/md";
const Location = React.forwardRef(({ listing }, ref) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  let record;
  try {
    record = JSON?.parse(JSON?.parse(listing?.location));
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  const center = {
    lat: parseFloat(record?.latitude),
    lng: parseFloat(record?.longitude),
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  // SVG string for the apartment icon
  const svgString = `
    <svg stroke="#efa3a3" fill="#000000" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z"></path></svg>
  `;
  const encodedSvg = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString);

  // Define the options conditionally
  const mapOptions = {
    zoomControl: false, // Disable zoom control UI
    gestureHandling: 'none', // Disable all gestures
  };

  return (
    <div ref={ref} className="py-8">
      <h1 className="text-2xl mb-4 font-semibold">Location</h1>
      <p className="text-md mb-4">{listing?.lt}</p>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          mapContainerClassName="map max-h-[500px]"
          center={center}
          zoom={15}
          options={mapOptions} // Apply the conditional options
        >
          <Marker
            position={center}
            icon={{
              url: encodedSvg,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
});

export default React.memo(Location);
