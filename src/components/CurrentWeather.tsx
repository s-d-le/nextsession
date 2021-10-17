import React, { FC } from "react";

import { ICurrentWeather } from "../models/OpenWeatherModel";
import { KNOT_TO_MS } from "../helpers/Conversion";

const Sessions: FC<ICurrentWeather> = ({ wind, main, weather }) => {
  return (
    <>
      <div>Temprature {main.temp}</div>
      <div>Wind {wind.speed}</div>
      <div>Gust {wind.gust}</div>
      <div>{weather[0].description}</div>
    </>
  );
};

export default Sessions;
