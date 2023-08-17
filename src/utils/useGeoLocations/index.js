import { useEffect, useState } from "react";
import { GEO_LOCATION_URL } from "../../config/Constants";

const useGeoLocations = (
  cityName,
  setSearchEmpty,
  setApiStatus,
  constApiStatus,
  searchClicked
) => {
  useEffect(() => {
    getGeoLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchClicked]);

  const [geoLocations, setGeoLocations] = useState({ lat: "", lon: "" });
  const getGeoLocation = async () => {
    if (cityName === "" && searchClicked) {
      setSearchEmpty(true);
    } else if (cityName !== "" && searchClicked) {
      setSearchEmpty(false);
      setApiStatus((prev) => ({
        ...prev,
        status: constApiStatus.inProgress,
      }));
      try {
        const apiUrl = GEO_LOCATION_URL.replace(
          "direct?q=Hyderbad",
          `direct?q=${cityName}`
        );
        const data = await fetch(apiUrl);
        const response = await data.json();
        setGeoLocations({
          lat: response[0].lat,
          lon: response[0].lon,
        });
      } catch (error) {
        setApiStatus((prev) => ({
          ...prev,
          status: constApiStatus.failure,
          errorMsg: "Please Enter The Correct City Name",
        }));
      }
    }
  };
  return geoLocations;
};
export default useGeoLocations;
