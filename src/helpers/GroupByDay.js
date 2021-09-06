import { unix } from "moment";

export const groupByDay = (list) =>
  list.reduce((entryMap, entry) => {
    let selector = unix(entry.dt).format("dddd MM/DD");

    return entryMap.set(selector, [...(entryMap.get(selector) || []), entry]);
  }, new Map());
