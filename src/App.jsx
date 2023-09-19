import { useEffect, useState } from 'react';

import Header from './components/Header';
import Map from './components/Map';

import DataContext from './context';

const weatherApiName = import.meta.env.VITE_WEATHER_API_USERNAME;
const weatherApiPass = import.meta.env.VITE_WEATHER_API_PASSWORD;

function App() {
  const [markerPosition, setMarkerPosition] = useState({ lat: 50.450939, lng: 30.522594 });
  const [coordinates, setCoordinates] = useState('50.450939,30.522594');
  const [geoName, setGeoName] = useState({});
  const [date, setDate] = useState({});

  const temperature = date.data?.[0].coordinates[0].dates[0].value;

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const url = `https://api.meteomatics.com/${formattedDate}/t_2m:C/${coordinates}/json`;
    const username = weatherApiName;
    const password = weatherApiPass;
    const base64Credentials = btoa(`${username}:${password}`);
    const headers = {
      'Authorization': `Basic ${base64Credentials}`,
    };

    fetch(url, { headers })
      .then((res) => res.json())
      .then((val) => setDate(val))
      .catch((error) => {
        alert('Error fetching data:', error);
      });

    const tempMarkerPosition = coordinates.split(',');
    const tempLatPosition = tempMarkerPosition[0];
    const tempLngPosition = tempMarkerPosition[1];
    setMarkerPosition({ lat: +tempLatPosition, lng: +tempLngPosition });
  }, [coordinates]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('Geolocation not supported');
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCoordinates(`${latitude},${longitude}`);
    }

    function error() {
      console.log('Unable to retrieve your location');
    }
  }, []);

  const dataContext = {
    geoName,
    setGeoName,
    setCoordinates,
  };

  return (
    <DataContext.Provider value={dataContext}>
      <Header city={geoName.city} state={geoName.state} temperature={temperature} />
      <main className="container">
        <Map markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
      </main>
    </DataContext.Provider>
  );
}

export default App;
