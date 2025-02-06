import React from "react";

const BackgroundImages = ({ weather }) => {
  const getBackgroundImage = () => {
      const currentHour = new Date().getHours();

    if (weather) {
      if (weather.precipitation > 10) {
        return "rain.jpg"; // Background for rain
      } else if (weather.temperature > 30) {
        return "morning.jpg"; // Sunny weather background
      } else if (currentHour >= 6 && currentHour < 12) {
        return "morning.jpg"; // Morning background
      } else if (currentHour >= 12 && currentHour < 18) {
        return "afternoon.jpg"; // Afternoon background
      } else {
        return "night2.jpg"; // Night background
      }
    } else {
      return "night2.jpg"; // Default background if weather data is unavailable
    }
  };

  return (
    <div
      className="w-full h-full absolute top-0 left-0 bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
      }}
    />
  );
};

export default BackgroundImages;
