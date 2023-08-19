import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const LoginRoute = ({ children }) => {
  const jwtToken = Cookies.get("jwtToken");
  return jwtToken !== undefined ? <Navigate to="/" /> : children;
};
export default LoginRoute;
