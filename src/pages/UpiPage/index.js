import { useState } from "react";
import ReusableInput from "../../utils/ReusableInput";
import ReusableButton from "../../utils/ReusableButton";
import CaptchaCode from "../../components/CaptchaCode";

const UpiPage = () => {
  const [upiId, setUpiId] = useState("");
  const [isDetailsEntered, setIsDetailsEntered] = useState(false);
  const regex = new RegExp("[a-zA-Z0-9\\.\\-]{2,256}\\@[a-zA-Z][a-zA-Z]{2,64}");
  const onSubmitDetails = (e) => {
    e.preventDefault();
    if (regex.test(upiId)) {
      setIsDetailsEntered(true);
    } else {
      setIsDetailsEntered(false);
    }
  };
  return (
    <div className="p-2 flex flex-col w-full h-[85%] xs:px-5 sm:px-10 md:px-40 lg:px-52 xl:px-80">
      <div className="flex flex-col md:flex-row justify-between items-center text-center mb-4">
        <h1 className="font-bold text-xl md:text-3xl">UPI</h1>
        <p className="text-red-500 animate-pulse">
          *Data is not stored, don't enter your personal Details
        </p>
      </div>
      <form
        className="flex flex-col items-center mt-2 md:5"
        onSubmit={onSubmitDetails}
      >
        <ReusableInput
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="Enter Your Upi"
          className="focus:border-red-400 border-2"
          required={true}
        />
        <ReusableButton
          type="submit"
          value="Submit"
          className="hover:bg-red-700 hover:text-white border mt-2 font-bold add-animation"
        />
        {isDetailsEntered && <CaptchaCode className="mt-2 mb-2" />}
      </form>
    </div>
  );
};
export default UpiPage;
