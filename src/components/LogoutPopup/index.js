import Popup from "reactjs-popup";
import { FiLogOut } from "react-icons/fi";
import ReusableButton from "../../utils/ReusableButton";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./style.css";

const LogoutPopup = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const onClickLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/login");
    sessionStorage.removeItem("apiData");
    sessionStorage.setItem("activeId", JSON.stringify("home"));
  };

  return (
    <Popup
      modal
      position="center"
      trigger={
        <ReusableButton
          type="button"
          className="bg-red-400 px-4 pt-2 -ml-1 md:-ml-0 md:-mt-1 rounded-md flex items-center hover:bg-red-500 border-0"
          value={<FiLogOut size={20} />}
          ref={ref}
        />
      }
      className="popup-content"
    >
      {(close) => (
        <div className="rounded-md h-full flex flex-col items-center justify-center space-y-5 p-1">
          <h1 className="text-2xl">Are you sure, you want to logout ?</h1>
          <div className="flex space-x-3">
            <ReusableButton
              className="bg-red-400 px-2 rounded-md flex items-center hover:bg-red-500 border-0"
              onClick={() => close()}
              value="Cancel"
              ref={ref}
            />
            <ReusableButton
              value="Confirm"
              onClick={onClickLogout}
              className="bg-green-100 px-2 rounded-md flex items-center hover:bg-green-200 border-0"
              ref={ref}
            />
          </div>
        </div>
      )}
    </Popup>
  );
};
export default LogoutPopup;
