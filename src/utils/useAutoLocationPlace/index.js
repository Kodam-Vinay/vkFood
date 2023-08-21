import { useEffect, useState } from "react";
import { AUTO_LOCATION_URL } from "../../config/Constants";

const useAutoLocationPlace = (isAutoLocationClicked) => {
  useEffect(() => {
    getPlaceName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoLocationClicked]);
  const location = JSON.parse(localStorage.getItem("autoLocation"));
  const [locationName, setLocationName] = useState("");
  const getPlaceName = async () => {
    const apiUrl = AUTO_LOCATION_URL.replace(
      "lat={lat}&lon={lon}",
      `lat=${location.lat}&lon=${location.lon}`
    );
    const response = await fetch(apiUrl);
    const data = await response.json();
    setLocationName(data[0].name);
  };
  return locationName;
};
export default useAutoLocationPlace;
