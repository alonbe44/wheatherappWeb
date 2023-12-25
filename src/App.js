import './App.css';
import React, { useEffect, useState, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import cloudy from './pexels-pixabay-209831.jpg';
import mist from './mist.jpg'
import clear from './Clear.jpg'
import lightr from './Light rain.jpg'
import Overcast from './Overcast.jpg'


const WeatherComponent = () => {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [wheaterstate, setwheaterstate] = useState(`url(${cloudy})`);
  const [input,setinput] = useState(''); 

  const fetchData = useCallback(async (cn) => {

    try {
      const apiUrl = ( cn === '' ) ? `http://api.weatherapi.com/v1/current.json?key=b43b5f84d6e540ca853162955232710&q=Jordan`
        : `http://api.weatherapi.com/v1/current.json?key=b43b5f84d6e540ca853162955232710&q=${cn}`;

      const response = await fetch(apiUrl);
      const result = await response.json();
      //console.log("calling");

      setData(result);

      const getBackgroundImage = (conditionCode) => {
        const imageMappings = {
          'Mist': `url(${mist})`,
          'Partly cloudy': `url(${cloudy})`,
          'Clear': `url(${clear})`,
          'Light rain': `url(${lightr})`,
          'Moderate rain':`url(${cloudy})`,
          'Overcast':`url(${Overcast})`,
          // Add more mappings as needed
        };
        console.log(conditionCode);
        return  imageMappings[conditionCode]!==undefined ? imageMappings[conditionCode]:`url(${clear})` ;
      };

      setwheaterstate(getBackgroundImage(result.current.condition.text));
      setLoading(false);
    } 
    catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    fetchData(input);
  }, [input]);

  const handleSearch = (event) => {
    //setSearch(event.target.value);
    setinput(search);
    console.log('Search button clicked '+ input);
    if(search!=='')
    {
    fetchData(search);
    }

  else
  {
    alert('Search Box is Empty');
  }
  };
 
  const fadeIn = useSpring({
    opacity: loading ? 0 : 1,
    from: { opacity: 0 },
  });

 
  return (
    <animated.div className="weather-container" style =
     {
      {backgroundImage: wheaterstate , fadeIn}
      
      
    }

    >
      

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)

          }}
        />
        <button  onClick={handleSearch}>Search</button>
      </div>

      {
      loading ? (
        <p>Loading...</p>
      ):  (
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


