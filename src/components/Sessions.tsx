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

  return (
    <div>
      {list?.length > 0 ? (
        list?.map((session) => {
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
