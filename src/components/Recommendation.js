import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  deleteRecommendationService,
  sendCommentService,
  sendVoteService,
} from "../services";

import { Link, useNavigate } from "react-router-dom";
import { RecommendationComments } from "./RecommendationComments";
import "./Recommendation.css";

export const Recommendation = ({
  recommendation,
  addComment,
  removeRecommedation,
}) => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [comentario, setComentario] = useState("");
  const [vote, setVote] = useState(null);

  const handleCommentForm = async (e) => {
    e.preventDefault(); // Prevenir la acción por defecto del formulario
    try {
      const newComment = await sendCommentService({
        id: recommendation.id,
        token,
        comentario,
      });
      addComment(newComment);
      setComentario("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVoteForm = async (e) => {
    e.preventDefault(); // Prevenir la acción por defecto del formulario
    try {
      await sendVoteService({
        id: recommendation.id,
        token,
        vote,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteRecommendation = async (id) => {
    try {
      await deleteRecommendationService({ id, token });
      if (removeRecommedation) {
        removeRecommedation(id);

        navigate(`/`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article>
      <p> {recommendation.title}</p>
      <img
        src={`${process.env.REACT_APP_BACKEND}/uploads/${recommendation.photo}`}
        alt={recommendation.title}
      />
      <p> {recommendation.num_votes}</p>
      <p> {recommendation.category}</p>
      <p> {recommendation.place}</p> <p> {recommendation.user}</p>{" "}
      <section
        dangerouslySetInnerHTML={{
          __html: recommendation.text,
        }}
      ></section>
      <p>
        El numero de votos es de: {recommendation.votes} y la media es de:
        {recommendation.media}
      </p>
      <p> {recommendation.createdAt}</p>
      <h2>Comentarios</h2>
      {recommendation.comments.length > 0 ? (
        <RecommendationComments comments={recommendation.comments} />
      ) : (
        <p>Sin comentarios</p>
      )}
      {user && user.id === recommendation.idUser ? (
        <button onClick={() => deleteRecommendation(recommendation.id)}>
          Eliminar
        </button>
      ) : null}
      {token ? (
        <section>
          <form onSubmit={handleCommentForm}>
            <fieldset>
              <label htmlFor="comment"> Comenta la recomendacion </label>
              <input
                type="text"
                id="comment"
                name="comment"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </fieldset>
            <button type="submit"> Enviar </button>
          </form>
          <form onSubmit={handleVoteForm}>
            <fieldset>
              <legend>Vota la recomendación</legend>
              <label>
                <input
                  type="radio"
                  name="vote"
                  value="1"
                  onChange={(e) => setVote(parseInt(e.target.value))}
                />
                <span class="star">&#9733;</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="vote"
                  value="2"
                  onChange={(e) => setVote(parseInt(e.target.value))}
                />
                <span class="star">&#9733;</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="vote"
                  value="3"
                  onChange={(e) => setVote(parseInt(e.target.value))}
                />
                <span class="star">&#9733;</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="vote"
                  value="4"
                  onChange={(e) => setVote(parseInt(e.target.value))}
                />
                <span class="star">&#9733;</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="vote"
                  value="5"
                  onChange={(e) => setVote(parseInt(e.target.value))}
                />
                <span class="star">&#9733;</span>
              </label>
            </fieldset>
            <button type="submit"> Votar </button>
          </form>
        </section>
      ) : null}
    </article>
  );
};
