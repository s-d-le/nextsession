import React, { useState, useEffect } from "react";
import "./App.css";

const LAT = 50.891;
const LONG = 1.656;

const App = () => {
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<{}>();
  const fetchURL = `${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;

  const getWeather = async () => {
    try {
      const res = await fetch(fetchURL);
      const data = await res.json();
      setWeather(data);
      setLocation(`${data.city.name}, ${data.city.country}`);
      console.log(data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    setLat(LAT);
    setLong(LONG);
  }, []);

  return (
    <div className="App">
      <h3>Latitude is: {lat}</h3>
      <h3>Longitude is: {long}</h3>
      <h3>Location is: {location}</h3>
      <button
        onClick={() => {
          getWeather();
        }}
      >
        Get Weather
      </button>
    </div>
  );
};

export default App;
