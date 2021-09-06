import React, { FC } from "react";
import { unix } from "moment";

import { ISession } from "../models/OpenWeatherModel";
import { KNOT_TO_MS } from "../helpers/Conversion";

import { groupByDay } from "../helpers/GroupByDay";

interface ISessionsList {
  list: Array<ISession>;
}

const Sessions: FC<ISessionsList> = ({ list }) => {
  const groupedSessions = groupByDay(list);

  return (
    <div>
      {groupedSessions?.size > 0 ? (
        //Array destructuring
        [...groupedSessions].map((sessionWeatherData, index: number) => {
          //They return value is an array with 2 value: [0]formated time and [1]weather data
          return (
            <div key={index}>
              <p>{sessionWeatherData[0]}</p>
              <ul>
                {sessionWeatherData[1].map(
                  (weatherPoint: ISession, index: number) => {
                    return (
                      <li key={weatherPoint.dt}>
                        <span>{unix(weatherPoint.dt).format("hh:mm")}</span>{" "}
                        <span>
                          {Math.round(weatherPoint.wind.speed * KNOT_TO_MS)}{" "}
                          knots
                        </span>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          );
        })
      ) : (
        <>
          <p>No kiting!</p>
        </>
      )}
    </div>
  );
};

export default Sessions;
