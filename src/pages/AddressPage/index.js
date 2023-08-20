import { useContext, useState } from "react";
import ReusableInput from "../../utils/ReusableInput";
import ReusableButton from "../../utils/ReusableButton";
import { useNavigate } from "react-router-dom";
import OrderDetailsContext from "../../context/OrderDetailsContext";
import CartContext from "../../context/CartContext";

const AdressPage = () => {
  const { setUserAdress } = useContext(OrderDetailsContext);
  const { setCartItemList } = useContext(CartContext);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pincode, setPinCode] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(false);

  const onSubmitDetails = (event) => {
    event.preventDefault();
    const details = {
      name,
      mobileNumber,
      pincode,
      locality,
      address,
    };

    if (mobileNumber.length === 10 && pincode.length === 6) {
      setUserAdress(details);
      navigate("/payment/successful");
      setErrMsg(false);
      setCartItemList([]);
    } else {
      setErrMsg(true);
    }
  };

  return (
    <div className="p-2 flex flex-col w-full h-[85%] xs:px-5 sm:px-10 md:px-40 lg:px-52 xl:px-80 space-y-3">
      <h1 className="font-bold text-xl md:text-3xl">Cash On Delivery</h1>
      <p className="text-red-500 animate-pulse">
        *Data is not stored, so don't enter your personal Details
      </p>
      <form className="space-y-3 w-full" onSubmit={onSubmitDetails}>
        <div className="flex flex-col items-center md:flex-row space-y-2 md:space-y-0 md:space-x-10">
          <ReusableInput
            className="focus:border-blue-400 border-2"
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
            placeholder="Enter Your Name"
            required={true}
          />
          <ReusableInput
            type="tel"
            className="focus:border-blue-400 border-2"
            onChange={(event) => {
              setMobileNumber((v) =>
                event.target.validity.valid ? event.target.value : ""
              );
            }}
            placeholder="Enter Your Mobile No"
            value={mobileNumber}
            maxLength={10}
            pattern="[0-9]*"
            required={true}
          />
        </div>
        <div className="flex flex-col items-center md:flex-row space-y-2 md:space-y-0 md:space-x-10">
          <ReusableInput
            className="focus:border-blue-400 border-2"
            type="tel"
            onChange={(event) => {
              setPinCode((v) =>
                event.target.validity.valid ? event.target.value : ""
              );
            }}
            placeholder="Enter Your Pincode"
            maxLength={6}
            value={pincode}
            pattern="[0-9]*"
            required={true}
          />
          <ReusableInput
            className="focus:border-blue-400 border-2"
            type="text"
            onChange={(event) => {
              setLocality(event.target.value);
            }}
            value={locality}
            placeholder="Enter Your Locality"
            required={true}
          />
        </div>
        <textarea
          className="bg-transparent p-2 w-full focus:border-blue-400 border-2 rounded-md"
          rows={5}
          placeholder="Enter Your Adress (Area And Street)"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
          required={true}
        />
        <ReusableButton type="submit" value="Place Order" />
        <p className="text-red-500">
          {errMsg ? "*Please Provide all valid Details" : ""}
        </p>
      </form>
    </div>
  );
};
export default AdressPage;
