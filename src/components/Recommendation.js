import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  deleteRecommendationService,
  sendCommentService,
  sendVoteService,
} from "../services";

import { Link, useNavigate } from "react-router-dom";
import { RecommendationComments } from "./RecommendationComments";

export const Recommendation = ({ recommendation, addComment }) => {
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
      const newVote = await sendVoteService({
        id: recommendation.id,
        token,
        vote,
      });

      console.log(newVote);

      addComment(newComment);

      setComentario("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVoteForm = async (e) => {
    e.preventDefault(); // Prevenir la acción por defecto del formulario
    try {
      const newVote = await sendVoteService({
        id: recommendation.id,
        token,
        vote,
      });

      console.log(newVote);
    } catch (error) {
      setError(error.message);
    }
  };

  // const deleteRecommendation = async (id) => {
  //   try {
  //     await deleteRecommendationService({ id, token });
  //     if (removeRecommedation) {
  //       removeRecommedation(id);
  //     }
  //     navigate(`/`);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  //Voto
  const insertVote = async (id) => {
    try {
      console.log(vote);
      const data = await sendVoteService({ id, token, vote });
    } catch (error) {}
  };

  return (
    <article>
      <p> {recommendation.title}</p>
      <img
        src={`${process.env.REACT_APP_BACKEND}/uploads/${recommendation.photo}`}
        alt={recommendation.title}
      />
      <p> {recommendation.num_comment}</p>
      <p> {recommendation.category}</p>
      <p> {recommendation.place}</p> <p> {recommendation.user}</p>{" "}
      <p> {recommendation.text}</p>
      <p>
        El numero de votos es de: {recommendation.votes} y la media es de:
        {recommendation.votes}
      </p>
      <p> {recommendation.createdAt}</p>
      <h2>Comentarios</h2>
      {recommendation.comments.length > 0 ? (
        <RecommendationComments comments={recommendation.comments} />
      ) : (
        <p>Sin comentarios</p>
      )}
      {/* Boton de eliminar una recomendacion  */}
      {/* {user && user.id === recommendation.idUser ? (
        <button onClick={() => deleteRecommendation(recommendation.id)}>
          Eliminar
        </button>
      ) : null} */}
      {/* Boton para un comentario  */}
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
              <label htmlFor="vote"> Vota la recomendacion </label>
              <input
                type="number"
                id="vote"
                name="vote"
                value={vote}
                onChange={(e) => setVote(e.target.value)}
              />
            </fieldset>
            <button type="submit"> Votar </button>
          </form>
        </section>
      ) : null}
    </article>
  );
};
