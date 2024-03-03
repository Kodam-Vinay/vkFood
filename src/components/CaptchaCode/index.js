import { useState } from "react";
import ReusableInput from "../../utils/ReusableInput";
import useRandomNumber from "../../utils/useRandomNumber";
import ReusableButton from "../../utils/ReusableButton";
import { Link } from "react-router-dom";
const CaptchaCode = ({ className }) => {
  const randomNumber = useRandomNumber();
  const [number, setNumber] = useState(0);
  const onChnageInput = (event) => {
    setNumber(event.target.value);
  };
  return (
    <>
      <div className={`mt-10 ${className}`}>
        <h1 className={`mt-10 ${className} text-xl font-bold italic mb-10`}>
          {randomNumber}
        </h1>
        {randomNumber !== number && (
          <p className="text-red-500 animate-pulse">
            *Please Enter Above Number
          </p>
        )}
        <ReusableInput
          onChange={onChnageInput}
          className="mb-5 w-52 focus:border-red-400"
          placeholder="Enter Above code"
        />
      </div>
      <Link to="/payment/address">
        <ReusableButton
          value="Go To Adress"
          className={`rounded-md w-52 ${
            randomNumber !== number
              ? "bg-gray-500"
              : "hover:bg-red-700 hover:text-white border add-animation"
          }`}
          disabled={randomNumber !== number}
        />
      </Link>
    </>
  );
};
export default CaptchaCode;
