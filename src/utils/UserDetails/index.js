import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
const UserDetails = () => {
  const jwtToken = Cookies.get("jwtToken");
  const decodeCode = jwtDecode(jwtToken);
  return decodeCode;
};
export default UserDetails;
