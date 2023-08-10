import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import "./style.css";

const Footer = () => {
  const onClickMail = () => {
    window.location = "mailto:ccvinaykumarkodam@outlook.com";
  };
  return (
    <div className="footer flex w-24 justify-between self-center bottom-1 mt-auto overflow-hidden">
      <Link
        to="https://www.linkedin.com/in/vinay-kumar-kodam-4054bb21b/"
        target="_blank"
        className="add-animation-link"
      >
        <FaLinkedin className="rounded-md h-6 w-6" />
      </Link>
      <Link
        to="https://www.instagram.com/_vinay_vinni_7/"
        target="_blank"
        className="add-animation-link"
      >
        <AiFillInstagram className="rounded-md h-6 w-6" />
      </Link>
      <Link
        to="https://www.linkedin.com/in/vinay-kumar-kodam-4054bb21b/"
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
