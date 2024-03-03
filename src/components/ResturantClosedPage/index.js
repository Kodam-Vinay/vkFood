import { Link } from "react-router-dom";
import { CLOUDINARY_IMG_URL } from "../../config/Constants";
import ReusableButton from "../../utils/ReusableButton";

const index = ({ name, setActiveId }) => {
  return (
    <div className="flex flex-col items-center h-[80vh]">
      <h1 className="text-xl font-bold text-center">
        <span className="text-2xl text-blue-300">{name}</span> is Closed,🥺
        Don't worry Checkout Other!!!😊
      </h1>
      <img
        src={CLOUDINARY_IMG_URL + "closed-image"}
        alt="restaurant-closed"
        className="max-h-[300px]"
      />
      <Link to="/explore-food">
        <ReusableButton
          type="button"
          value="Go Back"
          className="hover:bg-blue-300 hover:text-white"
        />
      </Link>
    </div>
  );
};

export default index;
