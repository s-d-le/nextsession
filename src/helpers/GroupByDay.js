import { unix } from "moment";

export function groupByDay(value, index, array) {
  let byday = {};
  let d = unix(value["dt"]).date();
  byday[d] = byday[d] || [];
  byday[d].push(value);
  return byday;
}
