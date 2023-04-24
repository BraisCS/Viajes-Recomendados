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
      const data = await userLoginService({ email, password });
      logIn(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <form className="RegisterLoginForm" onSubmit={handleForm}>
        <span className="logoContainer">
          <Link to={"/"}>
            <img
              className="logoForm"
              src="LogoRegisterLogin.png"
              alt="Logo"
            ></img>
          </Link>
        </span>
        <fieldset className="RegisterLoginFieldset">
          <label className="RegisterLoginLabel" htmlFor="email">
            {" "}
            Email{" "}
          </label>
          <input
            className="RegisterLoginInput"
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset className="RegisterLoginFieldset">
          <label className="RegisterLoginLabel" htmlFor="password">
            {" "}
            Password{" "}
          </label>
          <input
            className="RegisterLoginInput"
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        <button className="registerButton"> Entrar </button>
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
