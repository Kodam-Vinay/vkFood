import Cookies from "js-cookie";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CartContext from "../../context/CartContext";

const PaymentRoute = ({ children }) => {
  const { cartItemsList } = useContext(CartContext);
  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken !== undefined && cartItemsList.length === 0) {
    return <Navigate to="/cart" />;
  } else if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
export default PaymentRoute;
