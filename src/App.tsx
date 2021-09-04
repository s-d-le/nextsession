import React, { useState, useEffect } from "react";
import "./App.css";

import { ISession } from "./OpenWeatherModel";
import { KNOT_TO_MS } from "./helpers/Conversion";
import Sessions from "./components/Sessions";

const LAT = 52.11;
const LONG = 4.265;

const App = () => {
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  const [location, setLocation] = useState<string>("");
  const [minWindSpeed, setMinWindSpeed] = useState<number | string>(12);
  const [nextSession, setNextSession] = useState<ISession[]>([]);
  const fetchURL = `${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;

  const filterWindSpeed = (list: any[]) => {
    /**
     * HTML input returns empty string
     */
    if (typeof minWindSpeed !== "string") {
      setNextSession(
        list.filter((i) => i.wind.speed >= minWindSpeed / KNOT_TO_MS)
      );
    }
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
      setMinWindSpeed(e.target.valueAsNumber ? e.target.valueAsNumber : "");
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
