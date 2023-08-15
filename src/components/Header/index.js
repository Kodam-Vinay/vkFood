import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import "./style.css";
import NaviagationLink from "../NavigationLink";
import NavigationContext from "../../utils/NavigationContext";

const Header = () => {
  const { activeId, setActiveId, navigationLinks } =
    useContext(NavigationContext);

  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const onClickNavigationLink = (id) => {
    setActiveId(id);
    setHamburgerClicked(false);
  };

  return (
    <nav className="header bg-blue-300 flex justify-between items-center h-[10vh] px-2 xs:px-6 sm:px-10 md:px-20 sticky z-10">
      <Link to="/">
        <h1
          className="logo text-3xl text-white add-style-food-icon cursor-pointer"
          onClick={() => setActiveId("home")}
        >
          Food
        </h1>
      </Link>
      {/* small screen */}
      <button
        onClick={() => setHamburgerClicked(true)}
        className={`${hamburgerClicked ? "hidden" : "block"} md:hidden`}
      >
        <GiHamburgerMenu color="white" />
      </button>
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
          <ul className="links bg-gray-200 px-5">
            {navigationLinks.map((eachItem) => (
              <NaviagationLink
                key={eachItem.id}
                navigationList={eachItem}
                onClickNavigationLink={onClickNavigationLink}
                isActive={eachItem.id === activeId}
              />
            ))}
          </ul>
        </div>
      )}

      {/* from medium screen */}
      <div className="hidden md:flex">
        <ul className="links md:flex md:space-x-5 p-0">
          {navigationLinks.map((eachItem) => (
            <NaviagationLink
              key={eachItem.id}
              navigationList={eachItem}
              onClickNavigationLink={onClickNavigationLink}
              isActive={eachItem.id === activeId}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default Header;
