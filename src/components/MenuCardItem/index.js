import { FaRupeeSign } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import Popup from "reactjs-popup";

import "./style.css";
import CartContext from "../../context/CartContext";
import FoodTypeIcon from "../svgs/FoodTypeIcon";
import { CLOUDINARY_IMG_URL, SWIGGY_IMG_URL } from "../../config/Constants";
import ReusableButton from "../../utils/ReusableButton";
import { useContext, useState } from "react";

const MenuCardItem = (props) => {
  const [ItemsInCart, setItemsInCart] = useState(0);
  const { menuDetails } = props;
  const { id, name, imageId, price, defaultPrice } = menuDetails;
  const vegClassifier = menuDetails?.itemAttribute?.vegClassifier;
  let { cartItemsList, setCartItemList } = useContext(CartContext);
  const onClickAdd = () => {
    let result = cartItemsList.find((eachItem) => eachItem.id === id);
    if (result) {
      let newCount = result.ItemsInCart + ItemsInCart;
      const updatedList = cartItemsList.map((eachItem) => {
        if (eachItem.id === id) {
          return { ...eachItem, ItemsInCart: newCount };
        }
        return eachItem;
      });
      setCartItemList(updatedList);
    } else {
      if (ItemsInCart === 0) {
      } else {
        setCartItemList((prev) => [...prev, { ...menuDetails, ItemsInCart }]);
      }
    }
  };
  const onClickMinus = () => {
    if (ItemsInCart > 0) {
      setItemsInCart((prev) => prev - 1);
    }
  };
  const onClickPlus = () => {
    setItemsInCart((prev) => prev + 1);
  };
  return (
    <li className="border-b-2 p-2 flex justify-between">
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
        <Popup
          trigger={
            <button
              type="button"
              className="hover:bg-blue-300 hover:text-white self-center mt-1 border rounded-md px-2 py-1"
            >
              Add +
            </button>
          }
          position="top"
          className="popup-content"
        >
          {(close) => (
            <div className="flex p-2 justify-between">
              <div className="flex flex-col w-full h-full">
                <img
                  src={
                    imageId
                      ? SWIGGY_IMG_URL + imageId
                      : CLOUDINARY_IMG_URL + "no-image"
                  }
                  alt={name}
                  title={name}
                  className="xs:h-20 rounded-md xs:w-32 w-14 h-14 self-center mb-3 add-animation"
                />
                <div className="div-add-remove-cart-buttons flex items-center justify-around">
                  <ReusableButton
                    value={<AiOutlineMinus />}
                    className="add-animation border-none"
                    onClick={onClickMinus}
                  />
                  <p className="text-xl mb-2 text-blue-300 font-bold">
                    {ItemsInCart}
                  </p>
                  <ReusableButton
                    value={<AiOutlinePlus />}
                    className="add-animation border-none"
                    onClick={onClickPlus}
                  />
                </div>
                <ReusableButton
                  type="button"
                  className="hover:bg-blue-300 hover:text-white self-center mt-1 border rounded-md px-2 py-1"
                  value="Add"
                  onClick={onClickAdd}
                />
              </div>
              <button className="close self-end mb-auto " onClick={close}>
                <AiOutlineClose className="add-animation border-none" />
              </button>
            </div>
          )}
        </Popup>
      </div>
    </li>
  );
};
export default MenuCardItem;
