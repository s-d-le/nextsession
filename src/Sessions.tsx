import React, { FC } from "react";

interface ISessions {
  list: Array<{}>;
}

const Sessions: FC<ISessions> = ({ list }) => {
  return (
    <div>
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
};

export default Sessions;
