import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
export default function LoginButton({ text }) {
  return (
    <>
      <Link to={"/login"}>
        <button
          className="JoinButton"
        >
          <span>{text}</span> <FaArrowRightLong />
        </button>
      </Link>
    </>
  );
}
