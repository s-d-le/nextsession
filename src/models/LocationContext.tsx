import { createContext } from "react";

export interface ILocationContext {
  lat: number;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  long: number;
  setLong: React.Dispatch<React.SetStateAction<number>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export default createContext<ILocationContext>({
  lat: 0,
  setLat: () => {},
  long: 0,
  setLong: () => {},
  location: "",
  setLocation: () => {},
});
