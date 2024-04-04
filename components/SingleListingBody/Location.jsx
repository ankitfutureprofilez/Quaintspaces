import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Location = React.forwardRef(({ listing }, ref) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  let record;
  try {
    record = JSON.parse(JSON.parse(listing?.location));
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  
  
  // const center = {
  //   lat: parseFloat(record?.latitude),
  //   lng: parseFloat(record?.longitude),
  // };
 
  const center =  {
    lat:26.9372,
    lng:75.7993,
  };


  console.log("center",center)
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });
  return (
    <div ref={ref} className="py-8">
      <h1 className="text-2xl mb-4 font-semibold">Location</h1>
      <p className="text-md mb-4">{listing.lt}</p>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          mapContainerClassName="map max-h-[500px]"
          center={center}
          zoom={15}
        >
          <Marker position={center} />
        </GoogleMap>
      )}
    </div>
  );
});

export default React.memo(Location);
