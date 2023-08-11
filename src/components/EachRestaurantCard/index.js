import { SWIGGY_IMG_URL } from "../../config/Constants";
import RatingStar from "../svgs/RatingStar";

const EachRestaurantCard = (props) => {
  const { restaurantList } = props;
  const { name, cloudinaryImageId, avgRating, cuisines, locality, areaName } =
    restaurantList;
  return (
    <li className="w-full sm:h-[370px] sm:max-w-[260px] flex sm:flex-col border shadow-md rounded-md p-2 sm:mr-2 md:mr-5">
      <img
        src={SWIGGY_IMG_URL + cloudinaryImageId}
        alt="ImageLogo"
        className="w-24 h-24 sm:w-full xs:h-44 xs:w-48 rounded-md shadow-sm sm:mb-2 shadow-slate-600 flex-shrink-0 mr-5 sm:mr-0"
      />
      <div className="flex flex-col m-0 space-y-1">
        <h1 className="font-bold font-xl">{name}</h1>
        <p className="font-[500] flex items-center">
          <RatingStar />
          <span className="ml-2">{avgRating}</span>
        </p>
        <p className="font-[500] text-base">
          {cuisines.slice(0, 4).join(", ")}
        </p>
        <p className="font-[300] text-sm">
          {locality ? locality + "," : null} {areaName}
        </p>
      </div>
    </li>
  );
};
export default EachRestaurantCard;
