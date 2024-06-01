import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, InfoWindow, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';

// Ensure Geocode is defined and set the API key
if (Geocode && Geocode.setApiKey) {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  Geocode.enableDebug();
} else {
  console.error("Geocode is not defined or setApiKey method is not available.");
}

const MapComponent = ({ center, height, zoom }) => {
  const [address, setAddress] = useState('suraj pole gate ');
  const [city, setCity] = useState('jaipur');
  const [area, setArea] = useState('near galta gate ');
  const [state, setState] = useState('rajasthan');
  const [mapPosition, setMapPosition] = useState({
    lat: center.lat,
    lng: center.lng,
  });
  const [markerPosition, setMarkerPosition] = useState({
    lat: center.lat,
    lng: center.lng,
  });

  const getCity = (addressArray) => {
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && addressArray[i].types[0] === 'administrative_area_level_2') {
        return addressArray[i].long_name;
      }
    }
    return '';
  };

  const getArea = (addressArray) => {
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (addressArray[i].types[j] === 'sublocality_level_1' || addressArray[i].types[j] === 'locality') {
            return addressArray[i].long_name;
          }
        }
      }
    }
    return '';
  };

  const getState = (addressArray) => {
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && addressArray[i].types[0] === 'administrative_area_level_1') {
        return addressArray[i].long_name;
      }
    }
    return '';
  };

  useEffect(() => {
    if (Geocode && Geocode.fromLatLng) {
      Geocode.fromLatLng(mapPosition.lat, mapPosition.lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          const addressArray = response.results[0].address_components;
          const city = getCity(addressArray);
          const area = getArea(addressArray);
          const state = getState(addressArray);

          setAddress(address || '');
          setArea(area || '');
          setCity(city || '');
          setState(state || '');
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [mapPosition.lat, mapPosition.lng]);

  const onMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();

    if (Geocode && Geocode.fromLatLng) {
      Geocode.fromLatLng(newLat, newLng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          const addressArray = response.results[0].address_components;
          const city = getCity(addressArray);
          const area = getArea(addressArray);
          const state = getState(addressArray);

          setAddress(address || '');
          setArea(area || '');
          setCity(city || '');
          setState(state || '');
          setMarkerPosition({ lat: newLat, lng: newLng });
          setMapPosition({ lat: newLat, lng: newLng });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const onPlaceSelected = (place) => {
    const address = place.formatted_address;
    const addressArray = place.address_components;
    const city = getCity(addressArray);
    const area = getArea(addressArray);
    const state = getState(addressArray);
    const latValue = place.geometry.location.lat();
    const lngValue = place.geometry.location.lng();

    setAddress(address || '');
    setArea(area || '');
    setCity(city || '');
    setState(state || '');
    setMarkerPosition({ lat: latValue, lng: lngValue });
    setMapPosition({ lat: latValue, lng: lngValue });
  };

  const AsyncMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
      >
        <InfoWindow
          position={{ lat: markerPosition.lat + 0.0018, lng: markerPosition.lng }}
        >
          <div>
            <span style={{ padding: 0, margin: 0 }}>{address}</span>
          </div>
        </InfoWindow>
        <Marker
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          position={{ lat: markerPosition.lat, lng: markerPosition.lng }}
        />
        <Autocomplete
          style={{
            width: '100%',
            height: '40px',
            paddingLeft: '16px',
            marginTop: '2px',
            marginBottom: '500px',
          }}
          onPlaceSelected={onPlaceSelected}
          types={['(regions)']}
        />
      </GoogleMap>
    ))
  );

  return (
    <div>
      <div>
        <div className="form-group">
          <label htmlFor="">City</label>
          <input type="text" name="city" className="form-control" readOnly value={city} />
        </div>
        <div className="form-group">
          <label htmlFor="">Area</label>
          <input type="text" name="area" className="form-control" readOnly value={area} />
        </div>
        <div className="form-group">
          <label htmlFor="">State</label>
          <input type="text" name="state" className="form-control" readOnly value={state} />
        </div>
        <div className="form-group">
          <label htmlFor="">Address</label>
          <input type="text" name="address" className="form-control" readOnly value={address} />
        </div>
      </div>

      <AsyncMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
};

export default MapComponent;
