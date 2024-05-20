import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.39094933041195,
  lng: -122.02503913145092,
};

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  const [markerPosition, setMarkerPosition] = useState(center);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [infoWindowContent, setInfoWindowContent] = useState("");

  const onMarkerDragEnd = useCallback((event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    setInfoWindowPosition(newPosition);
    setInfoWindowContent(`Pin dropped at: ${newPosition.lat}, ${newPosition.lng}`);
  }, []);

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          mapId="4504f8b37365c3d0"
        >
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={onMarkerDragEnd}
            title="This marker is draggable."
          />
          {infoWindowPosition && (
            <InfoWindow
              position={infoWindowPosition}
              onCloseClick={() => setInfoWindowPosition(null)}
            >
              <div>{infoWindowContent}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MapComponent;
