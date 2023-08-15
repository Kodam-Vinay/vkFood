import { useEffect, useState } from "react";

const useAutoLocation = async () => {
  useEffect(() => {
    getLocation();
  }, []);

  const [autoGeoLaction, setAutoGeoLocation] = useState({
    lat: "",
    lon: "",
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("geolocation is not supported");
    }
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setAutoGeoLocation({
        lat: latitude,
        lon: longitude,
      });
    }
  };

  function error() {
    console.log("Unable to get the position");
  }

  return autoGeoLaction;
};

export default useAutoLocation;
