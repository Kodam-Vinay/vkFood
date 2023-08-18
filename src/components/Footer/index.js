import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import "./style.css";
import {
  EMAIL_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  MY_WEBSITE,
} from "../../config/Constants";
import ContactWebSiteLogo from "../svgs/ContactWebSiteLogo";

const Footer = () => {
  const onClickMail = () => {
    window.location = EMAIL_URL;
  };
  return (
    <div className="footer flex w-32 justify-between items-center bottom-1 mt-auto">
      <Link to={LINKEDIN_URL} target="_blank" className="add-animation-link">
        <FaLinkedin className="rounded-md h-6 w-6" />
      </Link>
      <Link to={INSTAGRAM_URL} target="_blank" className="add-animation-link">
        <AiFillInstagram className="rounded-md h-6 w-6" />
      </Link>
      <Link
        target="_blank"
        className="add-animation-link"
        onClick={onClickMail}
      >
        <MdEmail className="rounded-md h-6 w-6" />
      </Link>
      <Link to={MY_WEBSITE} target="_blank" className="add-animation-link">
        <ContactWebSiteLogo />
      </Link>
    </div>
  );
};
export default Footer;
