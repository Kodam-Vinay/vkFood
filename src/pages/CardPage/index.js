import { useContext, useState } from "react";
import CaptchaCode from "../../components/CaptchaCode";
import ReusableInput from "../../utils/ReusableInput";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import OrderDetailsContext from "../../context/OrderDetailsContext";
import ReusableButton from "../../utils/ReusableButton";

const CardPage = () => {
  const { setCardNumber } = useContext(OrderDetailsContext);

  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [focus, setFocus] = useState("");
  const [isDetailsEntered, setIsDetailsEntered] = useState(false);

  const onSubmitDetails = (event) => {
    event.preventDefault();
    if (
      number.length === 16 &&
      cvc.length === 3 &&
      expiry.length === 4 &&
      name.length >= 4
    ) {
      setIsDetailsEntered(true);
      setCardNumber(number);
    } else {
      setIsDetailsEntered(false);
    }
  };

  return (
    <div className="p-2 flex flex-col w-full h-[85%] xs:px-5 sm:px-10 md:px-40 lg:px-52 xl:px-80">
      <div className="flex flex-col md:flex-row justify-between items-center text-center mb-4">
        <h1 className="font-bold text-xl md:text-3xl">Debit/Credit Card</h1>
        <p className="text-red-500 animate-pulse">
          *Data is not stored, don't enter your personal Details
        </p>
      </div>
      <div className="">
        <Cards
          number={number}
          expiry={expiry}
          cvc={cvc}
          name={name}
          focused={focus}
        />

        <form
          className="flex flex-col items-center mt-2 md:5"
          onSubmit={onSubmitDetails}
        >
          <div className="flex w-full mb-2">
            <ReusableInput
              type="tel"
              value={number}
              placeholder="Card Number"
              maxLength={16}
              onChange={(event) => {
                setNumber((v) =>
                  event.target.validity.valid ? event.target.value : ""
                );
              }}
              pattern="[0-9]*"
              onFocus={(event) => setFocus(event.target.name)}
              className="focus:border-blue-400 border-2 w-1/2 text-xs md:text-base mr-2"
            />
            <ReusableInput
              type="text"
              value={name}
              placeholder="Card Holder Name"
              onChange={(event) => setName(event.target.value)}
              onFocus={(event) => setFocus(event.target.name)}
              className="focus:border-blue-400 border-2 w-1/2 text-xs md:text-base"
            />
          </div>
          <div className="flex w-full">
            <ReusableInput
              type="tel"
              value={cvc}
              placeholder="CVC"
              onChange={(event) => {
                setCvc((v) =>
                  event.target.validity.valid ? event.target.value : ""
                );
              }}
              pattern="[0-9]*"
              onFocus={(event) => setFocus(event.target.name)}
              maxLength={3}
              className="focus:border-blue-400 border-2 w-1/2 text-xs md:text-base  mr-2"
            />
            <ReusableInput
              type="tel"
              value={expiry}
              placeholder="MM/YY"
              onChange={(event) => {
                setExpiry((v) =>
                  event.target.validity.valid ? event.target.value : ""
                );
              }}
              pattern="[0-9]*"
              onFocus={(event) => setFocus(event.target.name)}
              maxLength={4}
              className="focus:border-red-400 border-2 w-1/2 text-xs md:text-base"
            />
          </div>
          <ReusableButton
            type="submit"
            value="Submit"
            className="hover:bg-red-700 hover:text-white border mt-2 text-gray-400 add-animation"
          />
        </form>
      </div>
      {isDetailsEntered ? <CaptchaCode className="mt-2 mb-2 " /> : null}
    </div>
  );
};
export default CardPage;
