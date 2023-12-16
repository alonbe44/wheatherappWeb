import './App.css';
import React, { useEffect, useState, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';

/**
In this code, we have a WeatherComponent that fetches and displays weather data for a specific location. It utilizes useCallback and useState hooks to manage its state and perform side effects.

The code first declares a variable 'bol' with a value of false.

Then, the WeatherComponent function is defined, which returns the JSX code for rendering the component. Inside the component, the following state variables are declared and initialized:

data: Used to store the weather data fetched from the API.
loading: Indicates whether the data is currently being fetched from the API.
search: Used to store the location for which the weather data should be fetched.
searchResults: Used to store the results of a search query for locations.
Inside the component, useCallback is used to create a memoized version of the fetchData function. This memoized function will only be re-created if any of its dependencies change.

The fetchData function is responsible for fetching the weather data from the API. It uses the useEffect hook to run the function when the component mounts, and whenever the search variable changes.

Inside the fetchData function, a try-catch block is used to handle any errors that may occur during the fetching process.

The useSpring hook is used to animate the weather component. This hook returns an array of animated values that can be interpolated and styled accordingly.

In summary, the WeatherComponent is a React component that fetches and displays weather data for a specific location. It uses a combination of useState, useEffect, and useSpring hooks to manage its state and perform side effects. The fetchData function is used to fetch the weather data from the API, and it is memoized using the useCallback hook to optimize performance.
] */
var bol = false;
const WeatherComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('Jordan');
  const [searchResults, setSearchResults] = useState(null);

  const fetchData = useCallback(async () => {
    console.log('Fetching data...' + search + '  : ' + searchResults);

    try {
      const apiUrl = (bol === false) ? `http://api.weatherapi.com/v1/current.json?key=b43b5f84d6e540ca853162955232710&q=Jordan`
        : `http://api.weatherapi.com/v1/current.json?key=b43b5f84d6e540ca853162955232710&q=${search}`;

      const response = await fetch(apiUrl);
      const result = await response.json();
      console.log("calling");

      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [search, searchResults]);

  useEffect(() => {
    fetchData();
  }, [search, searchResults, fetchData]);

  const handleSearch = () => {
    console.log('Search button clicked');

    setSearchResults(null);
    bol = true;
    fetchData();
    bol = false;
  };

  const fadeIn = useSpring({
    opacity: loading ? 0 : 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={fadeIn} className="weather-container">

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => {
            console.log('Search input changed:', e.target.value);
            setSearch(e.target.value)
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : searchResults ? (
        <div>

          <p className="location">Location: {searchResults.location.name}</p>
          <p className="country">Country: {searchResults.location.country}</p>
          <p className="local-time">Local Time: {searchResults.location.localtime}</p>
          <p className="temperature-c">Temperature: {searchResults.current.temp_c}°C</p>
          <p className="temperature-f">Temperature: {searchResults.current.temp_f}°F</p>
          <p className="is-day">Is Day: {searchResults.current.is_day ? 'Yes' : 'No'}</p>
          <p className="condition">Condition: {searchResults.current.condition.text}</p>
        </div>
      ) : (
        <div>
          {data ? (
            <>

              <p className="location">Location: {data.location.name}</p>
              <p className="country">Country: {data.location.country}</p>
              <p className="local-time">Local Time: {data.location.localtime}</p>
              <p className="temperature-c">Temperature: {data.current.temp_c}°C</p>
              <p className="temperature-f">Temperature: {data.current.temp_f}°F</p>
              <p className="is-day">Is Day: {data.current.is_day ? 'Yes' : 'No'}</p>
              <p className="condition">Condition: {data.current.condition.text}</p>
            </>
          ) : (
            <p>No weather data available</p>
          )}
        </div>
      )}
    </animated.div>

  );
};

export default WeatherComponent;


