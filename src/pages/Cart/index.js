import { useContext } from "react";
import CartContext from "../../utils/CartContext";
import "./style.css";
import CartItem from "../../components/CartItem";
import { v4 as uuidV4 } from "uuid";
import ReusableButton from "../../utils/ReusableButton";
import { CLOUDINARY_IMG_URL } from "../../config/Constants";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItemsList, setCartItemList } = useContext(CartContext);
  const onClickRemoveAll = () => {
    setCartItemList([]);
  };
  let TotalPrice = 0;
  cartItemsList.map((each) => {
    if (each.price) {
      TotalPrice += (each.price / 100) * each.ItemsInCart;
    } else {
      TotalPrice += (each.defaultPrice / 100) * each.ItemsInCart;
    }
    return null;
  });
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
            className="hover:bg-blue-300 hover:text-white"
          />
        </Link>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="w-full h-full p-2">
      <ul className="w-full h-full space-y-2 flex flex-col mt-0">
        <h1 className="font-bold text-xl self-end mb-3">
          <span className="border-0 text-blue-300">Total: {TotalPrice}</span>{" "}
        </h1>
        {cartItemsList.map((eachItem) => (
          <CartItem key={uuidV4()} cartItemDetails={eachItem} />
        ))}
      </ul>
    </div>
  );

  return (
    <div className="p-2 flex flex-col justify-center sm:flex-row w-full h-[90%] xs:px-5 sm:px-10 md:px-40 lg:px-52 xl:px-80 relative overflow-y-hidden">
      <div className="h-full w-full">
        <div className="w-full flex items-center justify-between h-6">
          <h1 className="font-bold text-xl">Cart</h1>
          {cartItemsList.length > 0 && (
            <ReusableButton
              value="Remove All"
              className="font-[500] border-0 text-blue-300"
              onClick={onClickRemoveAll}
            />
          )}
        </div>
        <div className="mt-5 h-full w-full overflow-y-auto">
          {cartItemsList.length > 0 ? renderResults() : renderEmptyPage()}
        </div>
      </div>
    </div>
  );
};
export default Cart;
