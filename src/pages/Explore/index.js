import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { ProgressBar } from "react-loader-spinner";
import ReusableInput from "../../utils/ReusableInput";
import ReusableButton from "../../utils/ReusableButton";
import EachRestaurantCard from "../../components/EachRestaurantCard";
import Shimmer from "../../components/Shimmer";
import useDeviceCheck from "../../utils/useDeviceCheck";
import useGeoLocations from "../../utils/useGeoLocations";
import {
  ALL_RESTAURANTS_API_URL_DESKTOP,
  ALL_RESTAURANTS_API_URL_MOBILE,
} from "../../config/Constants";
// import { AutoLocation } from "../../utils/AutoLocation";

const constApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Explore = () => {
  const storedData = JSON.parse(sessionStorage.getItem("apiData"));
  const [cityName, setCityName] = useState(
    storedData !== null ? storedData.cityName : ""
  );
  const [isSearchEmpty, setSearchEmpty] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  // const { latitude, longitude, error } = AutoLocation();
  const [apiStaus, setApiStatus] = useState(
    storedData !== null
      ? storedData.apiStaus
      : {
          status: constApiStatus.initial,
          errorMsg: "",
          cityName: "",
          data: [],
        }
  );
  // useEffect(() => {
  //   setToStorage();
  // }, [latitude, longitude]);

  // const setToStorage = () => {
  //   sessionStorage.setItem(
  //     "apiData",
  //     JSON.stringify({
  //       apiStaus,
  //       geoLocations: { latitude, longitude },
  //       cityName,
  //     })
  //   );
  // };
  const geoLocations = useGeoLocations(
    cityName,
    setSearchEmpty,
    setApiStatus,
    constApiStatus,
    searchClicked
  );

  sessionStorage.setItem(
    "apiData",
    JSON.stringify({ apiStaus, geoLocations, cityName })
  );

  const isMobile = useDeviceCheck();
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [geoLocations]);

  const onClickSearch = async () => {
    setSearchClicked(true);
  };

  const onChangeCityName = (event) => {
    setSearchClicked(false);
    setCityName(event.target.value);
  };

  const getData = async () => {
    const { lat, lon } = geoLocations;
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
      {apiStaus?.data?.length > 0 ? (
        <ul className="p-1 flex flex-col items-center justify-center sm:flex-row sm:flex-wrap w-full space-y-3 h-full">
          <li></li>
          {apiStaus?.data?.map((each) => (
            <EachRestaurantCard
              key={each.info.id}
              restaurantList={each?.info}
            />
          ))}
        </ul>
      ) : (
        <div className="h-full flex flex-col justify-center items-center">
          <p className="text-xl font-bold">
            🥺 Sorry, Delivery is Not Available in your city
          </p>
        </div>
      )}
    </>
  );

  const FailureView = () => (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1>Failure View</h1>
      <p>{apiStaus.errorMsg}</p>
    </div>
  );

  const RenderResults = () => {
    switch (apiStaus.status) {
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

  // AutoLocation(cityName)
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <div className="p-2 h-[85%] sm:px-3 md:px-10 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center overflow-hidden h-[15%] md:h-[10%]">
        <div
          className={`search-city flex items-center border border-gray-400 w-fit self-center sm:self-start rounded-md ${
            searchClicked && isSearchEmpty ? "border-red-600 border-2" : null
          }`}
        >
          <ReusableInput
            type="search"
            className="p-1 pb-2 w-full max-w-[250px] border-0"
            placeholder="Enter A City Name"
            onChange={onChangeCityName}
            onKeyDown={(e) => (e.key === "Enter" ? onClickSearch() : null)}
            value={cityName}
          />
          <ReusableButton
            value={<FaSearch />}
            className={`h-10 border flex flex-col items-center justify-center border-gray-400 border-r-0 border-b-0 border-t-0 hover:bg-blue-300 ${
              searchClicked && isSearchEmpty ? "border-red-600 border-2" : null
            }`}
            onClick={onClickSearch}
          />
        </div>
        {apiStaus?.status === constApiStatus?.success ? (
          <p className="text-center sm:m-auto flex items-center justify-center my-2 font-bold capitalize">
            <MdLocationPin />
            {apiStaus.cityName}
          </p>
        ) : apiStaus?.status === constApiStatus?.inProgress ? (
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
      <div className="main-body w-full flex flex-col mt-4 overflow-y-auto h-full">
        <div className="mb-4">{RenderResults()}</div>
      </div>
    </div>
  );
};
export default Explore;
