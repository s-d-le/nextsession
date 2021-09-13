import React, { FC, useMemo } from "react";
import { unix } from "moment";

import { ISession } from "../models/OpenWeatherModel";
import { KNOT_TO_MS } from "../helpers/Conversion";

import { groupByDay } from "../helpers/GroupByDay";

interface ISessionsList {
  list: Array<ISession>;
}

const Sessions: FC<ISessionsList> = ({ list }) => {
  /**
   * Prevent input from re-calling the list
   */
  const groupedSessions = useMemo(() => groupByDay(list), [list]);

  /**
   * Weather array destructuring
   */
  const sessionsRenderer = [...groupedSessions].map(
    (sessionWeatherData, index: number) => {
      //The return value is an array with 2 value: [0]formated time and [1]weather data
      return (
        <div className="session-data" key={index}>
          <span className="session-date">{sessionWeatherData[0]}</span>
          <ul className="session-list">
            {sessionWeatherData[1].map(
              (weatherPoint: ISession, index: number) => {
                return (
                  <li key={weatherPoint.dt}>
                    <span className="session-time">
                      {unix(weatherPoint.dt).format("HH")}
                    </span>
                    <span className="session-windspeed">
                      {Math.round(weatherPoint.wind.speed * KNOT_TO_MS)}
                    </span>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <div>
      {groupedSessions?.size > 0 ? (
        <>{sessionsRenderer}</>
      ) : (
        <>
          <p>No kiting!</p>
        </>
      )}
    </div>
  );
};

export default Sessions;
