import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file
import DigitalClock from './component/DigitalClock';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1dba42714f85736e51ca0be825e3944f`;

  const handleCheckBtn = () => {
    setLocation("");
    axios.get(url).then((resp) => {
      setData(resp.data);
      console.log(resp.data);
    });
  };

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2); // Convert and round to 2 decimal places
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      handleCheckBtn();
    }
  };

  return (
    // <div className="App">
    <div className={`App ${data.weather ? data.weather[0].main : null}`}>
      <div className="header">
        <h1>WeatherSphere Pro</h1>
      </div>
      <div className="search-container">
        <input
          className="location-input"
          placeholder="Enter location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
        />
        <button className="check-button" onClick={handleCheckBtn}>
          Check
        </button>
      </div>

      {/* Conditionally render weather-details */}
      {Object.keys(data).length > 0 && (
        <div className="weather-details">
          <div className="location">
            <h3>{data.sys ? data.sys.country : null}</h3>
            <h4>{data.name}</h4>
            <h1>{data.main ? kelvinToCelsius(data.main.temp) + "°C" : null}</h1>
          </div>
          <div className="weather-info">
            {data.main && (
              <div className="info">
                <h3>Wind</h3>
                <h4>{data.wind ? data.wind.speed : null}</h4>
              </div>
            )}
            {data.main && (
              <div className="info">
                <h3>Pressure</h3>
                <h4>{data.main ? data.main.pressure : null} hPa</h4>
              </div>
            )}
            {data.main && (
              <div className="info">
                <h3>Humidity</h3>
                <h4>{data.main ? data.main.humidity : null}%</h4>
              </div>
            )}
            {data.weather && (
              <div className="info">
                <h3>Weather</h3>
                <h4>{data.weather ? data.weather[0].description : null}</h4>
                <div className="weather-icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div>
        <DigitalClock />
      </div>
    </div>
  );
}


export default App;

