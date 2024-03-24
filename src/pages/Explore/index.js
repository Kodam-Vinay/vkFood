import { useEffect, useState } from "react";
import EachRestaurantCard from "../../components/EachRestaurantCard";
import Shimmer from "../../components/Shimmer";
import useDeviceCheck from "../../utils/useDeviceCheck";
import useGeoLocations from "../../utils/useGeoLocations";
import {
  ALL_RESTAURANTS_API_URL_DESKTOP,
  ALL_RESTAURANTS_API_URL_MOBILE,
  CLOUDINARY_IMG_URL,
} from "../../config/Constants";
import useAutoLocationPlace from "../../utils/useAutoLocationPlace";
import NoCityFound from "../../components/svgs/NoCityFound";
import ExploreMainPage from "../../components/ExploreMainPage";

const constApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Explore = () => {
  const storedData = JSON.parse(localStorage.getItem("apiData"));
  const checkAutoClicked = JSON.parse(localStorage.getItem("isAutoClicked"));
  const checkSearchClicked = JSON.parse(localStorage.getItem("isAutoClicked"));
  const [autoLocation, setAutoLocation] = useState({
    lat: "",
    lon: "",
  });
  const [isAutoClicked, setIsAutoClicked] = useState(
    checkAutoClicked !== null ? checkAutoClicked : false
  );
  const [isSearchEmpty, setSearchEmpty] = useState(false);

  const [searchClicked, setSearchClicked] = useState(
    checkSearchClicked !== null ? checkSearchClicked : false
  );

  const [apiStatus, setApiStatus] = useState(
    storedData !== null
      ? storedData?.apiStatus
      : {
          status: constApiStatus.initial,
          errorMsg: "",
          cityName: "",
          data: [],
        }
  );

  const [cityName, setCityName] = useState(
    apiStatus?.cityName !== "" ? apiStatus?.cityName : ""
  );

  useAutoLocationPlace({
    isAutoLocationClicked: isAutoClicked,
    setIsAutoClicked: setIsAutoClicked,
    setCityName: setCityName,
    setAutoLocation: setAutoLocation,
  });

  const geoLocations = useGeoLocations({
    cityName,
    setSearchEmpty,
    setApiStatus,
    constApiStatus,
    searchClicked,
    isAutoLocationClicked: isAutoClicked,
  });

  useEffect(() => {
    const apiStatusWithCity = { ...apiStatus, cityName: cityName };
    localStorage.setItem(
      "apiData",
      JSON.stringify({ apiStatus: apiStatusWithCity })
    );
    // eslint-disable-next-line
  }, [searchClicked, isAutoClicked, apiStatus?.success]);

  const isMobile = useDeviceCheck();
  useEffect(() => {
    if (
      (autoLocation.lat !== "" && autoLocation.lon !== "") ||
      (geoLocations.lat !== "" && geoLocations.lon !== "")
    ) {
      getData();
    }
    // eslint-disable-next-line
  }, [geoLocations, autoLocation]);

  const onClickSearch = async () => {
    setSearchClicked(true);
    setIsAutoClicked(false);
    JSON.stringify(localStorage.setItem("isAutoClicked", false));
    JSON.stringify(localStorage.setItem("isSearchCliked", true));
  };

  const onClickAutoLocation = () => {
    setCityName("");
    setIsAutoClicked(true);
    setSearchClicked(false);
    JSON.stringify(localStorage.setItem("isAutoClicked", true));
    JSON.stringify(localStorage.setItem("isSearchCliked", false));
  };

  const getData = async () => {
    const { lat, lon } = isAutoClicked ? autoLocation : geoLocations;
    if (lat === "" && lon === "") {
      setSearchClicked(false);
      setSearchEmpty(true);
    } else {
      setSearchClicked(true);
      setSearchEmpty(false);
      try {
        setApiStatus((prev) => ({
          ...prev,
          status: constApiStatus.inProgress,
        }));
        let apiUrl = "";
        if (cityName !== "") {
          apiUrl = isMobile
            ? ALL_RESTAURANTS_API_URL_MOBILE.replace(
                "lat=dummy1&lng=dummy2",
                `lat=${lat}&lng=${lon}`
              )
            : ALL_RESTAURANTS_API_URL_DESKTOP.replace(
                "lat=dummy1&lng=dummy2",
                `lat=${lat}&lng=${lon}`
              );
          const response = await fetch(apiUrl);
          if (response.ok === true) {
            const data = await response.json();
            if (isMobile) {
              if (
                data?.data?.success?.cards[4]?.gridWidget?.gridElements
                  ?.infoWithStyle?.restaurants
              ) {
                setApiStatus((prev) => ({
                  ...prev,
                  data: data?.data?.success?.cards[4]?.gridWidget?.gridElements
                    ?.infoWithStyle?.restaurants,
                  cityName: cityName,
                  status: constApiStatus.success,
                  errorMsg: "",
                }));
              } else {
                setApiStatus((prev) => ({
                  ...prev,
                  data: data?.data?.success?.cards[1]?.gridWidget?.gridElements
                    ?.infoWithStyle?.restaurants,
                  cityName: cityName,
                  status: constApiStatus.success,
                  errorMsg: "",
                }));
              }
            } else {
              if (
                data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
                  ?.restaurants
              ) {
                setApiStatus((prev) => ({
                  ...prev,
                  data: data?.data?.cards[2]?.card?.card?.gridElements
                    ?.infoWithStyle?.restaurants,
                  cityName: cityName,
                  status: constApiStatus.success,
                  errorMsg: "",
                }));
              } else {
                setApiStatus((prev) => ({
                  ...prev,
                  data: data?.data?.cards[1]?.card?.card?.gridElements
                    ?.infoWithStyle?.restaurants,
                  cityName: cityName,
                  status: constApiStatus.success,
                  errorMsg: "",
                }));
              }
            }
          } else {
            setApiStatus((prev) => ({
              ...prev,
              status: constApiStatus.failure,
              errorMsg: "Please Check Your City Name Once",
            }));
          }
        }
      } catch (error) {
        setApiStatus((prev) => ({
          ...prev,
          status: constApiStatus.failure,
          errorMsg:
            "Something Got an Error Please Refresh The Page And Try Again",
        }));
      }
    }
  };

  const SuccessView = () => {
    return (
      <>
        {apiStatus?.data?.length > 0 ? (
          <ul className="p-1 flex flex-col items-center justify-center sm:flex-row sm:flex-wrap w-full space-y-3 h-full">
            <li></li>
            {apiStatus?.data?.map((each) => (
              <EachRestaurantCard
                key={each.info.id}
                restaurantList={each?.info}
              />
            ))}
          </ul>
        ) : (
          <div className="h-full flex flex-col justify-center items-center">
            <img
              src={CLOUDINARY_IMG_URL + "delivery-availibility"}
              alt="not available"
              className="h-56 md:h-72 w-64 md:w-96"
            />
            <p className="text-xl font-bold mt-4 text-center">
              🥺 Sorry, Delivery is Not Available in your city
            </p>
          </div>
        )}
      </>
    );
  };

  const FailureView = () => (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <NoCityFound />
      <p className="text-xl font-bold mt-4">{apiStatus.errorMsg}</p>
    </div>
  );

  const RenderResults = () => {
    switch (apiStatus.status) {
      case constApiStatus.inProgress:
        return <Shimmer />;
      case constApiStatus.success:
        return <SuccessView />;
      case constApiStatus.failure:
        return <FailureView />;
      default:
        return null;
    }
  };

  return (
    <ExploreMainPage
      searchClicked={searchClicked}
      isSearchEmpty={isSearchEmpty}
      setSearchClicked={setSearchClicked}
      setCityName={setCityName}
      onClickSearch={onClickSearch}
      RenderResults={RenderResults}
      onClickAutoLocation={onClickAutoLocation}
      cityName={cityName}
      apiStatus={apiStatus}
      constApiStatus={constApiStatus}
    />
  );
};
export default Explore;
