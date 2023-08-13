import { createContext } from "react";

const CartContext = createContext({
  cartItemsList: [],
  setCartItemList: () => {},
  onClickMinus: () => {},
  onClickPlus: () => {},
  onClickRemove: () => {},
});

CartContext.displayName = "CartContext";
export default CartContext;
