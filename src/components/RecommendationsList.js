import { useState } from "react";
import { Link } from "react-router-dom";

export const RecommendationsList = ({ recommendations }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecommendations = recommendations.filter((recommendation) => {
    return (
      recommendation.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recommendation.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by place or category"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredRecommendations.length ? (
        <article>
          {filteredRecommendations.map((recommendation) => (
            <ul key={recommendation.id}>
              <li>
                <Link to={`/recommendations/${recommendation.id}`}>
                  <p>{recommendation.title}</p>
                </Link>
                <Link to={`/user/${recommendation.idUser}`}>
                  <p>{recommendation.user}</p>
                </Link>
                <p>{recommendation.category}</p>
                <p>{recommendation.place}</p>
                <p>{recommendation.user}</p>
                <img
                  src={`${process.env.REACT_APP_BACKEND}/uploads/${recommendation.photo}`}
                  alt={recommendation.title}
                />
                <p>
                  El numero de votos es de: {recommendation.num_votes} y la
                  media es de: {recommendation.media}
                </p>
                <p>{recommendation.text}</p>
                <p>{recommendation.num_comments}</p>
                <p>{recommendation.user}</p>
                <p>{recommendation.comments}</p>
              </li>
            </ul>
          ))}
        </article>
      ) : (
        <p>No recommendations found...</p>
      )}
    </div>
  );
};
