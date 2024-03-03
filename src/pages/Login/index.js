import { CLOUDINARY_IMG_URL } from "../../config/Constants";
import "./style.css";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState("");
  if (credentials) {
    Cookies.set("jwtToken", credentials, {
      expires: 20,
    });
    navigate("/");
  }

  return (
    <div className="login bg-red-700 h-full w-full">
      <div className="absolute -top-16 -left-20">
        <img
          src={CLOUDINARY_IMG_URL + "login-logo.webp"}
          alt="loginImage"
          className="h-full max-h-64 w-full max-w-64 md:h-96 md:w-96"
        />
      </div>
      {/* login or signup buttons */}
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src={CLOUDINARY_IMG_URL + "web-logo"}
          alt="website-logo"
          className="w-12 h-12 md:w-14 md:h-14 mb-6"
        />
        <p className="mb-4 font-bold text-white">
          <span className="italic font-[500] mr-1">Order Food</span> With Just
          One Click...
        </p>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            setCredentials(credentialResponse.credential);
          }}
          onError={() => {
            throw new Error();
          }}
        ></GoogleLogin>
      </div>
    </div>
  );
};
export default Login;
