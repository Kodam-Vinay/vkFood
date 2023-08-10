import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import ReusableInput from "../../utils/ReusableInput";
import ReusableButton from "../../utils/ReusableButton";
import EachRestaurantCard from "../../components/EachRestaurantCard";
import Shimmer from "../../components/Shimmer";

const constApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Explore = () => {
  const [cityName, setCityName] = useState("");
  const [isSearchEmpty, setSearchEmpty] = useState(false);
  const [geoLactions, setGeoLocations] = useState({
    lat: "",
    lon: "",
  });
  const [apiStaus, setApiStatus] = useState({
    status: constApiStatus.intial,
    errorMsg: "",
    cityName: "",
    data: [],
  });
  useEffect(() => {
    getData();
  }, [geoLactions]);

  const onClickSearch = async () => {
    if (cityName === "") {
      setSearchEmpty(true);
    } else {
      setSearchEmpty(false);
      setApiStatus((prev) => ({
        ...prev,
        status: constApiStatus.inProgress,
      }));
      try {
        const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=a3547addf902f2a1e709f062a2e801dd`;
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

  const getData = async () => {
    const { lat, lon } = geoLactions;
    if (lat === "" && lon === "") {
      setApiStatus((prev) => ({
        ...prev,
        status: constApiStatus.initial,
      }));
    } else {
      try {
        setApiStatus((prev) => ({
          ...prev,
          status: constApiStatus.inProgress,
        }));
        const apiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.385044&lng=78.486671&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
        const response = await fetch(apiUrl);
        if (response.ok === true) {
          const data = await response.json();
          setApiStatus((prev) => ({
            ...prev,
            data: data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants,
            cityName: cityName,
            status: constApiStatus.success,
          }));
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
  console.log(apiStaus.data);
  const SuccessView = () => (
    <>
      {apiStaus.status === constApiStatus.success ? (
        <p className="text-center flex items-center justify-center my-2 font-bold capitalize">
          <MdLocationPin />
          {apiStaus.cityName}
        </p>
      ) : null}
      <ul className="p-2 overflow-y-auto h-full flex flex-col sm:flex-row">
        {apiStaus?.data?.map((each) => (
          <EachRestaurantCard key={each.info.id} restaurantList={each?.info} />
        ))}
      </ul>
    </>
  );

  const FailureView = () => (
    <div className="flex flex-col items-center justify-center h-full w-full">
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

  return (
    <div className="p-2 h-[70%]">
      <div
        className={`search-city flex items-center border border-black w-fit rounded-md ${
          isSearchEmpty ? "border-red-600 border-2" : null
        }`}
      >
        <ReusableInput
          type="search"
          className="p-1 pb-2"
          placeholder="Enter A City Name"
          onChange={(e) => {
            const newCityName = e.target.value;
            setCityName(newCityName);
          }}
          onKeyDown={(e) => (e.key === "Enter" ? onClickSearch() : null)}
          value={cityName}
        />
        <ReusableButton
          value={<FaSearch />}
          className={`h-10 border flex flex-col items-center justify-center border-black border-r-0 border-b-0 border-t-0 hover:bg-blue-300 ${
            isSearchEmpty ? "border-red-600 border-2" : null
          }`}
          onClick={onClickSearch}
        />
      </div>
      <div className="main-body h-full w-full">{RenderResults()}</div>
    </div>
  );
};
export default Explore;
