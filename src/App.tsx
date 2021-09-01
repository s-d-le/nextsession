import React, { useState, useEffect } from "react";
import "./App.css";

const LAT = 52.0503494;
const LONG = 4.1707278;
const LOCATION = "Zandmotor, Zuid-Holland, Netherlands";

const App = () => {
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   setLat(position.coords.latitude);
    //   setLong(position.coords.longitude);
    // });
    setLat(LAT);
    setLong(LONG);
    setLocation(LOCATION);
  }, [lat, long]);

  return (
    <div className="App">
      <h3>Latitude is: {lat}</h3>
      <h3>Longitude is: {long}</h3>
      <h3>Location is: {location}</h3>
    </div>
  );
};

export default App;
