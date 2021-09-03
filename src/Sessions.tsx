import React, { FC } from "react";

import { ISession } from "./OpenWeatherModel";
interface ISessionsList {
  list: Array<ISession>;
}

const Sessions: FC<ISessionsList> = ({ list }) => {
  console.log(list);
  return (
    <div>
      {list.map((session) => {
        return (
          <p key={session.dt}>
            {session.dt_txt} {session.weather[0].description}{" "}
            {Math.round(session.wind.speed)} knots
          </p>
        );
      })}
    </div>
  );
};

export default Sessions;
