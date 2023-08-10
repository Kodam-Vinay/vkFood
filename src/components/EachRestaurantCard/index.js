import { SWIGGY_IMG_URL } from "../../config/Constants";

const EachRestaurantCard = (props) => {
  const { restaurantList } = props;
  const { name, cloudinaryImageId } = restaurantList;
  return (
    <li className="w-full max-w-[260px] border shadow-md rounded-md p-2 sm:mr-2 md:mr-5">
      <img
        src={SWIGGY_IMG_URL + cloudinaryImageId}
        alt="ImageLogo"
        className="w-full h-44"
      />
      <h1 className="font-bold">{name}</h1>
    </li>
  );
};
export default EachRestaurantCard;
