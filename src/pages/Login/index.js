// import { useState } from "react";
import { CLOUDINARY_IMG_URL } from "../../../config/Constants";

import "./style.css";

const Login = () => {
  return (
    <div className="login bg-[#34ebe5] h-full w-full">
      <div className="absolute -top-16 -left-20">
        <img
          src={CLOUDINARY_IMG_URL + "login-logo.webp"}
          alt="loginImage"
          className="h-full max-h-64 w-full max-w-64 md:h-96 md:w-96"
        />
      </div>

      {/* login or signup buttons */}
      <div className="w-full mt-20 md:max-h-full flex flex-col md:flex-row md:justify-around">
        <h1 className="text-3xl font-bold italic text-center mb-5 add-text-shadow-logo md:text-5xl mt-20">
          Foodie
        </h1>
        <div className=""></div>
      </div>
    </div>
  );
};
export default Login;
