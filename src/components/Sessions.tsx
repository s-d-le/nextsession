import React, { FC } from "react";

import { ISession } from "../models/OpenWeatherModel";
import { KNOT_TO_MS } from "../helpers/Conversion";

import { groupByDay } from "../helpers/GroupByDay";

interface ISessionsList {
  list: Array<ISession>;
}

const Sessions: FC<ISessionsList> = ({ list }) => {
  console.log(groupByDay(list));

  const groupedSessions = groupByDay(list);

  console.log(groupedSessions.size);

  return (
    <div>
      {groupedSessions?.size > 0 ? (
        groupedSessions?.map((session: ISession) => {
          return (
            <p key={session.dt}>
              {session.dt_txt} {session.weather[0].description}{" "}
              {Math.round(session.wind.speed * KNOT_TO_MS)} knots
            </p>
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
