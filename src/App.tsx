import React, { useState, useMemo, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./App.scss";

import { ISession } from "./models/OpenWeatherModel";
import { KNOT_TO_MS } from "./helpers/Conversion";
import Sessions from "./components/Sessions";
import PlacesAutocomplete from "./components/PlacesAutocomplete";

import LocationContext from "./models/LocationContext";

import { groupByDay, groupByWindSpeed } from "./helpers/GroupByDay";

const App = () => {
  const [cookies, setCookie] = useCookies(["minWindSpeed", "location"]);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [minWindSpeed, setMinWindSpeed] = useState<number | string>(12);
  const [nextSession, setNextSession] = useState<ISession[]>();
  const fetchURL = `${process.env.REACT_APP_WEATHER_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`;

  /**
   * Setting windspeed from cookies
   * Making sure it's a number
   * TODO: Check if cookie is ready then call getWeather
   */
  useEffect(() => {
    if (cookies["minWindSpeed"] !== undefined)
      setMinWindSpeed(Number(cookies["minWindSpeed"]));
  }, [cookies]);

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
   * Filter and convert windspeed from API
   */
  const filterWindSpeed = (list: any[]) => {
    if (typeof minWindSpeed !== "string") {
      console.log(groupByWindSpeed(list, minWindSpeed / KNOT_TO_MS));
    } else {
      console.log("Get us some windspeed");
    }
  };

  /**
   * Call Weather API
   */
  const getWeather = async () => {
    try {
      const res = await fetch(fetchURL);
      const data = await res.json();
      filterWindSpeed(data.list);
    } catch (error) {
      console.log("😱 Error: ", error);
    }
    setCookie("minWindSpeed", minWindSpeed);
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
      <div className="container">
        <div className="place-wind-block">
          <PlacesAutocomplete />
          <input
            type="number"
            name="windspeed"
            value={minWindSpeed}
            onChange={onInputWindSpeed}
            className="autocomplete-input windspeed"
          />
          <span className="input-unit">knots</span>
        </div>

        <button
          onClick={() => {
            getWeather();
          }}
          className="confirm-button"
        >
          When is my next session
        </button>
        {nextSession! && <Sessions list={nextSession} />}
      </div>
    </LocationContext.Provider>
  );
};

export default App;
