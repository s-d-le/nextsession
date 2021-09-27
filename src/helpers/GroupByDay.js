import { unix } from "moment";

/**
 * Group weather data points by date
 */
export const groupByDay = (list) =>
  list.reduce((entryMap, entry) => {
    let selector = unix(entry.dt).format("dddd MM/DD");

    return entryMap.set(selector, [...(entryMap.get(selector) || []), entry]);
  }, new Map());

export const groupByWindSpeed = (list) =>
  list.reduce((map, entry) => {
    if (entry.wind.speed >= 4) {
      const date = new Date(entry.dt_txt);
      const selector = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;
      map[selector] = map[selector] ? [...map[selector], entry] : [entry];
    }

    return map;
  }, {});
