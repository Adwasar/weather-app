import { useEffect, useState } from 'react';

function App() {
  const [data, getData] = useState({});

  const temperature = data.data?.[0].coordinates[0].dates[0].value;

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const url = `https://api.meteomatics.com/${formattedDate}/t_2m:C/49.988502,36.231416/json`;
    const username = 'no_bryl_vladislav';
    const password = 'DBKc9hT1w8';
    const base64Credentials = btoa(`${username}:${password}`);
    const headers = {
      'Authorization': `Basic ${base64Credentials}`,
    };

    fetch(url, { headers })
      .then((res) => res.json())
      .then((val) => getData(val))
      .catch((error) => {
        alert('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    console.log(data.data?.[0].coordinates[0].dates[0].value);
  }, [data]);

  return (
    <>
      <h1>Погода Харьков</h1>
      <span>{`температура: ${temperature} ℃`}</span>
    </>
  );
}

export default App;
