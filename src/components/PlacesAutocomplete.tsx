import React, { useEffect, useContext } from "react";
import { useCookies } from "react-cookie";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import useOnclickOutside from "react-cool-onclickoutside";

import LocationContext from "../models/LocationContext";

const PlacesAutocomplete = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  /**
   * Set states into context
   */
  const { setLat, setLong, setLocation } = useContext(LocationContext);

  const [cookies, setCookie] = useCookies(["lat", "long", "location"]);

  /**
   * Rehydrate the location with some good dough
   */
  useEffect(() => {
    if (cookies["lat"] !== undefined) setLat(cookies["lat"]);
    if (cookies["long"] !== undefined) setLong(cookies["long"]);
    if (cookies["location"] !== undefined) setLocation(cookies["location"]);
  });

  /**
   * Close locations list when click outside
   */
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      setLocation(description);
      setCookie("location", description);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setLat(lat);
          setCookie("lat", lat);
          setLong(lng);
          setCookie("long", lng);
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
        });
    };

  /**
   * List of Google Maps suggestions
   */
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="autocomplete-item"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Kite spot and minimum windspeed?"
        className="autocomplete-input"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <ul className="autocomplete-list">{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
