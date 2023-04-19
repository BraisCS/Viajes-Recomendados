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
        <form className="buscador">
          <input type="text" placeholder="Buscar por categoría o lugar" />
          <button type="submit">Buscar</button>
        </form>
        <Auth />
      </nav>
    </div>
  );
};
