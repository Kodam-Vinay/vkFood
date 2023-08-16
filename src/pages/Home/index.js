import { Link } from "react-router-dom";
import { CLOUDINARY_IMG_URL } from "../../config/Constants";
import ReusableButton from "../../utils/ReusableButton";
import { useContext } from "react";
import NavigationContext from "../../context/NavigationContext";

import UserDetails from "../../utils/UserDetails";
const Home = () => {
  const { setActiveId } = useContext(NavigationContext);
  const user = UserDetails();
  return (
    <div className="home flex flex-col justify-center h-[80%]">
      <h1 className="text-3xl ml-5 xs:ml-10 md:ml-20">Hi {user.name} !!</h1>
      <img
        src={CLOUDINARY_IMG_URL + "delivery-boy-home-page"}
        alt="homePageLogo"
        className="max-w-[300px] self-center"
      />
      <Link to="explore-food" className="self-center">
        <ReusableButton
          value="Explore Food"
          className="hover:bg-blue-400 hover:text-white "
          onClick={() => setActiveId("explore")}
        />
      </Link>
    </div>
  );
};
export default Home;
