import { useContext, useState } from "react";
import { userLoginService } from "../../services/index";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../LoginPage/LoginPage.css";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      /* En data se guarda el tokken  */
      const data = await userLoginService({ email, password });
      logIn(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <form onSubmit={handleForm}>
        <span className="logoContainer">
          <Link to={"/"}>
            <img
              className="logoForm"
              src="LogoRegisterLogin.png"
              alt="Logo"
            ></img>
          </Link>
        </span>
        <fieldset>
          <label htmlFor="email"> Email </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        <button> Entrar </button>
        {error ? <p>{error}</p> : null}
      </form>
      <section className="anotherForm">
        <p> ¿No tienes una cuenta?</p>
        <Link to={"/register"}>
          {" "}
          <p>Regístrate</p>
        </Link>{" "}
      </section>
    </section>
  );
};
