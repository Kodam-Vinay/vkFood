import { useContext } from "react";
import CartContext from "../../context/CartContext";

const TotalPriceCalucation = () => {
  const { cartItemsList } = useContext(CartContext);
  let TotalPrice = 0;
  cartItemsList.map((each) => {
    if (each.price) {
      TotalPrice += (each.price / 100) * each.ItemsInCart;
    } else {
      TotalPrice += (each.defaultPrice / 100) * each.ItemsInCart;
    }
    return null;
  });
  sessionStorage.setItem("totalPrice", JSON.stringify(TotalPrice));
  return TotalPrice;
};
export default TotalPriceCalucation;
