import React, { useState, useEffect } from "react";
import "./App.css";

import Sessions from "./Sessions";

const LAT = 52.11;
const LONG = 4.265;
const KNOT_TO_MS = 1.94384; //Api returns in m/s but we want to work with knots

const App = () => {
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  const [location, setLocation] = useState<string>("");
  const [minWindSpeed, setMinWindSpeed] = useState<number>(0);
  const [nextSession, setNextSession] = useState<{}[]>([]);
  const fetchURL = `${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;

  const filterWindSpeed = (list: any[]) => {
    setNextSession(
      list.filter((i) => i.wind.speed >= minWindSpeed / KNOT_TO_MS)
    );
  };

  const getWeather = async () => {
    try {
      const res = await fetch(fetchURL);
      const data = await res.json();
      setLocation(`${data.city.name}, ${data.city.country}`);
      filterWindSpeed(data.list);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    setLat(LAT);
    setLong(LONG);
  }, []);

  // Force number input only on windspeed
  const onInputWindSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setMinWindSpeed(e.target.valueAsNumber);
    }
  };

  return (
    <div className="App">
      <h3>Latitude is: {lat}</h3>
      <h3>Longitude is: {long}</h3>
      <h3>Location is: {location}</h3>
      <h3>
        <input
          type="number"
          name="windspeed"
          placeholder="Minimum Wind Speed"
          value={minWindSpeed}
          onChange={onInputWindSpeed}
        />{" "}
        Knots
      </h3>
      <button
        onClick={() => {
          getWeather();
        }}
      >
        When is my next session?
      </button>
      <Sessions list={nextSession} />
    </div>
  );
};

export default App;
