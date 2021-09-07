import { unix } from "moment";

/**
 * Group weather data points by date
 */
export const groupByDay = (list) =>
  list.reduce((entryMap, entry) => {
    let selector = unix(entry.dt).format("dddd MM/DD");

    return entryMap.set(selector, [...(entryMap.get(selector) || []), entry]);
  }, new Map());
