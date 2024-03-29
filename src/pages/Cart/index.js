import { useContext } from "react";
import CartContext from "../../context/CartContext";
import "./style.css";
import CartItem from "../../components/CartItem";
import { v4 as uuidV4 } from "uuid";
import ReusableButton from "../../utils/ReusableButton";
import { CLOUDINARY_IMG_URL } from "../../config/Constants";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import TotalPriceCalucation from "../../utils/TotalPrice";

const Cart = () => {
  const { cartItemsList, setCartItemList } = useContext(CartContext);

  const onClickRemoveAll = () => {
    setCartItemList([]);
  };

  const TotalPrice = TotalPriceCalucation();

  const renderEmptyPage = () => (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <img
        src={CLOUDINARY_IMG_URL + "empty-cart"}
        alt="empty-cart"
        className="max-w-48 mb-4"
      />
      <div className="flex flex-col items-center text-center space-y-3">
        <h1 className="font-bold text-xl sm:text-2xl">Your Cart Is Empty</h1>
        <p className="font-bold sm:text-xl">
          Go to Explore Page and Order Some Food...😊
        </p>
        <Link to="/explore-food">
          <ReusableButton
            value="Go To Explore"
            className="hover:bg-red-700 hover:text-white add-animation"
          />
        </Link>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="w-full h-full p-2 flex flex-col">
      <h1 className="font-bold text-xl mb-3 self-end flex items-center">
        <span className="border-0 text-red-500 flex items-center">Total:</span>
        <span className="flex items-center ml-2">
          <FaRupeeSign />
          {TotalPrice}
        </span>
      </h1>
      <ul className="w-full h-full space-y-2 flex flex-col mt-0 pb-4 pt-2 px-1 overflow-y-auto">
        {cartItemsList.map((eachItem) => (
          <CartItem key={uuidV4()} cartItemDetails={eachItem} />
        ))}
      </ul>
    </div>
  );

  return (
    <div className="p-2 flex flex-col justify-center sm:flex-row w-full h-[90%] xs:px-5 sm:px-10 md:px-40 lg:px-52 xl:px-80 overflow-hidden">
      <div className="h-full w-full flex flex-col">
        <div className="w-full flex items-center justify-between h-6">
          <h1 className="font-bold text-xl">Cart</h1>
          {cartItemsList.length > 0 && (
            <ReusableButton
              value="Remove All"
              className="font-[500] border-0 text-red-500 add-animation"
              onClick={onClickRemoveAll}
            />
          )}
        </div>
        <div className="mt-5 h-[75%] md:h-[85%] w-full">
          {cartItemsList.length > 0 ? renderResults() : renderEmptyPage()}
        </div>
        {cartItemsList.length > 0 ? (
          <div className="space-x-9 flex flex-row items-center self-center md:self-end h-[15%]">
            <Link
              to="/payment"
              className="flex items-center border rounded-md add-animation p-1 h-fit px-10 py-5 md:px-2 md:py-0"
            >
              <ReusableButton
                value="CheckOut"
                className="font-[500] text-red-500 border-0 hidden md:block"
              />
              <MdShoppingCartCheckout />
            </Link>
            <Link
              to="/explore-food"
              className="flex items-center border rounded-md add-animation p-1 h-fit px-10 py-5 md:px-2 md:py-0"
            >
              <ReusableButton
                value="Add More Items"
                className="font-[500] text-red-500 border-0 hidden md:block"
              />
              <AiOutlinePlus />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Cart;
