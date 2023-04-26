import { useState } from "react";
import { Link } from "react-router-dom";
import "./RecommendationList.css";

export const RecommendationsList = ({ recommendations }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [placeQuery, setPlaceQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery(placeQuery.toLowerCase() + categoryQuery.toLowerCase());
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setPlaceQuery("");
    setCategoryQuery("");
  };

  const filteredRecommendations = recommendations
    .filter((recommendation) => {
      if (searchQuery === "") {
        return true;
      }
      return (
        recommendation.place.toLowerCase().includes(placeQuery.toLowerCase()) &&
        recommendation.category
          .toLowerCase()
          .includes(categoryQuery.toLowerCase())
      );
    })
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por lugar"
        value={placeQuery}
        onChange={(e) => setPlaceQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Buscar por categoría"
        value={categoryQuery}
        onChange={(e) => setCategoryQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <button onClick={handleClearSearch}>Limpiar</button>
      {filteredRecommendations.length ? (
        <article>
          {filteredRecommendations.map((recommendation) => (
            <ul className="ul" key={recommendation.id}>
              <li>
                <div className="slide-container">
                  <div className="userVote">
                    <Link to={`/user/${recommendation.idUser}`}>
                      <p className="slide-name">{recommendation.user}</p>
                    </Link>
                    <p className="slide-votes">
                      Nº votos: {recommendation.votes} votos:{" "}
                      {recommendation.votes}
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
              </li>
            </ul>
          ))}
        </article>
      ) : (
        <p>No se encontraron recomendaciones...</p>
      )}
    </div>
  );
};
