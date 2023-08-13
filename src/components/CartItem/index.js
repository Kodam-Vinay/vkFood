import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CLOUDINARY_IMG_URL, SWIGGY_IMG_URL } from "../../config/Constants";
import ReusableButton from "../../utils/ReusableButton";
import { FaRupeeSign } from "react-icons/fa";
import { useContext } from "react";
import CartContext from "../../utils/CartContext";

const CartItem = (props) => {
  const { cartItemDetails } = props;
  const { name, id, price, defaultPrice, imageId, ItemsInCart } =
    cartItemDetails;
  const { onClickMinus, onClickPlus, onClickRemove } = useContext(CartContext);
  const onClickDecrease = () => {
    onClickMinus(id);
  };
  const onClickIncrease = () => {
    onClickPlus(id);
  };

  const onClickRemoveItem = () => {
    onClickRemove(id);
  };

  return (
    <li className="shadow-sm rounded-md shadow-slate-500 p-2 flex">
      <img
        src={
          imageId ? SWIGGY_IMG_URL + imageId : CLOUDINARY_IMG_URL + "no-image"
        }
        alt={name}
        title={name}
        className="h-28 rounded-md w-28 sm:h-36 sm:w-52 shadow-sm shadow-black mr-5"
      />
      <div className="h-full w-full">
        <div className="space-y-2">
          <p className="font-bold text-sm sm:text-xl text-blue-300">{name}</p>
          <div className="div-add-remove-cart-buttons flex items-center justify-between sm:w-20 xs:w-24 mt-4">
            <ReusableButton
              value={<AiOutlineMinus />}
              className="add-animation border hover:bg-blue-300 hover:text-white flex items-center justify-center h-7 w-7"
              onClick={onClickDecrease}
            />
            <p className="mb-2 text-sm sm:text-xl font-bold text-blue-300">
              {ItemsInCart}
            </p>
            <ReusableButton
              value={<AiOutlinePlus />}
              className="add-animation border hover:bg-blue-300 hover:text-white flex items-center justify-center h-7 w-7"
              onClick={onClickIncrease}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between w-full p-2">
          <p className="flex items-center text-sm sm:text-xl">
            <FaRupeeSign />
            <span>
              {price
                ? (price / 100) * ItemsInCart
                : (defaultPrice / 100) * ItemsInCart}
            </span>
          </p>
          <ReusableButton
            value={<AiOutlineClose />}
            className="add-animation border-0 h-2 w-2 -mt-40 sm:-mt-48"
            onClick={onClickRemoveItem}
          />
        </div>
      </div>
    </li>
  );
};
export default CartItem;
