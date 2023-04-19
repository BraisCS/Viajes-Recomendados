import { useContext, useState } from "react";
import { sendRecommendationService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const NewRecommendation = ({ addRecommendation }) => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [photo, setPhoto] = useState();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      const data = new FormData(e.target);
      const recommendation = await sendRecommendationService({ token, data });
      addRecommendation(recommendation);
      navigate("/");

      e.target.reset();
      setPhoto(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleForm}>
      <h1> Añade una nueva recomendacion </h1>

      <fieldset>
        <label htmlFor="title"> Título </label>
        <input type="text" id="title" name="title" required></input>
      </fieldset>

      <fieldset>
        <label htmlFor="category"> Categoría </label>
        <input type="text" id="category" name="category" required></input>
      </fieldset>

      <fieldset>
        <label htmlFor="place"> Lugar </label>
        <input type="text" id="place" name="place" required></input>
      </fieldset>

      <fieldset>
        <label htmlFor="summary"> Entradilla </label>
        <input type="text" id="summary" name="summary" required></input>
      </fieldset>

      <fieldset>
        <label htmlFor="text"> Texto </label>
        <input type="text" id="text" name="text" required></input>
      </fieldset>

      <fieldset>
        <label htmlFor="photo"> Foto </label>
        <input
          type="file"
          id="photo"
          name="photo"
          required
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        ></input>
        {photo ? (
          <figure>
            <img
              src={URL.createObjectURL(photo)}
              alt="Preview"
              style={{ width: "100px" }}
            ></img>
          </figure>
        ) : null}
      </fieldset>

      <button> Subir Recomendacion </button>

      {sending ? <p> Subiendo Recomendacion </p> : null}

      {error ? <p> {error}</p> : null}
    </form>
  );
};
