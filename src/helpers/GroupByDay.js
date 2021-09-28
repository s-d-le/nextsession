import { unix } from "moment";

/**
 * Group weather data points by date
 * Because an entire data group should be
 * returned if any of the elements meet
 * the MIN_WIND_SPEED cutoff, we need to
 * run the full 'group-by' and then filter()
 * groups based on whether they meet the requirements.
 */
export const groupByDay = (list, minWinSpeed) => {
  const formatDate = (dt) => unix(dt).format("dddd MM/DD");

  const map = new Map();
  const temp = [];

  // format date_string & build Map
  for (const session of list) {
    const dateString = formatDate(session.dt);
    if (session.wind.speed >= minWinSpeed) {
      map.set(dateString, []);
    }
    temp.push({ dateString, ...session });
  }

  // reduce
  for (const { dateString, ...session } of temp) {
    if (map.has(dateString)) {
      map.get(dateString).push(session);
    }
  }

  // convert Map to result array
  const result = Array.from(map, ([key, value]) => ({ key, value }));

  return result;
};
