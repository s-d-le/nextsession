import React, { FC, useMemo } from "react";
import { unix } from "moment";

import { ISession } from "../models/OpenWeatherModel";
import { KNOT_TO_MS } from "../helpers/Conversion";

import { groupByDay } from "../helpers/GroupByDay";

interface ISessionsList {
  list: Array<ISession>;
  minWindSpeed: number;
}

const Sessions: FC<ISessionsList> = ({ list, minWindSpeed = 0 }) => {
  /**
   * Prevent input from re-calling the list
   */
  const groupedSessions = useMemo(
    () => groupByDay(list, minWindSpeed),
    [list, minWindSpeed]
  );

  /**
   * Weather array destructuring
   */
  const sessionsRenderer = groupedSessions.map(
    (sessionWeatherData, index: number) => {
      //The return value is an array with 2 value: [0]formated time and [1]weather data
      return (
        <div className="session-data" key={index}>
          <span className="session-date">{sessionWeatherData.key}</span>
          <ul className="session-list">
            {sessionWeatherData.value.map(
              (weatherPoint: ISession, index: number) => {
                return (
                  <li key={weatherPoint.dt}>
                    <span className="session-time">
                      {unix(weatherPoint.dt).format("HH:mm")}
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
      {groupedSessions?.length > 0 ? (
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
