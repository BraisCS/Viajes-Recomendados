import { useState } from "react";
import { Link } from "react-router-dom";

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
        <p>No se encontraron recomendaciones...</p>
      )}
    </div>
  );
};
