import { unix } from "moment";

/**
 * Group weather data points by date
 */
export const groupByDay = (list, minWinSpeed) => {
  const ds = (dt) => unix(dt).format("dddd MM/DD");

  const result = Array.from(
    list
      .filter((o) => o.wind.speed >= minWinSpeed) // filter by MIN_WIND_SPEED
      .map((o) => ({ ds: ds(o.dt), ...o })) // map timestamp to date_string
      .reduce(
        (a, { ds, ...o }) => a.set(ds, [...(a.get(ds) ?? []), o]),
        new Map()
      ), // reduce

    // 'map' callback provided by Array.from() to refactor Map iterator
    ([key, values]) => ({ key, values })
  );

  return result;
};
