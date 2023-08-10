import { Link } from "react-router-dom";
import { CLOUDINARY_IMG_URL } from "../../config/Constants";
import ReusableButton from "../../utils/ReusableButton";

const Home = () => {
  return (
    <div className="home flex flex-col items-center justify-center h-[80%]">
      <img
        src={CLOUDINARY_IMG_URL + "delivery-boy-home-page"}
        alt="homePageLogo"
        className="max-w-[300px]"
      />
      <Link to="explore-food">
        <ReusableButton
          value="Explore Food"
          className="hover:bg-blue-400 hover:text-white"
        />
      </Link>
    </div>
  );
};
export default Home;
