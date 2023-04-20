import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  /* User  registrado */
  return user ? (
    <div className="Authbuttons">
      {" "}
      Logeado como <Link to={`/users/${user.id}`}> {user.email} </Link>
      {user ? (
        <Link to={"/newrecommendation"}> Crear recomendacion </Link>
      ) : null}
      <button
        className="logout"
        onClick={() => {
          logOut();
          navigate("/");
        }}
      >
        {" "}
        LogOut{" "}
      </button>
    </div>
  ) : (
    /* User no registrado */
    <div className="Authbuttons">
      <button className="login">
        <Link to={"./login"}> Inicio </Link>
      </button>
      <button className="register">
        <Link to={"./register"}> Registro </Link>
      </button>
    </div>
  );
};
