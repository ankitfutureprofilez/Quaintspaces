import React, { useEffect, useState } from 'react';

function MapComponent() {
  const [markerPosition, setMarkerPosition] = useState({ lat: 26.9124, lng: 75.7873 }); // Default position: Jaipur
  const [inputLocation, setInputLocation] = useState('');

  useEffect(() => {
    // Load Google Maps API script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      document.head.removeChild(script);
    }
  }, []);

  function initializeMap() {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: markerPosition,
    });

    const marker = new window.google.maps.Marker({
      position: markerPosition,
      map: map,
      draggable: true,
    });

    // Event listener for marker dragend event
    window.google.maps.event.addListener(marker, 'dragend', function(event) {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    });

    // Convert input location to coordinates and set marker position
    if (inputLocation) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: inputLocation }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          setMarkerPosition({ lat: location.lat(), lng: location.lng() });
          map.setCenter(location);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }

  const handleInputChange = (event) => {
    setInputLocation(event.target.value);
  }

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px', marginTop: '10px' }}></div>
    </div>
  );
}

export default MapComponent;
