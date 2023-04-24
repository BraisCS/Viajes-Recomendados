import { useContext, useState } from "react";
import { sendRecommendationService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./NewRecommendation.css";

export const NewRecommendation = ({ addRecommendation }) => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [photo, setPhoto] = useState();
  const [text, setText] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const quillModules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["undo", "redo"],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ blockquote: "blockquote" }, "link", "emoji"],
      ["clean"],
    ],
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  };

  const quillFormats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "align",
    "indent",
    "list",
    "bullet",
    "blockquote",
    "link",
    "emoji",
  ];

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      const data = new FormData(e.target);
      data.append("text", text);
      const recommendation = await sendRecommendationService({ token, data });
      addRecommendation(recommendation);
      navigate("/");

      e.target.reset();
      setPhoto(null);
      setText("");
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleForm}>
      <h1> ... 📷👀¿Nueva publicación en marcha? </h1>
      <h2>¡Desata la creatividad y comparte nuevas aventuras! 🚀</h2>

      <fieldset className="photoRecommendation">
        <label htmlFor="photo"> Click aquí para escoger una foto </label>
        <div className="input-container">
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
              <img src={URL.createObjectURL(photo)} alt="Preview"></img>
            </figure>
          ) : null}
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <label htmlFor="title"> Título </label>
        <div className="input-container">
          <input type="text" id="title" name="title" required></input>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <label htmlFor="category"> Categoría </label>
        <div className="input-container">
          <input
            type="text"
            id="category"
            name="category"
            required
            list="category-options"
          />
          <datalist id="category-options">
            <option value="ciudad" />
            <option value="museo" />
            <option value="ruta" />
            <option value="otro" />
          </datalist>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <label htmlFor="place"> Lugar </label>
        <div className="input-container">
          <input type="text" id="place" name="place" required></input>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <label htmlFor="summary">
          {" "}
          <span className="text-label">Entradilla</span>{" "}
        </label>
        <div className="input-container">
          <input type="text" id="summary" name="summary" required></input>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <label htmlFor="text"></label>
        <ReactQuill
          id="text"
          name="text"
          required
          modules={quillModules}
          formats={quillFormats}
          value={text}
          onChange={setText}
        />
      </fieldset>
      <button className="uploadButton"> Publicar Recomendación </button>

      {sending ? <p> Subiendo Recomendacion </p> : null}

      {error ? <p> {error}</p> : null}
    </form>
  );
};
