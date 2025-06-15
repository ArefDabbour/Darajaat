import { LiaFacebookF } from "react-icons/lia";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
export default function Footer() {
  return (
    <>
      <div className="Footer">
        <ul>
          <li>
            <h3>Start</h3>
            <h4>Sing in for free</h4>
          </li>
          <li>
            <h3>About us</h3>
            <h4>Who are we</h4>
            <h4>Our goals</h4>
          </li>
          <li>
            <h3>Social</h3>
            <h4>
              <LiaFacebookF />
              <FaLinkedin />
              <FaInstagram />
            </h4>
          </li>
        </ul>
        <p>
          <span>
            <FaRegCopyright /> <h6>Darajaat</h6>
          </span>
          <span>
            <span>Terms</span>&<span>Conditions</span> |
          </span>
          <span>Privacy Policy</span>
        </p>
      </div>
    </>
  );
}
