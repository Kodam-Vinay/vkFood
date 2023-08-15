import { useRouteError, Link } from "react-router-dom";
import ReusableButton from "../../utils/ReusableButton";
import { CLOUDINARY_IMG_URL } from "../../config/Constants";

const Error = () => {
  const errorMsg = useRouteError();
  const { status } = errorMsg;
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-5">
      <img
        src={CLOUDINARY_IMG_URL + "/error-image"}
        alt="errorImage"
        className="max-w-[300px]"
      />
      <h1 className="text-2xl md:text-3xl font-[600]">
        Oops! <span className="text-red-700"> {status} </span>
        Page Not Found
      </h1>
      <p className="text-base md:text-xl font-[600]">
        Click Below Link to Go back to Home
      </p>
      <Link to="/">
        <ReusableButton
          type="button"
          value="Home"
          className="hover:bg-blue-400 hover:text-white font-[600] text-base md:text-xl"
          onClick={() =>
            sessionStorage.setItem("activeId", JSON.stringify("home"))
          }
        />
      </Link>
    </div>
  );
};
export default Error;
