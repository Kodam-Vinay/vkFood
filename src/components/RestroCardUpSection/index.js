import { IoIosTimer } from "react-icons/io";
import { CLOUDINARY_IMG_URL, SWIGGY_IMG_URL } from "../../config/Constants";
import RatingStar from "../svgs/RatingStar";

const index = ({
  cloudinaryImageId,
  name,
  cuisines,
  areaName,
  city,
  costForTwoMessage,
  slaString,
  avgRating,
  totalRatingsString,
}) => {
  return (
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
          <h1 className="font-bold text-sm sm:text-base md:text-xl">{name}</h1>
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
  );
};

export default index;
