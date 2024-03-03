import { useNavigate } from "react-router-dom";
import "./style.css";

const NaviagationLink = (props) => {
  const { navigationList, isActive } = props;
  const { value, route } = navigationList;
  const navigate = useNavigate();
  const onClickLink = () => {
    navigate(route);
  };
  const applyColor = isActive ? "text-white" : "text-gray-700";
  return (
    <li
      className={`add-animation-to-link  font-[600] h-9 ${applyColor} cursor-pointer`}
      onClick={onClickLink}
    >
      {value}
    </li>
  );
};
export default NaviagationLink;
