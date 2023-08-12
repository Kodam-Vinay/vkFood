import { FaRupeeSign } from "react-icons/fa";
import FoodTypeIcon from "../svgs/FoodTypeIcon";
import { CLOUDINARY_IMG_URL, SWIGGY_IMG_URL } from "../../config/Constants";
import ReusableButton from "../../utils/ReusableButton";

const MenuCardItem = (props) => {
  const { menuDetails } = props;
  const {
    name,
    itemAttribute: { vegClassifier },
    imageId,
    price,
  } = menuDetails;
  return (
    <li className="border-b-2 p-2 flex justify-between">
      <div className="w-2/3 space-y-1">
        {vegClassifier === "VEG" ? (
          <FoodTypeIcon circle="#0b4f28" bg="#41e887" />
        ) : (
          <FoodTypeIcon circle="#F03629" bg="#f59f9f" />
        )}
        <p className="font-bold text-sm">{name}</p>
        <p className="flex items-center">
          <FaRupeeSign />
          <span>{price / 100}</span>
        </p>
      </div>
      <div className="image-and-add-button-container flex flex-col">
        <img
          src={
            imageId ? SWIGGY_IMG_URL + imageId : CLOUDINARY_IMG_URL + "no-image"
          }
          alt={name}
          title={name}
          className="h-28 rounded-md w-48 sm:h-36 sm:w-52 shadow-sm shadow-black"
        />
        <ReusableButton
          value="Add +"
          className="hover:bg-blue-300 hover:text-white self-center mt-1"
        />
      </div>
    </li>
  );
};
export default MenuCardItem;
