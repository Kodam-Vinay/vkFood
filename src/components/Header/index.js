import "./style.css";
import NaviagationLink from "../NavigationLink";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const navigationLinks = [
  {
    id: "Home",
    value: "Home",
    route: "/",
  },
  {
    id: "Explore",
    value: "Explore",
    route: "/explore-food",
  },
  {
    id: "Contact",
    value: "Contact",
    route: "/contact",
  },
  {
    id: "About",
    value: "About",
    route: "/about",
  },
];

const Header = () => {
  const [activeId, setActiveId] = useState(navigationLinks[0].id);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);

  const onClickNavigationLink = (id) => {
    setActiveId(id);
  };
  return (
    <nav className="header bg-blue-300 flex justify-between items-center h-[10vh] px-2 sm:px-3 md:px-20">
      <Link to="/" onClick={() => setActiveId(navigationLinks[0].id)}>
        <h1 className="logo text-3xl text-white">Vinay</h1>
      </Link>

      {/* small screen */}
      <button
        onClick={() => setHamburgerClicked(true)}
        className={`${hamburgerClicked ? "hidden" : "block"} md:hidden`}
      >
        <GiHamburgerMenu color="white" />
      </button>
      {hamburgerClicked ? (
        <div className="md:hidden mt-auto flex flex-col items-center pt-6 z-10">
          <button
            onClick={() => setHamburgerClicked(false)}
            className={`${
              !hamburgerClicked ? "hidden" : "block"
            } self-end mb-4`}
          >
            <AiOutlineClose color="red" />
          </button>
          <ul className="links">
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
      ) : null}

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
