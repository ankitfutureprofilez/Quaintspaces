return (
  isLoaded && (
    <GoogleMap
      mapContainerStyle={containerStyle}
      mapContainerClassName="map"
      center={center}
      zoom={10}
     draggable={true}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ scrollwheel: true }}
      onIdle={onIdle}
    >
      <Marker
        position={{ lat: 45.745, lng: 5.65 }}
        draggable={true} // Make the marker draggable
        onDragEnd={(e) => {
          // Handle drag end event
          const newLat = e.latLng.lat();
          const newLng = e.latLng.lng();
          // Do something with the new coordinates
          console.log("New Marker Position:", { lat: newLat, lng: newLng });
        }}
      />
    </GoogleMap>
  )
);
