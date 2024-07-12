import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

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

  // URL to the home icon
  const homeIconUrl =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 3.172l-32 32 4 4 2-2v20h24v-14h8v14h24v-20l2 2 4-4z' fill='%23efa3a3'/%3E%3C/svg%3E";

  // Define the options conditionally
  const mapOptions = 
     {
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
              url: homeIconUrl,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
});

export default React.memo(Location);
