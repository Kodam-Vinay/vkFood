import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import "./style.css";
import NaviagationLink from "../NavigationLink";
import NavigationContext from "../../context/NavigationContext";
import UserDetails from "../../utils/UserDetails";
import LogoutPopup from "../LogoutPopup";
import { CLOUDINARY_IMG_URL } from "../../config/Constants";
const Header = () => {
  const { activeId, setActiveId, navigationLinks } =
    useContext(NavigationContext);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const onClickNavigationLink = (id) => {
    setActiveId(id);
    setHamburgerClicked(false);
  };
  const user = UserDetails();
  return (
    <nav className="header bg-blue-300 flex justify-between items-center h-[10vh] px-2 xs:px-6 sm:px-10 md:px-20 sticky z-10">
      <Link to="/">
        <img
          src={CLOUDINARY_IMG_URL + "web-logo"}
          alt="website-logo"
          onClick={() => setActiveId("home")}
          className="w-12 h-12 md:w-14 md:h-14"
        />
      </Link>
      {/* small screen */}
      <div className="flex items-center w-14 justify-between md:hidden">
        {user.picture ? (
          <img
            src={user.picture}
            alt="profileLogo"
            className={`rounded-full h-8 w-8 ${
              hamburgerClicked ? "hidden" : "block"
            }`}
          />
        ) : (
          <p className="text-white font-bold text-xl bg-green-600 rounded-full h-10 w-10 flex flex-col items-center justify-center">
            {user.name[0].toUpperCase()}
          </p>
        )}

        <button
          onClick={() => setHamburgerClicked(true)}
          className={`${hamburgerClicked ? "hidden" : "block"}`}
        >
          <GiHamburgerMenu color="white" />
        </button>
      </div>
      {hamburgerClicked && (
        <div className="md:hidden mt-auto flex flex-col items-center pt-6 z-10">
          <button
            onClick={() => setHamburgerClicked(false)}
            className={`${
              !hamburgerClicked ? "hidden" : "block"
            } self-end mb-4`}
          >
            <AiOutlineClose color="red" />
          </button>
          <ul className="links bg-gray-200 px-5 py-2">
            {navigationLinks.map((eachItem) => (
              <NaviagationLink
                key={eachItem.id}
                navigationList={eachItem}
                onClickNavigationLink={onClickNavigationLink}
                isActive={eachItem.id === activeId}
              />
            ))}
            <li className="add-animation-to-link font-[600] h-9 cursor-pointer">
              <LogoutPopup />
            </li>
          </ul>
        </div>
      )}

      {/* from medium screen */}
      <div className="hidden md:flex">
        <ul className="links md:flex md:space-x-5 p-0 md:items-center">
          {user.picture ? (
            <img
              src={user.picture}
              alt="profileLogo"
              className="rounded-full h-10 w-10"
            />
          ) : (
            <p className="text-white font-bold text-xl bg-green-600 rounded-full h-10 w-10 flex flex-col items-center justify-center">
              {user.name[0].toUpperCase()}
            </p>
          )}

          {navigationLinks.map((eachItem) => (
            <NaviagationLink
              key={eachItem.id}
              navigationList={eachItem}
              onClickNavigationLink={onClickNavigationLink}
              isActive={eachItem.id === activeId}
            />
          ))}
          <li className="add-animation-to-link font-[600] h-9 cursor-pointer">
            <LogoutPopup />
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Header;
