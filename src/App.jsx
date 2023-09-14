import { useEffect, useState } from 'react';

import Map from './components/Map/Map';

import DataContext from './context';

const weatherApiName = import.meta.env.VITE_WEATHER_API_USERNAME;
const weatherApiPass = import.meta.env.VITE_WEATHER_API_PASSWORD;

function App() {
  const [geoName, setGeoName] = useState({});
  const [coordinates, setCoordinates] = useState('50.450939,30.522594');
  const [date, setData] = useState({});

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
      .then((val) => setData(val))
      .catch((error) => {
        alert('Error fetching data:', error);
      });
  }, [coordinates]);

  useEffect(() => {}, [coordinates]);

  const dataContext = {
    geoName,
    setGeoName,
    setCoordinates,
  };

  return (
    <DataContext.Provider value={dataContext}>
      <main className="container">
        <h1>{Object.keys(geoName).length ? `${geoName.city}, ${geoName.state}` : null}</h1>
        <span>{`температура: ${temperature} ℃`}</span>
        <Map />
      </main>
    </DataContext.Provider>
  );
}

export default App;
