import React, { FC, useMemo } from "react";

import { ISession } from "../OpenWeatherModel";
import { KNOT_TO_MS } from "../helpers/Conversion";

interface ISessionsList {
  list: Array<ISession> | null;
}

const Sessions: FC<ISessionsList> = ({ list }) => {
  /**
   * Dont want the list to be rerender everytime knots is typed in
   */
  useMemo(() => list, [list]);

  console.log();

  return (
    <div>
      {list?.map((session) => {
        return (
          <p key={session.dt}>
            {session.dt_txt} {session.weather[0].description}{" "}
            {Math.round(session.wind.speed * KNOT_TO_MS)} knots
          </p>
        );
      })}
    </div>
  );
};

export default Sessions;
