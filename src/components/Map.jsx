import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const apiKey = import.meta.env.VITE_MAP_API_KEY;

const containerStyle = {
  width: '100wh',
  height: '600px',
};

const center = {
  lat: 49.990439,
  lng: 36.229802,
};

function MyComponent() {
  const [map, setMap] = React.useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(10);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}>
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
