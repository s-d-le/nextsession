# Next Session

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Motivation

Admit it! Weather apps are mundane. The same sun and cloud illustrations with big, bold, eccentric temperature digits. Try-hards (surfers, kiteboarders...) only care about their ultimate metrics: wind speed, wave height. We don't care if its below freezing (...) We go out when it's ON. And this app's sole purpose is letting you know when it's ON!

## Installation

### API Keys

Create your `.env` in project's root folder. Get the api keys from

- [Open weather 5 day forecast](https://openweathermap.org/forecast5)
- [Google API](https://console.cloud.google.com/) Enable Places and Geocode API

Paste them in the `.env` file

```
REACT_APP_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
REACT_APP_WEATHER_API_KEY = 'YOUR_KEY'
REACT_APP_GOOGLE_API_KEY = 'YOUR_KEY'
```

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
