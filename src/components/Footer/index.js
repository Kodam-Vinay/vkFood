import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import "./style.css";
import { EMAIL_URL, INSTAGRAM_URL, LINKEDIN_URL } from "../../config/Constants";

const Footer = () => {
  const onClickMail = () => {
    window.location = EMAIL_URL;
  };
  return (
    <div className="footer flex w-24 justify-between self-center bottom-1 mt-auto overflow-hidden">
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
    </div>
  );
};
export default Footer;
