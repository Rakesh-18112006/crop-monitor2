import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundImages from "./BackgroundImages"; // Import BackgroundImage component
import WeatherCard from "./WeatherCard";
import Navbar from "../../components/Navbar";

const API_URL = "http://localhost:5000/api/weather"; // Your backend API endpoint

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setWeather(data);
        setLoading(false);

        if (data.alert) {
          toast.warning("⚠️ Severe Weather Alert! Check Dashboard!");
        }
      } catch (err) {
        setError("Failed to load weather data");
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 60000); // Fetch every 1 minute (60,000 ms)

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-black text-center mt-10 text-lg">Loading weather...</p>;
  if (error) return <p className="text-red-500 text-center mt-10 text-lg">{error}</p>;

  return (
    <>
    <Navbar />
    <div className="relative w-full h-screen flex justify-center items-center">
      {/* Background Image covering the whole screen */}
      <BackgroundImages weather={weather} />

      {/* Weather Info Card */}
     <WeatherCard weather={weather} ></WeatherCard>
      </div>
      </>
  );
};

export default WeatherWidget;
