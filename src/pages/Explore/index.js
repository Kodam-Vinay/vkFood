import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { ProgressBar } from "react-loader-spinner";
import { BiCurrentLocation } from "react-icons/bi";
import ReusableInput from "../../utils/ReusableInput";
import ReusableButton from "../../utils/ReusableButton";
import EachRestaurantCard from "../../components/EachRestaurantCard";
import Shimmer from "../../components/Shimmer";
import useDeviceCheck from "../../utils/useDeviceCheck";
import useGeoLocations from "../../utils/useGeoLocations";
import {
  ALL_RESTAURANTS_API_URL_DESKTOP,
  ALL_RESTAURANTS_API_URL_MOBILE,
  CLOUDINARY_IMG_URL,
} from "../../config/Constants";
import AutoLocation from "../../utils/AutoLocation";
import useAutoLocationPlace from "../../utils/useAutoLocationPlace";
import NoCityFound from "../../components/svgs/NoCityFound";

const constApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Explore = () => {
  const storedData = JSON.parse(sessionStorage.getItem("apiData"));

  const [autoLocation, setAutoLocation] = useState({
    lat: "",
    lon: "",
  });

  const [isAutoClicked, setIsAutoClicked] = useState(false);
  const [isSearchEmpty, setSearchEmpty] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
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

  const autoCityName = useAutoLocationPlace({
    isAutoLocationClicked: isAutoClicked,
    setIsAutoClicked: setIsAutoClicked,
  });

  useEffect(() => {
    setCityName(apiStatus?.cityName);
  }, [apiStatus?.cityName]);

  useEffect(() => {
    if (isAutoClicked) setCityName(autoCityName);
  }, [isAutoClicked]);

  const geoLocations = useGeoLocations(
    cityName,
    setSearchEmpty,
    setApiStatus,
    constApiStatus,
    searchClicked
  );

  useEffect(() => {
    sessionStorage.setItem(
      "apiData",
      JSON.stringify({ apiStatus, geoLocations })
    );
  }, [apiStatus, geoLocations, searchClicked]);

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
  };

  const onClickAutoLoaction = async () => {
    AutoLocation();
    setIsAutoClicked(true);
    setSearchClicked(false);
    const result = JSON.parse(localStorage.getItem("autoLocation"));
    if (result !== null) {
      setAutoLocation(result);
    }
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
              }));
            } else {
              setApiStatus((prev) => ({
                ...prev,
                data: data?.data?.success?.cards[1]?.gridWidget?.gridElements
                  ?.infoWithStyle?.restaurants,
                cityName: cityName,
                status: constApiStatus.success,
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
              }));
            } else {
              setApiStatus((prev) => ({
                ...prev,
                data: data?.data?.cards[1]?.card?.card?.gridElements
                  ?.infoWithStyle?.restaurants,
                cityName: cityName,
                status: constApiStatus.success,
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

  const SuccessView = () => (
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
    <div className="p-2 h-[90%] sm:px-3 md:px-10 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center overflow-hidden h-[14%] md:h-[10%]">
        <div className="flex">
          <div
            className={`search-city flex items-center border border-gray-400 w-fit self-center sm:self-start rounded-md ${
              searchClicked && isSearchEmpty ? "border-red-600 border-2" : null
            }`}
          >
            <ReusableInput
              type="search"
              className="p-1 pb-2 w-full max-w-[250px] border-0"
              placeholder="Enter A City Name"
              onChange={(e) => {
                setSearchClicked(false);
                setCityName(e.target.value);
              }}
              onKeyDown={(e) => (e.key === "Enter" ? onClickSearch() : null)}
              value={cityName}
            />
            <ReusableButton
              value={<FaSearch />}
              className={`h-10 border flex flex-col items-center justify-center border-gray-400 border-r-0 border-b-0 border-t-0 hover:bg-red-700 hover:text-white ${
                searchClicked && isSearchEmpty
                  ? "border-red-600 border-2"
                  : null
              }`}
              onClick={onClickSearch}
            />
          </div>
          <ReusableButton
            value={
              <>
                <span className="hidden md:block md:mr-2 font-bold">
                  Get Current Location
                </span>
                <BiCurrentLocation />
              </>
            }
            className={`h-10 border flex flex-row items-center justify-center ml-2 hover:bg-red-700 hover:text-white`}
            onClick={onClickAutoLoaction}
          />
        </div>
        {apiStatus?.status === constApiStatus?.success ? (
          <p className="text-center sm:m-auto flex items-center justify-center my-2 font-bold capitalize">
            <MdLocationPin />
            {apiStatus.cityName}
          </p>
        ) : apiStatus?.status === constApiStatus?.inProgress ? (
          <p className="text-center sm:mx-auto flex items-center justify-center">
            <ProgressBar
              height="40"
              width="150"
              borderColor="#F4442E"
              barColor="#51E5FF"
            />
          </p>
        ) : null}
      </div>
      <div className="main-body w-full flex flex-col mt-4 overflow-y-auto h-full pb-20">
        <div className="mb-4">{RenderResults()}</div>
      </div>
    </div>
  );
};
export default Explore;
