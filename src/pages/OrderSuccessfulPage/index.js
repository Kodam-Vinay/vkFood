import { useContext } from "react";
import { FaRupeeSign } from "react-icons/fa";
import OrderDetailsContext from "../../context/OrderDetailsContext";
import ReusableButton from "../../utils/ReusableButton";
import { Link } from "react-router-dom";
import NavigationContext from "../../context/NavigationContext";
const OrderSuccessfulPage = () => {
  const { paymentMode, userAddress, orderTotalRupees, cardNumber } =
    useContext(OrderDetailsContext);
  const { setActiveId } = useContext(NavigationContext);
  console.log(paymentMode);
  console.log(userAddress);
  console.log(orderTotalRupees);
  console.log(cardNumber);
  return (
    <div className="p-2 flex flex-col w-full h-[85%] xs:px-5 sm:px-10 md:px-40 lg:px-52 xl:px-80 space-y-3">
      {orderTotalRupees && paymentMode && userAddress ? (
        <>
          <p className="text-red-500 animate-pulse">
            *Data is not stored, so don't enter your personal Details
          </p>
          <h1 className="font-bold text-xl md:text-3xl">
            Hello, {userAddress.name}
          </h1>

          <h1>Your Order was Successful ✅</h1>
          <div className="my-5">
            <h1 className="text-xl font-bold">Order Details</h1>
            <p className="flex items-center">
              Order Total:{" "}
              <span className="flex items-center ml-5">
                <FaRupeeSign />
                {orderTotalRupees}
              </span>
            </p>
            <p className="flex items-center">payment Method: {paymentMode}</p>
            {paymentMode === "Credit/Debit Card" ? (
              <p>ending with {cardNumber.slice(12, 16)}</p>
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <h1 className="text-xl font-bold">Address</h1>
            <p>
              {userAddress.address}, {userAddress.locality},{" "}
              {userAddress.pincode}
            </p>
            <p>Mobile No :- {userAddress.mobileNumber}</p>
          </div>
          <Link to="/explore">
            <ReusableButton
              value="Explore"
              onClick={() => setActiveId("explore")}
            />
          </Link>
        </>
      ) : (
        <>
          <h1>There is Nothing to Show Here</h1>
          <Link to="/explore">
            <ReusableButton
              value="Explore"
              onClick={() => setActiveId("explore")}
            />
          </Link>
        </>
      )}
    </div>
  );
};
export default OrderSuccessfulPage;
