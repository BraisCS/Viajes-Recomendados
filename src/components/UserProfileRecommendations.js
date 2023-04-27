import { Link } from "react-router-dom";

export const UserProfileRecommendations = ({ recommendations }) => {
  return recommendations.length ? (
    <article>
      {recommendations.map((recommendation) => (
        <div className="slide-container">
          <p className="slide-votes">
            {recommendation.media} ({recommendation.num_votes})
          </p>

          <p className="slide-place">{recommendation.place}</p>

          <Link to={`/recommendations/${recommendation.id}`}>
            <img
              src={`${process.env.REACT_APP_BACKEND}/uploads/${recommendation.photo}`}
              alt={recommendation.title}
              className="slide-image"
            />
          </Link>

          <Link to={`/recommendations/${recommendation.id}`}>
            <p className="slide-title">{recommendation.title}</p>
          </Link>

          <p className="slide-category">{recommendation.category}</p>

          <p className="slide-summary">{recommendation.summary}</p>
        </div>
      ))}
    </article>
  ) : (
    <p>Aún no ha publicado recomendaciones.</p>
  );
};
