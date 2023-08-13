import { createContext } from "react";

const CartContext = createContext({
  onClickMinus: () => {},
  onClickPlus: () => {},
  ItemsInCart: 0,
  cartItemsList: [],
  setCartItemList: () => {},
});

CartContext.displayName = "CartContext";
export default CartContext;
