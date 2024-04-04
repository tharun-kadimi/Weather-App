// WeatherApp.js
import React, { useState } from "react";
import "./WeatherApp.css";

const API_KEY = "65acab07d7b1b8d8f64c215ff73242fd";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      } else {
        throw new Error("City not found");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeather(null);
    }
  };

  return (
    <div className="bg-container">
      <div className="weather-app">
        <h2>Weather App</h2>
        <input
          type="text"
          value={city}
          placeholder="Enter Any city in the world"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
        {weather && (
          <div className="weather-info">
            <h3>
              {weather.name}, {weather.sys.country}
            </h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Description: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
