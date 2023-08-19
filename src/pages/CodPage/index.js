import { useState } from "react";
import ReusableInput from "../../utils/ReusableInput";
import ReusableButton from "../../utils/ReusableButton";
import { Link } from "react-router-dom";
import useRandomNumber from "../../utils/useRandomNumber";
const CodPage = () => {
  const randomNumber = useRandomNumber();
  const [number, setNumber] = useState(0);
  const onChnageInput = (event) => {
    setNumber(event.target.value);
  };
  return (
    <div className="p-2 flex flex-col w-full h-[85%] xs:px-5 sm:px-10 md:px-40 lg:px-52 xl:px-80">
      <div className="flex flex-col md:flex-row justify-between items-center text-center">
        <h1 className="font-bold text-xl md:text-3xl">Cash On Delivery</h1>
        <p className="text-red-500 animate-pulse">
          *Data is not stored, so don't enter your personal Details
        </p>
      </div>
      <div className="mt-10">
        <h1 className="text-xl font-bold italic mb-10">{randomNumber}</h1>
        <p className="text-red-500 animate-pulse">*Please Enter Above Number</p>
        <ReusableInput
          onChange={onChnageInput}
          className="mb-5 w-52"
          placeholder="Enter Above code"
        />
      </div>
      <Link to="/payment/address">
        <ReusableButton
          value="Go To Adress"
          className={`rounded-md w-52 ${
            randomNumber !== number
              ? "bg-gray-500"
              : "hover:bg-blue-300 hover:text-white border"
          }`}
          disabled={randomNumber !== number}
        />
      </Link>
    </div>
  );
};
export default CodPage;
