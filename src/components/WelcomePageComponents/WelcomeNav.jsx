import { useState } from "react";
import Logo from "../../assets/logo.png";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router";
export default function WelcomeNav() {
  const linkStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContnet: "center"
  };
  const [currentPage, setCurrentPage] = useState("start");
  return (
    <>
      <div className="WelcomeNav">
        <div className="Logo">
          <img src={Logo} alt="logoImage" width={50} height={50} />
          <h2>Darajat</h2>
        </div>
        <div className="AboutUs-Login">
          <ul>
            <li>
              <Link to="/" style={linkStyle} onClick={() => { setCurrentPage("start") }}>
                start {(currentPage === "start" )? < hr /> : null}
              </Link>
            </li>
            <li>
              <Link to="/aboutUs" style={linkStyle} onClick={() => { setCurrentPage("about-us") }}>
                about us {(currentPage === "about-us") ? <hr /> : null}
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button className="LoginButton">
                  <CiLogin /> <span>login</span>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
