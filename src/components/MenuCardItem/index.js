import { FaRupeeSign } from "react-icons/fa";
import "./style.css";
import CartContext from "../../context/CartContext";
import FoodTypeIcon from "../svgs/FoodTypeIcon";
import { CLOUDINARY_IMG_URL, SWIGGY_IMG_URL } from "../../config/Constants";
import ReusableButton from "../../utils/ReusableButton";
import { useContext, useEffect } from "react";
import { useState } from "react";

const MenuCardItem = (props) => {
  const { menuDetails } = props;
  const { id, name, imageId, price, defaultPrice } = menuDetails;
  const [vegClassifier] = useState(
    menuDetails?.itemAttribute?.vegClassifier
      ? menuDetails?.itemAttribute?.vegClassifier
      : "VEG"
  );
  const { onClickAdd, setIsAddClicked, isAddClicked } = useContext(CartContext);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsAddClicked(false);
    }, 2000);

    console.log(timerId);
    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddClicked]);
  const onClickAddItem = () => {
    onClickAdd(id, menuDetails);
    setIsAddClicked(true);
  };
  return (
    <li className="border-b-2 p-2 flex justify-between hover:shadow-md my-1 shadow-black">
      <div className="w-2/3 space-y-1">
        {vegClassifier && vegClassifier === "VEG" ? (
          <FoodTypeIcon circle="#0b4f28" bg="#41e887" />
        ) : (
          <FoodTypeIcon circle="#F03629" bg="#f59f9f" />
        )}
        <p className="font-bold text-sm">{name}</p>
        <p className="flex items-center">
          <FaRupeeSign />
          <span>
            {price ? Math.round(price / 100) : Math.round(defaultPrice / 100)}
          </span>
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
          type="button"
          className="hover:bg-blue-300 hover:text-white self-center mt-1 border rounded-md px-2 py-1 relative bottom-2"
          onClick={onClickAddItem}
          value="Add +"
        />
      </div>
    </li>
  );
};
export default MenuCardItem;
