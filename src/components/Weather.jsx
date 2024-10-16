import React, { useEffect, useState, useRef } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import high_temp from "../assets/high_temp.png";
import min_temp from "../assets/min_temp.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03n": cloud_icon,
    "03d": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        temp_max: data.main.temp_max,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        temp_min: data.main.temp_min,
        cloudiness: data.clouds.all, // Fetching the cloudiness percentage
        icon: icon,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Function to determine background color based on cloudiness
  const getBackgroundColor = (cloudiness) => {
    if (cloudiness <= 20) {
      return "#87CEEB"; // Bright sky blue (Clear sky)
    } else if (cloudiness <= 50) {
      return "#ADD8E6"; // Lighter blue (Partly cloudy)
    } else if (cloudiness <= 80) {
      return "#B0C4DE"; // Light steel blue (Mostly cloudy)
    } else {
      return "#708090"; // Slate gray (Overcast)
    }
  };

  useEffect(() => {
    search("Mumbai"); // Default city for testing
  }, []);

  return (
    <div
      className="weather"
      style={{
        backgroundColor: weatherData ? getBackgroundColor(weatherData.cloudiness) : "white",
        transition: "background-color 0.5s ease", // Smooth transition for background color change
        padding: "20px",
        minHeight: "100vh", // Full page height
      }}
    >
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt="search"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather icon" className="weather-icon" />
          <p className="temperature"> {weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="wind speed" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind speed</span>
              </div>
            </div>

            <div className="col">
              <img src={high_temp} alt="high temp" />
              <div>
                <p>{weatherData.temp_max}°</p>
                <span>High</span>
              </div>
            </div>

            <div className="col">
              <img src={min_temp} alt="low temp" />
              <div>
                <p>{weatherData.temp_min}°</p>
                <span>Low</span>
              </div>
            </div>

            <div className="col">
              <img src={cloud_icon} alt="cloudiness" />
              <div>
                <p>{weatherData.cloudiness} %</p>
                <span>Cloudiness</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;