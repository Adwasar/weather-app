import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';

import DataContext from '../../context';
import styles from './Map.module.scss';

const apiKey = import.meta.env.VITE_MAP_API_KEY;

function Map() {
  const [markerPosition, setMarkerPosition] = useState({ lat: 50.450939, lng: 30.522594 });
  const [center, setCenter] = useState('');

  const dataContext = React.useContext(DataContext);

  Geocode.setApiKey(apiKey);
  Geocode.setLanguage('ru');

  const containerStyle = {
    width: '100%',
    height: '600px',
  };

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

  useEffect(() => {
    setCenter({
      lat: markerPosition.lat,
      lng: markerPosition.lng,
    });

    if (markerPosition) {
      Geocode.fromLatLng(markerPosition.lat, markerPosition.lng).then(
        (response) => {
          let city, state;
          for (let i = 0; i < response.results[0].address_components.length; i++) {
            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
              switch (response.results[0].address_components[i].types[j]) {
                case 'locality':
                  city = response.results[0].address_components[i].long_name;
                  break;
                case 'administrative_area_level_1':
                  state = response.results[0].address_components[i].long_name;
                  break;
              }
            }
          }
          dataContext.setGeoName({ city, state });
        },
        (error) => {
          console.error(error);
        },
      );

      dataContext.setCoordinates(`${markerPosition.lat},${markerPosition.lng}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerPosition]);

  return (
    <div className={styles.container}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onLoad={onLoad}
          onClick={onMapClick}>
          {markerPosition ? <Marker position={markerPosition} /> : <></>}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Map;
