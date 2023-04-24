import { useContext, useState } from "react";
import { putUserDataInfoService } from "../../services";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditUserForm = ({ user, token, setUser }) => {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [biography, setBiography] = useState(user.biography);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = { name, email, biography };
      const updatedUser = await putUserDataInfoService(token, data);

      setUser(updatedUser);
      // Si la función no lanza una excepción, significa que el registro fue exitoso
      //alert("Cambios efectuados correctamente");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="RegisterLoginForm" onSubmit={handleForm}>
      <fieldset className="RegisterLoginFieldset">
        <label className="RegisterLoginLabel" htmlFor="email">
          email
        </label>
        <input
          className="RegisterLoginInput"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </fieldset>

      <fieldset className="RegisterLoginFieldset">
        <label className="RegisterLoginLabel" htmlFor="name">
          name
        </label>
        <input
          className="RegisterLoginInput"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </fieldset>

      <fieldset className="RegisterLoginFieldset">
        <label className="RegisterLoginLabel" htmlFor="biography">
          Biografía
        </label>
        <input
          className="RegisterLoginInput"
          type="text"
          id="biography"
          name="biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />
      </fieldset>
      <button className="registerButton"> Efectuar los cambios </button>
      {error ? <p>{error}</p> : null}
    </form>
  );
};

export const EditUserPage = () => {
  const { user, token, setUser } = useContext(AuthContext);

  if (!user) return <p>Cargando...</p>;

  return (
    <section>
      <h1> Cambia el email o el usuario </h1>
      <EditUserForm user={user} token={token} setUser={setUser} />
    </section>
  );
};
