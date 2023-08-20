import { useContext, useState } from "react";
import CreditCardSvg from "../../components/svgs/CreditCardSvg";
import UpiSvg from "../../components/svgs/UpiSvg";
import ReusableButton from "../../utils/ReusableButton";
import { Link } from "react-router-dom";
import OrderDetailsContext from "../../context/OrderDetailsContext";

const paymentMethods = [
  {
    id: "upi",
    value: <UpiSvg />,
    className: "",
    paymentMethod: "UPI",
  },
  {
    id: "card",
    value: <CreditCardSvg />,
    className: "",
    paymentMethod: "Credit/Debit Card",
  },
  {
    id: "cod",
    value: "Cash On Delivery",
    className:
      "flex flex-col justify-center px-2 add-animation cursor-pointer font-bold text-xl md:text-3xl",
    paymentMethod: "Cash On Delivery",
  },
];

const Payment = () => {
  const [activePayment, setActivePayment] = useState("");
  const { setPayMentMode } = useContext(OrderDetailsContext);

  return (
    <div className="p-2 flex flex-col w-full h-[85%] xs:px-5 sm:px-10 md:px-40 lg:px-52 xl:px-80">
      <div className="flex flex-col md:flex-row justify-between items-center text-center">
        <h1 className="font-bold text-xl md:text-3xl">Add Payment Method</h1>
        <p className="text-red-500 animate-pulse">
          *Data is not stored, so don't enter your personal Details
        </p>
      </div>
      <ul className="flex flex-col space-y-4 py-10">
        {paymentMethods.map((each) => (
          <li
            key={each.id}
            className={`border h-16 bg-gray-100 rounded-sm shadow-sm add-animation cursor-pointer ${
              each.className
            } ${activePayment === each.id ? "bg-gray-800 text-white" : ""}`}
            onClick={() => {
              setActivePayment(each.id);
              setPayMentMode(each.paymentMethod);
            }}
          >
            {each.value}
          </li>
        ))}
      </ul>
      <div className="flex self-center md:self-end space-x-2">
        <Link to="/cart">
          <ReusableButton value="Cancel" className="w-fit  add-animation" />
        </Link>
        <Link to={`${activePayment}`}>
          <ReusableButton value="Proceed" className="w-fit  add-animation" />
        </Link>
      </div>
    </div>
  );
};
export default Payment;
