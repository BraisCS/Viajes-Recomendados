import { useContext, useState } from "react";
import { putUserDataInfoService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const EditUserPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [error, setError] = useState("");
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = { name, email, biography };
      await putUserDataInfoService(token, data);
      // Si la función no lanza una excepción, significa que el registro fue exitoso
      alert("Cambios efectuados correctamente");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <h1> Cambia el email o el usuario </h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="email"> email </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="name"> name </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={user.name}
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="biography"> Biografía </label>
          <input
            type="text"
            id="biography"
            name="biography"
            placeholder={user.biography}
            onChange={(e) => setBiography(e.target.value)}
          />
        </fieldset>
        <button> Efectuar los cambios </button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};
