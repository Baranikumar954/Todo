import React, { useEffect, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";

export const Weather = () => {
    const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [err, setErr] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const getMyCity = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lan = pos.coords.longitude;
          fetchWeather(lat, lan);
        },
        () => {
          setErr("Please enable location!");
        }
      );
    } else {
      setErr("GeoLocation not supported");
    }
  };

  const fetchWeatherBycity = async (city) => {
    
    const myApiKey = process.env.REACT_APP_API_KEY;
    if (!myApiKey) {
      console.error("API key is missing. Please set REACT_APP_WEATHER_API_KEY in your .env file.");
    }
    const myApiUrl = `https://api.weatherapi.com/v1/current.json?key=${myApiKey}&q=${city}`;
    try {
      const response = await fetch(myApiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch specific city");
      }
      const data = await response.json();
      setWeather(data.current);
      setErr("");
      setCity(data.location.name);
    } catch (err) {
      console.error(err);
      setErr("Check the city name");
    }
  };

  const fetchWeather = async (lat, lan) => {
    const myApiKey = process.env.REACT_APP_API_KEY;
    if (!myApiKey) {
      console.error("API key is missing. Please set REACT_APP_WEATHER_API_KEY in your .env file. 1");
    }
    const myApiUrl = `https://api.weatherapi.com/v1/current.json?key=${myApiKey}&q=${lat},${lan}`;
    try {
      const response = await fetch(myApiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeather(data.current);
      setErr("");
      setCity(data.location.name);
    } catch (err) {
      console.error(err);
      setErr("Error fetching weather data");
    }
  };

  const handleClickEdit = () => {
    setIsEdit(true);
  };

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleInputBlur = () => {
    if (inputCity.trim() === "") {
      setErr("City name cannot be empty");
      return;
    }
    setCity(inputCity);
    localStorage.setItem('city_name',inputCity);
    fetchWeatherBycity(inputCity);
    setInputCity("");
    setIsEdit(false);
  };

  useEffect(() => {
    const getLocalCity = localStorage.getItem('city_name');
    if(getLocalCity && err){
      fetchWeatherBycity(getLocalCity);
    }
    else{
      getMyCity();
    }
  },[]);
  return (
    <div className="head-weatherContainer">
        <div id="cityNameInput">
            {city && (
            <p>
                City: {city}{" "}
                {!isEdit ? (
                <button onClick={handleClickEdit}>
                    <FaSearchLocation />
                </button>
                ) : (
                <input
                    type="text"
                    value={inputCity}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleInputBlur();
                    }
                    }}
                    autoFocus
                />
                )}
            </p>
            )}
        </div>
        <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",width: "100%",}}>
            <>
                <p>{weather.temp_c} °C{" "}</p>
            </>
            <>
                {weather && weather.condition && (
                    <img
                    src={weather.condition.icon}
                    alt="Weather icon"
                    width="48px"
                    height="48px"
                    />
                )}
            </>  
        </div>
        <div>
            {err && <p style={{ color: "red"}}>{err}</p>}
        </div>

      </div>
  )
}
