import fetch from "node-fetch";
// type JSONResult = { [key: string]: object };

const getWeatherData = async (parent, args, context, info) => {
  const { lat = 0, long = 0 } = args;
  const url = `${process.env.REACT_APP_WEATHER_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`;
  try {
    const res = await fetch(url, {
      method: "POST",
    });
    const json = await res.json();
    const currencyObj = json[Object.keys(json)[0]];
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
