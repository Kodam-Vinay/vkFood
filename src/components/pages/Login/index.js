import { useState } from "react";
import { LOGIN_IMG_URL } from "../../config/Constants";
import ReusableInput from "../../utils/ReusableInput";
import LabelElement from "../../utils/LabelElement";
import "./style.css";

const loginPages = [
  {
    id: "LOGIN",
  },
  {
    id: "SIGNUP",
  },
];

const Login = () => {
  const [activePage, setActivePage] = useState({
    activeId: loginPages[0].id,
  });

  const onClickLogin = () => {
    setActivePage(() => ({
      activeId: loginPages[0].id,
    }));
  };
  const onClickSignUp = () => {
    setActivePage(() => ({
      activeId: loginPages[1].id,
    }));
  };
  return (
    <div className="login bg-[#34ebe5] h-full w-full">
      <div className="absolute -top-16 -left-20">
        <img
          src={LOGIN_IMG_URL}
          alt="loginImage"
          className="h-full max-h-64 w-full max-w-64 md:h-96 md:w-96"
        />
      </div>

      {/* login or signup buttons */}
      <div className="w-full mt-20 md:max-h-full flex flex-col md:flex-row md:justify-around">
        <h1 className="text-3xl font-bold italic text-center mb-5 add-text-shadow-logo md:text-5xl mt-20">
          Foodie
        </h1>
        <div>
          <div className="flex justify-between w-full border-b mb-0 h-10">
            <button
              className={`text-white text-xl text-center font-bold w-1/2 add-text-animation ${
                activePage.activeId === loginPages[0].id
                  ? "border-red-200 border-b-2"
                  : ""
              }`}
              onClick={onClickLogin}
            >
              Login
            </button>
            <button
              className={`text-white text-xl text-center font-bold w-1/2 add-text-animation ${
                activePage.activeId === loginPages[1].id
                  ? "border-red-200 border-b-2"
                  : ""
              }`}
              onClick={onClickSignUp}
            >
              SignUp
            </button>
          </div>

          {/* login or signup */}
          <div className="mt-10 w-full">
            {activePage.activeId === loginPages[0].id ? (
              <div className="login flex flex-col items-center w-full md:w-80">
                <form className="w-full flex flex-col items-center space-y-3">
                  <div className="flex flex-col items-center">
                    <LabelElement inputId="inputUserName" value="UserName" />
                    <ReusableInput type="Email" inputId="inputUserName" />
                  </div>
                  <div className="flex flex-col items-center">
                    <LabelElement inputId="inputPassword" value="Password" />
                    <ReusableInput inputId="inputPassword" />
                  </div>
                  <button className="border p-1 px-4 pb-2 rounded-md flex flex-col items-center justify-center font-[600] text-white hover:bg-green-300">
                    Login
                  </button>
                </form>
              </div>
            ) : (
              <div className="signup flex flex-col items-center w-full md:w-80">
                <form className="w-full flex flex-col items-center space-y-2">
                  <div className="flex flex-col items-center">
                    <LabelElement inputId="personName" value="Name" />
                    <ReusableInput inputId="personName" />
                  </div>
                  <div className="flex flex-col items-center">
                    <LabelElement inputId="inputUserName" value="UserName" />
                    <ReusableInput type="Email" inputId="inputUserName" />
                  </div>
                  <div className="flex flex-col items-center">
                    <LabelElement inputId="inputPassword" value="Password" />
                    <ReusableInput inputId="inputPassword" />
                  </div>
                  <div className="flex flex-col items-center">
                    <LabelElement
                      inputId="inputConfirmPassword"
                      value="Confirm Password"
                    />
                    <ReusableInput inputId="inputConfirmPassword" />
                  </div>
                  <button className="border p-1 pb-2 rounded-md flex flex-col items-center justify-center font-[600] text-white hover:bg-green-300">
                    Create Account
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
