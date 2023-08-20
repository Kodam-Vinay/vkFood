import { createContext } from "react";

const OrderDetailsContext = createContext({
  paymentMode: "",
  setPayMentMode: () => {},
  orderTotalRupees: 0,
  setOrderTotalRupees: () => {},
  userAddress: {},
  setUserAdress: () => {},
  cardNumber: "",
  setCardNumber: () => {},
});
export default OrderDetailsContext;
