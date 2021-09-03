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
