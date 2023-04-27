import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../MostVotedRecommendations/MostVoted.css";

export const MostVoted = ({ recommendation }) => {
  return (
    <div className="slide-container">
      <div className="userVote">
        <Link to={`/user/${recommendation.idUser}`}>
          <p className="slide-name">{recommendation.user}</p>
        </Link>
        <p className="slide-votes">
          {recommendation.media} ({recommendation.num_votes})
        </p>
      </div>

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
  );
};
