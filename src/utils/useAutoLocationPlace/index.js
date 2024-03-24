import { useEffect } from "react";
import { AUTO_LOCATION_URL } from "../../config/Constants";
import useAutoLocationPoints from "../useAutoLocationPoints";

const useAutoLocationPlace = ({
  isAutoLocationClicked,
  setIsAutoClicked,
  setCityName,
  setAutoLocation,
}) => {
  const autoLocationPoints = useAutoLocationPoints({
    isAutoLocationClicked: isAutoLocationClicked,
  });

  useEffect(() => {
    setAutoLocation({
      lat: autoLocationPoints?.lat,
      lon: autoLocationPoints?.lon,
    });
    getPlaceName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoLocationClicked, autoLocationPoints]);

  const getPlaceName = async () => {
    const condition =
      autoLocationPoints?.lat !== "" && autoLocationPoints?.lon !== "";
    if (condition) {
      const apiUrl = AUTO_LOCATION_URL.replace(
        "lat={lat}&lon={lon}",
        `lat=${autoLocationPoints?.lat}&lon=${autoLocationPoints?.lon}`
      );
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (response.ok === true) {
        isAutoLocationClicked && setCityName(data[0].name);
        setIsAutoClicked(false);
      }
    }
  };
};
export default useAutoLocationPlace;
