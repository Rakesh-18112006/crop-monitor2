const axios = require("axios");
// const { API_KEY } = require("../config/config");

exports.getWeather = async (req, res) => {
  try {
    // const { location = "New York" } = req.query;  // Default to New York if no location provided

    // Visual Crossing API URL for current weather
    const weatherUrl =' https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/vijayawada?unitGroup=metric&key=5FVJ6CQQHNSK3U7U4GEHKEQYW&contentType=json';

    const response = await axios.get(weatherUrl);

    const weatherData = {
      temperature: response.data.currentConditions.temp,
      humidity: response.data.currentConditions.humidity,
      wind_speed: response.data.currentConditions.windspeed,
      precipitation: response.data.currentConditions.precip,
      alert: response.data.currentConditions.precip > 0 || response.data.currentConditions.windspeed > 0 // Alert for heavy rain or wind
    };

    res.json(weatherData);
  } catch (error) {
    console.error("Weather API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};
