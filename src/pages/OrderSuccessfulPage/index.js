import { useEffect, useState } from "react";
import TotalPriceCalucation from "../../utils/TotalPrice";
import { FaRupeeSign } from "react-icons/fa";
const OrderSuccessfulPage = () => {
  const storedData = JSON.parse(sessionStorage.getItem("addressDetails"));
  const total = TotalPriceCalucation();
  const [details, setDetails] = useState({});
  useEffect(() => {
    if (storedData !== null) {
      setDetails(storedData);
    } else {
      setDetails({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-2 flex flex-col w-full h-[85%] xs:px-5 sm:px-10 md:px-40 lg:px-52 xl:px-80 space-y-3">
      {storedData ? (
        <>
          <p className="text-red-500 animate-pulse">
            *Data is not stored, so don't enter your personal Details
          </p>
          <h1 className="font-bold text-xl md:text-3xl">
            Hello, {details.name}
          </h1>
          <h1>Your Order was Successful</h1>
          <h1 className="text-xl font-bold">Order Details : -</h1>
          <p className="flex items-center">
            Order Total:{" "}
            <span className="flex items-center ml-5">
              <FaRupeeSign />
              {total}
            </span>
          </p>
          <h1 className="text-xl font-bold">Address : -</h1>
          <p>
            {details.address}, {details.locality}, {details.pincode}
          </p>
          <p>Mobile No :- {details.mobileNumber}</p>
        </>
      ) : (
        <h1>There is Nothing to Show Here</h1>
      )}
    </div>
  );
};
export default OrderSuccessfulPage;
