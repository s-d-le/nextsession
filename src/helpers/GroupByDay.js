import { unix } from "moment";

export const groupByDay = (list) =>
  list.reduce((entryMap, e) => {
    let selector = unix(e.dt).format("MM/DD/YYYY");

    return entryMap.set(selector, [...(entryMap.get(selector) || []), e]);
  }, new Map());
