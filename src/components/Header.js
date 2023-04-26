import { Auth } from "./Auth";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <div className="header">
      <span className="logoContainer">
        <Link to={"/"}>
          <img
            className="logoForm"
            src="LogoRegisterLogin.png"
            alt="Logo"
          ></img>
        </Link>
      </span>
      <nav className="navegacion">
        <div>
          {" "}
          <div>
            {" "}
            <Link to={"/allrecommendations"}> Recomendaciones </Link>{" "}
          </div>{" "}
        </div>
        <Auth />
      </nav>
    </div>
  );
};
