import { GEO_LOCATION_URL } from "../../config/Constants";

const useGeoLocations = (
  cityName,
  setSearchEmpty,
  setApiStatus,
  constApiStatus
) => {
  let geoLactions = { lat: "", lon: "" };
  const getGeoLocation = async () => {
    if (cityName === "") {
      setSearchEmpty(true);
    } else {
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
        geoLactions = {
          lat: response[0].lat,
          lon: response[0].lon,
        };
        localStorage.setItem("geoLactions", JSON.stringify(geoLactions));
      } catch (error) {
        setApiStatus((prev) => ({
          ...prev,
          status: constApiStatus.failure,
          errorMsg: "Please Enter The Correct City Name",
        }));
      }
    }

    return geoLactions;
  };

  return getGeoLocation;
};
export default useGeoLocations;
