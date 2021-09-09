import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

import { ISession } from "./models/OpenWeatherModel";
import { KNOT_TO_MS } from "./helpers/Conversion";
import Sessions from "./components/Sessions";
import PlacesAutocomplete from "./components/PlacesAutocomplete";

import LocationContext from "./models/LocationContext";

const App = () => {
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [minWindSpeed, setMinWindSpeed] = useState<number | string>(12);
  const [nextSession, setNextSession] = useState<ISession[]>();
  const fetchURL = `${process.env.REACT_APP_WEATHER_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`;

  /**
   * Shared states between Google AutoComplete and Weather API
   */
  const context = useMemo(
    () => ({
      lat,
      setLat,
      long,
      setLong,
      location,
      setLocation,
    }),
    [lat, long, location]
  );

  /**
   * Get and convert windspeed from API
   */
  const filterWindSpeed = (list: any[]) => {
    if (typeof minWindSpeed !== "string") {
      setNextSession(
        list.filter((i) => i.wind.speed >= minWindSpeed / KNOT_TO_MS)
      );
    }
  };

  /**
   * Call Weather API
   */
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

  /**
   * Force number input only on windspeed
   */
  const onInputWindSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setMinWindSpeed(e.target.valueAsNumber ? e.target.valueAsNumber : "");
    }
  };

  return (
    <LocationContext.Provider value={context}>
      <div className="App">
        <PlacesAutocomplete />
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
        {nextSession! && <Sessions list={nextSession} />}
      </div>
    </LocationContext.Provider>
  );
};

export default App;
