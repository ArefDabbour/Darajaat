import Aws from "../../assets/aws.png";
import Microsoft from "../../assets/microsoft.jpg";
import Google from "../../assets/google.png";
import Talabat from "../../assets/talabat.png";
import Noon from "../../assets/noon.png";
import Meta from "../../assets/meta.jpg";
import { FaGoogle } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import { FaAws } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { RiNetflixFill } from "react-icons/ri";

export default function TrustedBy() {
  return (
    <>
      <div className="trustedBy">
        <h2>We are trusted by learners at leading companies</h2>
        <h4>more than 150k+ students trusts Learn</h4>
        <div className="companies">
          {/* <img src={Aws} alt="aws" /> */}
          <FaAws />
          {/* <img src={Google} alt="google" /> */}
          <FaGoogle />
          {/* <img src={Microsoft} alt="microsoft" /> */}
          <FaMicrosoft />
          {/* <img src={Noon} alt="noon" /> */}
          <FaApple />
          {/* <img src={Meta} alt="meta" /> */}
          <FaMeta />
          {/* <img src={Talabat} alt="talabat" /> */}
          <RiNetflixFill />
        </div>
      </div>
    </>
  );
}
