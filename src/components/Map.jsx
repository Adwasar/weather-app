import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const apiKey = import.meta.env.VITE_MAP_API_KEY;

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 49.990439,
  lng: 36.229802,
};

function Map() {
  const [markerPosition, setMarkerPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(10);
  }, []);

  const onMapClick = (e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onClick={onMapClick}>
      {markerPosition ? <Marker position={markerPosition} /> : <></>}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
