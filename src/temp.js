//https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=0bd739ebec042b06fa06fe35feb91b2b

import React, { useEffect, useState } from 'react'
import './style.css'
import WeatherCard from './weatherCard';

const Temp = () => {

  const [searchValue, setSearchValue] = useState("Delhi");
  const [tempInfo, setTempInfo] = useState({});
  const [currentDateTime, setCurrentDateTime] = useState(searchValue);

  const getWeatherInfo = async() =>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=0bd739ebec042b06fa06fe35feb91b2b`;

      const res = await fetch(url);

      const data =  await res.json();

      const {temp,humidity, pressure} = data.main;

      const {main : weathermood} = data.weather[0];

      const {name} = data;

      const {speed} = data.wind;

      const {country, sunset} = data.sys;
      
      const myNewWeatherInfo = {
        temp, 
        humidity, 
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
      
      // calling getDateandTime function to get date and time of a particular place
      getDateandTime(country,name);
      
    } catch (error) {
      console.log(error);
    }
  }

  const getDateandTime = async(country,name) =>{

    try {
      let url = `https://api.ipgeolocation.io/timezone?apiKey=8c13c5031b994da8943c961ef96e7187&location=${name},%20${country}`;

      const res = await fetch(url);

      const data = await res.json();

      const {date_time_txt} = data;

      setCurrentDateTime(date_time_txt);
      console.log(data); 
    } catch (error) {
      console.log(error);
    }
   
  } 
  
 
  useEffect(() =>{
    getWeatherInfo();
  } ,[])

  return (
    <>
        <div className="wrap">
            <div className="search">
                <input value = {searchValue} onChange = {(e) => setSearchValue(e.target.value)} type="search" placeholder='search' id='search' className='searchTerm'/>

                <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
            </div>
        </div>

        {/* Temperature card */}
        <WeatherCard tempInfo={tempInfo} currentDateTime={currentDateTime}/>
    </>
  )
}

export default Temp