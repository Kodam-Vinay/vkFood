import { createContext } from "react";

const CartContext = createContext({
  cartItemsList: [],
  setCartItemList: () => {},
  onClickMinus: () => {},
  onClickPlus: () => {},
  onClickRemove: () => {},
  onClickAdd: () => {},
  isAddClicked: false,
  setIsAddClicked: () => {},
});

CartContext.displayName = "CartContext";
export default CartContext;
