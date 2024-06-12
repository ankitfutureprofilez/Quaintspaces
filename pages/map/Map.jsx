import React, { useState, useEffect } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';

Geocode?.setApiKey('AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58');
Geocode?.enableDebug();

const Map = (props) => {
  const [address, setAddress] = useState('Future profilez');
  const [city, setCity] = useState('jaipur');
  const [area, setArea] = useState('bani park');
  const [state, setState] = useState('Rajasthan');
  const [mapPosition, setMapPosition] = useState({
    lat: props.center.lat,
    lng: props.center.lng,
  });
  const [markerPosition, setMarkerPosition] = useState({
    lat: props.center.lat,
    lng: props.center.lng,
  });

  useEffect(() => {
    Geocode?.fromLatLng(mapPosition.lat, mapPosition.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        const addressArray = response.results[0].address_components;
        setAddress(address || '');
        setCity(getCity(addressArray) || '');
        setArea(getArea(addressArray) || '');
        setState(getState(addressArray) || '');
      },
      (error) => {
        console.error(error);
      }
    );
  }, [mapPosition]);

  const getCity = (addressArray) => {
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        return addressArray[i].long_name;
      }
    }
    return '';
  };

  const getArea = (addressArray) => {
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
            return addressArray[i].long_name;
          }
        }
      }
    }
    return '';
  };

  const getState = (addressArray) => {
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
        return addressArray[i].long_name;
      }
    }
    return '';
  };

  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        const addressArray = response.results[0].address_components;
        setAddress(address || '');
        setCity(getCity(addressArray) || '');
        setArea(getArea(addressArray) || '');
        setState(getState(addressArray) || '');
        setMarkerPosition({ lat: newLat, lng: newLng });
        setMapPosition({ lat: newLat, lng: newLng });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const onPlaceSelected = (place) => {
    const address = place.formatted_address;
    const addressArray = place.address_components;
    const latValue = place.geometry.location.lat();
    const lngValue = place.geometry.location.lng();
    setAddress(address || '');
    setCity(getCity(addressArray) || '');
    setArea(getArea(addressArray) || '');
    setState(getState(addressArray) || '');
    setMarkerPosition({ lat: latValue, lng: lngValue });
    setMapPosition({ lat: latValue, lng: lngValue });
  };

  const AsyncMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={props.zoom}
        defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
      >
        <InfoWindow
          onClose={() => {}}
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
        <Marker />
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
          <input
            type="text"
            name="city"
            className="form-control"
            value={city}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Area</label>
          <input
            type="text"
            name="area"
            className="form-control"
            value={area}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="">State</label>
          <input
            type="text"
            name="state"
            className="form-control"
            value={state}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={address}
            readOnly
          />
        </div>
      </div>

      <AsyncMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${'AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58'}&libraries=places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: props.height }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default Map;
