import React from "react";
import "./weatherCard.css"; // Import the CSS file
import { WiThermometer, WiHumidity, WiStrongWind, WiRain } from "react-icons/wi";

const WeatherCard = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2>Weather Forecast</h2>

      <div className="weather-details">
        <div className="weather-detail">
          <WiThermometer className="text-red-500" />
          <span>{weather.temperature}°C</span>
        </div>
        <div className="weather-detail">
          <WiHumidity className="text-blue-300" />
          <span>{weather.humidity}% Humidity</span>
        </div>
        <div className="weather-detail">
          <WiStrongWind className="text-gray-400" />
          <span>{weather.wind_speed} km/h Wind</span>
        </div>
        <div className="weather-detail">
          <WiRain className="text-blue-500" />
          <span>{weather.precipitation} mm Rain</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;