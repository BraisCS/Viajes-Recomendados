import { useState, useRef } from "react";
import { userRegisterService } from "../services/index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");
  const [biography, setBiography] = useState("");
  const [photo, setPhoto] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handlForm = async (e) => {
    e.preventDefault();
    setError("");

    if (pass1 !== pass2) {
      setError("Not the same password");
      return;
    }

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("name", name);
      data.append("biography", biography);
      data.append("password", pass1);
      data.append("photo", photo);

      await userRegisterService(data);
      // Si la función no lanza una excepción, significa que el registro fue exitoso
      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  function handlePhotoContainerClick() {
    inputRef.current.click();
  }
  return (
    <section>
      <form onSubmit={handlForm}>
        <span className="logoContainer">
          <Link to={"/"}>
            <img
              className="logoForm"
              src="LogoRegisterLogin.png"
              alt="Logo"
            ></img>
          </Link>
        </span>

        <p className="text">
          Regístrate para comentar, votar y crear publicaciones.
        </p>
        <div className="line"></div>

        <div className="container">
          <label className="fileUpload" htmlFor="photo"></label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            ref={inputRef}
          />

          <div class="photoContainer" onClick={handlePhotoContainerClick}>
            {photo ? (
              <img src={URL.createObjectURL(photo)} alt="foto escogida" />
            ) : (
              <div class="emptyContainer">
                <span>
                  <img src="./userProfile.png" alt=""></img>
                </span>
              </div>
            )}
            {photo && (
              <button class="removeButton" onClick={() => setPhoto(null)}>
                Cambiar
              </button>
            )}
          </div>
        </div>
        <fieldset>
          <label htmlFor="name"> Nombre </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
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
          <label htmlFor="pass1"> Contraseña </label>
          <input
            type="password"
            id="pass1"
            name="pass1"
            required
            onChange={(e) => setPass1(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="pass2"> Repite la contraseña </label>
          <input
            type="password"
            id="pass2"
            name="pass2"
            required
            onChange={(e) => setPass2(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="biography"> Biografía </label>
          <input
            className="biography"
            type="text"
            id="biography"
            name="biography"
            required
            onChange={(e) => setBiography(e.target.value)}
          />
        </fieldset>
        <button className="registerButton"> Regístrate </button>
        {error ? <p>{error}</p> : null}
      </form>
      <section className="anotherForm">
        <p> ¿Ya tienes una cuenta?</p>
        <Link to={"/login"}>
          {" "}
          <p>Entra</p>
        </Link>{" "}
      </section>
    </section>
  );
};
