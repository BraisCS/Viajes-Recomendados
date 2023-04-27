import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { RecommendationComments } from "./RecommendationComments";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  deleteRecommendationService,
  sendCommentService,
  sendVoteService,
} from "../services";
import "./Recommendation.css";

export const Recommendation = ({
  recommendation,
  addComment,
  removeRecommedation,
  voteRecommendation,
}) => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [setError] = useState("");
  const [comentario, setComentario] = useState("");
  const [vote, setVote] = useState(null);

  const [commentOpen, setCommentOpen] = useState(false);

  const handleCommentIconClick = () => {
    setCommentOpen(true);
  };

  const handleCommentForm = async (e) => {
    e.preventDefault();
    try {
      const newComment = await sendCommentService({
        id: recommendation.id,
        token,
        comentario,
      });
      addComment(newComment);
      setComentario("");
      setCommentOpen(false); // cerrar el cajetín de comentarios
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVoteForm = async (e) => {
    e.preventDefault(); // Prevenir la acción por defecto del formulario
    try {
      const updated = await sendVoteService({
        id: recommendation.id,
        token,
        vote,
      });

      voteRecommendation(updated.id, updated.num_votes, updated.media);
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
      <div className="rTexts">
        <p className="rTitle">{recommendation.title}</p>
        <p className="date">
          {new Date(recommendation.createdAt).getDate()}{" "}
          {new Date(recommendation.createdAt)
            .toLocaleString("default", {
              month: "short",
            })
            .toUpperCase()}{" "}
          {new Date(recommendation.createdAt).getFullYear()}
        </p>
        <div className="userv">
          <Link to={`/user/${recommendation.idUser}`} className="rUser">
            <p>{recommendation.user}</p>
          </Link>
          {recommendation.media ? (
            <p>
              {recommendation.media} ({recommendation.num_votes})
            </p>
          ) : null}
        </div>
      </div>
      <img
        src={`${process.env.REACT_APP_BACKEND}/uploads/${recommendation.photo}`}
        alt={recommendation.title}
      />
      <div className="rTexts">
        <div className="rPlaceCat">
          <p> 📍{recommendation.place}</p>
          <p className="rCategory"> {recommendation.category}</p>
        </div>
        <section
          dangerouslySetInnerHTML={{
            __html: recommendation.text,
          }}
        ></section>
      </div>
      <div className="rLine"></div>
      {token ? (
        <section>
          <div className="formR">
            <button
              className="commentR"
              type="button"
              onClick={handleCommentIconClick}
            >
              <ChatBubbleOutlineIcon />
            </button>
            {commentOpen && (
              <form onSubmit={handleCommentForm}>
                <fieldset>
                  <label htmlFor="comment"></label>
                  <input
                    type="text"
                    id="comment"
                    name="comment"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                  />
                </fieldset>
                <button type="submit">Publicar</button>
              </form>
            )}
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
          </div>
          <h2 className="comments">Comentarios</h2>
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
        </section>
      ) : null}
    </article>
  );
};
