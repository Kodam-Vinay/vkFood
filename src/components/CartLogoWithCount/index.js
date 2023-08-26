import { BsCart4 } from "react-icons/bs";
import { MdFastfood } from "react-icons/md";
import "./style.css";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import AddToCartContext from "../../context/AddToCartContext";

const CartLogoWithCount = () => {
  const { cartItemsList } = useContext(CartContext);
  const { isAddClicked } = useContext(AddToCartContext);
  return (
    <div className="flex flex-col items-center mr-10 md:mr-0">
      {isAddClicked ? (
        <MdFastfood
          size={20}
          color="red"
          className="add-animation-cart-icon absolute -mt-4"
        />
      ) : (
        <p className="font-bold text-sm text-green-700 shadow-md -mt-3 absolute">
          {cartItemsList.length > 0 && cartItemsList.length}
        </p>
      )}

      <BsCart4 size={26} className={`mt-0 relative`} />
    </div>
  );
};
export default CartLogoWithCount;
