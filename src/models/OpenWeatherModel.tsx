/**
 * Types for values return from Open Weather API
 * Adding things as we go
 */
export interface IWeather {
  description: string;
}

export interface IWind {
  deg: number;
  gust: number;
  speed: number;
}

export interface ISession {
  dt: number;
  dt_txt: string;
  weather: Array<IWeather>;
  wind: IWind;
}

export interface ICurrentWeather {
  main: { temp: Number };
  wind: IWind;
  weather: Array<IWeather>;
}
