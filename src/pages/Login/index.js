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
    <div className="login bg-[#34ebe5] h-full w-full">
      <div className="absolute -top-16 -left-20">
        <img
          src={CLOUDINARY_IMG_URL + "login-logo.webp"}
          alt="loginImage"
          className="h-full max-h-64 w-full max-w-64 md:h-96 md:w-96"
        />
      </div>
      {/* login or signup buttons */}
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold italic text-center mb-5 add-text-shadow-logo md:text-5xl mt-20">
          Food
        </h1>
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
