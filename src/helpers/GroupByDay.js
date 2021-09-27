import { unix } from "moment";

/**
 * Group weather data points by date
 */
export const groupByDay = (list) =>
  list.reduce((entryMap, entry) => {
    let selector = unix(entry.dt).format("dddd MM/DD");

    return entryMap.set(selector, [...(entryMap.get(selector) || []), entry]);
  }, new Map());

export const groupByWindSpeed = (list, minWinSpeed) => {
  const ds = (dt) =>
    new Intl.DateTimeFormat("default", {
      weekday: "long",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(dt * 1000));

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
