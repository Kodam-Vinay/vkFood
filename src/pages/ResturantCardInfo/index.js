import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDeviceCheck from "../../utils/useDeviceCheck";
import {
  RESTAURANT_CARD_API_URL_DESKTOP,
  RESTAURANT_CARD_API_URL_MOBILE,
} from "../../config/Constants";
import MenuCardShimmer from "../../components/MenuCardShimmer";
import CartContext from "../../context/CartContext";
import NavigationContext from "../../context/NavigationContext";

import ResturantClosedPage from "../../components/ResturantClosedPage";
import RestroCardShowPage from "../../components/RestroCardShowPage";

const constApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ResturantCardInfo = () => {
  const { id } = useParams();

  const [apiStaus, setApiStatus] = useState({
    status: constApiStatus.initial,
    errorMsg: "",
    cityName: "",
    data: {},
  });
  const isMobile = useDeviceCheck();
  let geoLocation = JSON.parse(localStorage.getItem("menuItem"));
  if (geoLocation === null) {
    geoLocation = {
      lat: 17.360589,
      lon: 78.4740613,
    };
  }
  const { lat, lon } = geoLocation;
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  const { setActiveId } = useContext(NavigationContext);
  const { cartItemsList } = useContext(CartContext);

  const getData = async () => {
    setApiStatus((prev) => ({
      ...prev,
      status: constApiStatus.inProgress,
    }));
    const apiUrl = isMobile
      ? RESTAURANT_CARD_API_URL_MOBILE.replace(
          "lat=17.385044&lng=78.486671",
          `lat=${lat}&lng=${lon}`
        ) + id
      : RESTAURANT_CARD_API_URL_DESKTOP.replace(
          "lat=17.385044&lng=78.486671",
          `lat=${lat}&lng=${lon}`
        ) + id;
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      let menuInfo = null;
      if (isMobile) {
        if (
          data?.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
            ?.card?.card?.itemCards
        ) {
          menuInfo =
            data?.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
              ?.card?.card?.itemCards;
        } else {
          menuInfo =
            data?.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
              ?.card?.card?.itemCards;
        }
      } else {
        if (
          data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
            ?.card?.card?.itemCards
        ) {
          menuInfo =
            data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
              ?.card?.card?.itemCards;
        } else if (
          data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
            ?.card?.card?.itemCards
        ) {
          menuInfo =
            data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
              ?.card?.card?.itemCards;
        } else {
          menuInfo =
            data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]
              ?.card?.card?.itemCards;
        }
      }

      setApiStatus((prev) => ({
        ...prev,
        status: constApiStatus.success,
        data: {
          restaurantInfo: data?.data?.cards[0]?.card?.card?.info,
          menuInfo: menuInfo,
        },
      }));
    } else {
      setApiStatus((prev) => ({
        ...prev,
        status: constApiStatus.failure,
        errorMsg: "The Restaurant is Not Found",
      }));
    }
  };

  const SuccessView = () => {
    const { restaurantInfo, menuInfo } = apiStaus?.data;
    const [searchValue, setSearchValue] = useState("");
    const {
      name,
      cloudinaryImageId,
      cuisines,
      areaName,
      city,
      avgRating,
      totalRatingsString,
      costForTwoMessage,
      availability,
      sla: { slaString },
    } = restaurantInfo;

    const [filterData, setFilterData] = useState(
      menuInfo.length > 0 ? menuInfo : []
    );

    useEffect(() => {
      if (searchValue === "") return;
      const filterData = menuInfo?.filter((eachItem) =>
        eachItem?.card?.info?.name
          ?.toLowerCase()
          .includes(searchValue?.toLowerCase())
      );
      setFilterData(filterData);
    }, [searchValue]);

    return (
      <div className="p-0 flex flex-col justify-center w-full">
        {availability?.opened ? (
          <RestroCardShowPage
            cloudinaryImageId={cloudinaryImageId}
            name={name}
            cuisines={cuisines}
            areaName={areaName}
            city={city}
            costForTwoMessage={costForTwoMessage}
            slaString={slaString}
            avgRating={avgRating}
            totalRatingsString={totalRatingsString}
            filterData={filterData}
            cartItemsList={cartItemsList}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
        ) : (
          <ResturantClosedPage name={name} setActiveId={setActiveId} />
        )}
      </div>
    );
  };

  const FailureView = () => <div>Failure</div>;

  const RenderResults = () => {
    switch (apiStaus.status) {
      case constApiStatus.inProgress:
        return <MenuCardShimmer />;
      case constApiStatus.success:
        return <SuccessView />;
      case constApiStatus.failure:
        return <FailureView />;
      default:
        return null;
    }
  };

  return (
    <div className="p-2 h-[85%] xs:px-5 sm:px-10 md:px-40 lg:px-52 xl:px-80 relative">
      <div className="main-body h-full w-full flex flex-col mt-4">
        <div className="mb-4">{<RenderResults />}</div>
      </div>
    </div>
  );
};
export default ResturantCardInfo;
