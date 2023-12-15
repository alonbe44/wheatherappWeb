import './App.css';
import React, { useEffect, useState, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';

var bol=false;
const WeatherComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('Jordan');
  const [searchResults, setSearchResults] = useState(null);

  const fetchData = useCallback(async () => {
    console.log('Fetching data...'+search+'  : '+searchResults);

    try {
      const apiUrl = (bol===false)?`http://api.weatherapi.com/v1/current.json?key=b43b5f84d6e540ca853162955232710&q=Jordan`
        : `http://api.weatherapi.com/v1/current.json?key=b43b5f84d6e540ca853162955232710&q=${search}`
    
         ;

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
  },[search, searchResults, fetchData]);

  const handleSearch = () => {
    console.log('Search button clicked');

    setSearchResults(null);
    bol=true;
    fetchData();
    bol=false;
  };

  // Animation configuration
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
          onChange={(e) => {    console.log('Search input changed:', e.target.value);
          setSearch(e.target.value)}}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : searchResults ? (
        <div>
          {/* Accessing weather data */}
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
              {/* Accessing weather data */}
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


