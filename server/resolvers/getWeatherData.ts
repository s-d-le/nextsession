import fetch from "node-fetch";
type JSONResult = { [key: string]: object };

const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const getWeatherData = async (parent, args, context, info) => {
  const { lat = 0, long = 0 } = args;
  const url = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=db9b795e6127d6da8a42b1d22850ec97`;
  try {
    const res = await fetch(url, { agent });
    const json = await res.json();
    const currencyObj: JSONResult = json[Object.keys(json)[0]];
    return Object.fromEntries(
      Object.entries(currencyObj).map(([key, value], i) => [
        key.replace(`${i + 1}. `, ""),
        value,
      ])
    );
  } catch (error) {
    throw new Error(error);
  }
};

export default getWeatherData;
