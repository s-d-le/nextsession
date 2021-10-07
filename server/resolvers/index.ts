import getWeatherData from "./getWeatherData";

const resolvers = {
  Query: {
    getWeatherData,
  },
};

export default resolvers;
