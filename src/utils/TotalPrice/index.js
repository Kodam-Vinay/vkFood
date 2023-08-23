import { useContext, useEffect } from "react";
import CartContext from "../../context/CartContext";
import OrderDetailsContext from "../../context/OrderDetailsContext";

const TotalPriceCalucation = () => {
  const { cartItemsList } = useContext(CartContext);
  const { setOrderTotalRupees } = useContext(OrderDetailsContext);
  let TotalPrice = 0;
  cartItemsList.map((each) => {
    if (each.price) {
      TotalPrice += (each.price / 100) * each.ItemsInCart;
    } else {
      TotalPrice += (each.defaultPrice / 100) * each.ItemsInCart;
    }
    return TotalPrice;
  });

  useEffect(() => {
    setOrderTotalRupees(Math.round(TotalPrice));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return Math.round(TotalPrice);
};
export default TotalPriceCalucation;
