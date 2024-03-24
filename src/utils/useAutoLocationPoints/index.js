import { useEffect, useState } from "react";

const useAutoLocationPoints = ({ isAutoLocationClicked }) => {
  const [location, setLocation] = useState({ lat: "", lon: "" });

  useEffect(() => {
    getLocation();
  }, [isAutoLocationClicked]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("geolocation is not supported");
    }
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ lat: latitude, lon: longitude });
    }
    function error() {
      console.log("Unable to get the position");
    }
  };
  return location;
};

export default useAutoLocationPoints;
