import { createContext } from "react";

const AddToCartContext = createContext({
  isAddClicked: false,
  setIsAddClicked: () => {},
  onClickAdd: () => {},
});
AddToCartContext.displayName = "AddToCartContext";
export default AddToCartContext;
