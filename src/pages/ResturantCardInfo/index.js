import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosTimer } from "react-icons/io";
import { useParams } from "react-router-dom";
import useDeviceCheck from "../../utils/useDeviceCheck";
import {
  CLOUDINARY_IMG_URL,
  RESTAURANT_CARD_API_URL_DESKTOP,
  RESTAURANT_CARD_API_URL_MOBILE,
  SWIGGY_IMG_URL,
} from "../../config/Constants";
import RatingStar from "../../components/svgs/RatingStar";
import ReusableButton from "../../utils/ReusableButton";
import MenuCardItem from "../../components/MenuCardItem";
import MenuCardShimmer from "../../components/MenuCardShimmer";
import CartContext from "../../context/CartContext";
import NavigationContext from "../../context/NavigationContext";
import ReusableInput from "../../utils/ReusableInput";

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
  console.log(apiStaus);
  const isMobile = useDeviceCheck();

  let geoLocation = JSON.parse(localStorage.getItem("geoLactions"));
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
  const onCickCart = () => {
    setActiveId("cart");
  };
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
    const { restaurantInfo, menuInfo } = apiStaus.data;
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
    let [filterData, setFilterData] = useState(
      menuInfo.length > 0 ? menuInfo : []
    );
    const onSearchMenu = (event) => {
      setFilterData(
        menuInfo.filter((eachItem) =>
          eachItem?.card?.info?.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
      );
    };
    return (
      <div className="p-0 flex flex-col justify-center w-full">
        {availability.opened ? (
          <div className="h-full w-full">
            <div className="h-full w-full">
              <div className="h-full w-full mb-3 flex">
                <img
                  src={
                    cloudinaryImageId
                      ? SWIGGY_IMG_URL + cloudinaryImageId
                      : CLOUDINARY_IMG_URL + "no-image"
                  }
                  alt={name}
                  title={name}
                  className="w-24 h-24 sm:w-40 sm:h-40 rounded-md shadow-md shadow-black mr-4"
                />
                <div className="restaurant-menu-main-img-text space-y-1">
                  <h1 className="font-bold text-sm sm:text-base md:text-xl">
                    {name}
                  </h1>
                  <p className="text-sm">{cuisines.slice(0, 2).join(", ")}</p>
                  <p className="text-sm">
                    {areaName}, {city}
                  </p>
                </div>
              </div>
              <div className="flex items-center sm:-mt-14 sm:ml-36">
                <div className="flex flex-col items-center h-20 w-32 sm:w-44">
                  <p className="text-green-700 font-bold text-sm xs:text-base">
                    {costForTwoMessage}
                  </p>
                  <div className="flex items-center mt-2 font-bold text-sm xs:text-base">
                    <IoIosTimer className="h-4 w-4 xs:h-4 xs:w-4 sm:h-6 sm:w-6" />
                    <p>{slaString ? slaString : "20MIN"}</p>
                  </div>
                </div>
                <div className="rating-container border h-16 w-28 xs:h-20 xs:w-32 rounded-md p-1 space-y-1 sm:space-y-2 ml-2 xs:ml-8">
                  <div className="flex items-center">
                    <RatingStar
                      color="green"
                      className="h-4 w-4 xs:h-4 xs:w-4 sm:h-6 sm:w-6"
                    />
                    <p className="text-green-700 font-bold ml-2 text-sm xs:text-base">
                      {avgRating ? avgRating : "NEW"}
                    </p>
                  </div>
                  <hr />
                  <p className="text-green-700 font-bold text-sm xs:text-base">
                    {totalRatingsString}
                  </p>
                </div>
              </div>
            </div>
            <p className="font-bold text-sm xs:text-base">
              Free Delivery On Order Above Rs.299
            </p>

            <hr className="border-dotted my-2 border-black" />
            <div className="mb-4 flex items-center justify-between w-full">
              <h1 className="font-bold">MENU</h1>
              <div>
                <ReusableInput
                  type="search"
                  onChange={onSearchMenu}
                  placeholder="search in Menu"
                />
              </div>
            </div>
            {cartItemsList.length > 0 ? (
              <Link to="/cart">
                <div className="flex flex-col items-center">
                  <ReusableButton
                    type="button"
                    value={
                      <p>
                        cart{" "}
                        <sup className="text-green-600">
                          {cartItemsList.length}
                        </sup>
                      </p>
                    }
                    className="hover:bg-blue-300 bg-red-100 px-4 font-bold hover:text-white flex fixed bottom-10"
                    onClick={onCickCart}
                  />
                </div>
              </Link>
            ) : null}
            {filterData.length > 0 ? (
              <ul className="menu-restaurant h-[40vh] md:h-[45vh] overflow-y-auto">
                {filterData.map((eachItem) => (
                  <MenuCardItem
                    key={eachItem?.card?.info?.id}
                    menuDetails={eachItem?.card?.info}
                  />
                ))}
              </ul>
            ) : (
              <div className="flex flex-col space-y-1 items-center  h-[40vh]">
                <img
                  src={CLOUDINARY_IMG_URL + "no-food"}
                  alt="no-food"
                  className="w-48"
                />
                <h1 className="font-bold text-xl">No Items Found .🍔</h1>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center h-[80vh]">
            <h1 className="text-xl font-bold text-center">
              <span className="text-2xl text-blue-300">{name}</span> is
              Closed,🥺 Don't worry Checkout Other!!!😊
            </h1>
            <img
              src={CLOUDINARY_IMG_URL + "closed-image"}
              alt="restaurant-closed"
              className="max-h-[300px]"
            />
            <Link to="/explore-food">
              <ReusableButton
                type="button"
                value="Go Back"
                className="hover:bg-blue-300 hover:text-white"
                onClick={setActiveId("explore")}
              />
            </Link>
          </div>
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
