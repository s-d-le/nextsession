import React, { FC } from "react";

import { ISession } from "../models/OpenWeatherModel";
import { KNOT_TO_MS } from "../helpers/Conversion";

import { groupByDay } from "../helpers/GroupByDay";

import moment from "moment";

interface ISessionsList {
  list: Array<ISession>;
}

const Sessions: FC<ISessionsList> = ({ list }) => {
  const groupedSessions = list.reduce(
    (entryMap, e) =>
      entryMap.set(moment.unix(e.dt).format("MM/DD/YYYY"), [
        ...(entryMap.get(moment.unix(e.dt).format("MM/DD/YYYY")) || []),
        e,
      ]),
    new Map()
  );

  console.log(groupedSessions);

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
