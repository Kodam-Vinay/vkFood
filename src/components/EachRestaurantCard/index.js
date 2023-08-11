import { Link } from "react-router-dom";
import { SWIGGY_IMG_URL } from "../../config/Constants";
import RatingStar from "../svgs/RatingStar";

const EachRestaurantCard = (props) => {
  const { restaurantList } = props;
  const {
    id,
    name,
    cloudinaryImageId,
    avgRating,
    cuisines,
    locality,
    areaName,
  } = restaurantList;
  return (
    <Link to={`${id}`} className="w-full sm:max-w-[260px] add-animation">
      <li className="flex sm:h-[390px] sm:max-w-[260px] sm:flex-col items-center xs:items-start border shadow-md rounded-md p-2 sm:mr-5 sm:mb-3">
        <img
          src={SWIGGY_IMG_URL + cloudinaryImageId}
          alt="ImageLogo"
          className="w-24 h-24 sm:w-[90%] self-center xs:h-40 xs:w-40 xs:flex-shrink-0 rounded-md shadow-sm sm:mb-2 shadow-slate-600 mr-5 sm:mr-0"
        />
        <div className="flex flex-col m-0 space-y-1 sm:ml-3">
          <h1 className="font-bold text-base sm:text-xl">{name}</h1>
          <p className="font-[500] text-sm sm:text-base flex items-center">
            <RatingStar className="h-4 xs:h-5 sm:h-6" />
            <span className="ml-2">{avgRating}</span>
          </p>
          <p className="font-[500] text-sm sm:text-base">
            {cuisines.slice(0, 4).join(", ")}
          </p>
          <p className="font-[300] text-sm">
            {locality ? locality + "," : null} {areaName}
          </p>
        </div>
      </li>
    </Link>
  );
};
export default EachRestaurantCard;
