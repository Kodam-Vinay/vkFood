import { Link } from "react-router-dom";
import "./style.css";

const NaviagationLink = (props) => {
  const { navigationList, onClickNavigationLink, isActive } = props;
  const { id, value, route } = navigationList;
  const onClickLink = () => {
    onClickNavigationLink(id);
  };
  const applyColor = isActive ? "text-red-400" : "text-gray-500";
  return (
    <Link to={route}>
      <li
        className={`add-animation-to-link  font-[600] h-9 ${applyColor} cursor-pointer`}
        onClick={onClickLink}
      >
        {value}
      </li>
    </Link>
  );
};
export default NaviagationLink;
