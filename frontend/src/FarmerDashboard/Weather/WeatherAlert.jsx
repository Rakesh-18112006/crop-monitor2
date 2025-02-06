import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WeatherAlert = () => {
  const [alertTriggered, setAlertTriggered] = useState(
    localStorage.getItem("alertTriggered") === "true"
  );

  useEffect(() => {
    if (!alertTriggered) {
      setAlertTriggered(true);
      localStorage.setItem("alertTriggered", "true"); // Mark alert as played

      toast.warning("⚠️ Severe Weather Alert! Check Dashboard!");

      const alertAudio = new Audio("/alert.mp3");
      alertAudio.play(); // Play the alarm sound

      setTimeout(() => {
        window.location.href = "/dashboard"; // Redirect after 5 sec
      }, 5000);
    }
  }, [alertTriggered]);

  return <p>Weather alert is triggered!</p>;
};

export default WeatherAlert;
