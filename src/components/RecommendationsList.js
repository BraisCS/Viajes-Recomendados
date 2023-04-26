import { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import "./RecommendationsList.css";

export const RecommendationsList = ({ recommendations }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [placeQuery, setPlaceQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const RECOMMENDATIONS_PER_PAGE = 5;

  const handleSearch = () => {
    setSearchQuery(placeQuery.toLowerCase() + categoryQuery.toLowerCase());
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setPlaceQuery("");
    setCategoryQuery("");
  };

  const handleSortBy = (sortBy) => {
    if (sortBy === "toggleSortOrder") {
      setSortOrder(!sortOrder);
    } else if (sortBy === "maxmedia") {
      setSortBy("maxmedia");
      setSortOrder(true);
    } else if (sortBy === "minmedia") {
      setSortBy("minmedia");
      setSortOrder(true);
    } else if (sortBy === "moreold") {
      setSortBy("moreold");
      setSortOrder(false);
    } else if (sortBy === "morenew") {
      setSortBy("morenew");
      setSortOrder(true);
    } else {
      setSortBy("");
      setSortOrder(true);
    }
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

    .sort((a, b) => {
      if (sortBy === "maxmedia") {
        return sortOrder ? b.media - a.media || 0 : a.media - b.media || 0;
      } else if (sortBy === "minmedia") {
        return sortOrder ? a.media - b.media || 0 : b.media - a.media || 0;
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const totalPages = Math.ceil(
    filteredRecommendations.length / RECOMMENDATIONS_PER_PAGE
  );

  const paginatedRecommendations = filteredRecommendations.slice(
    (currentPage - 1) * RECOMMENDATIONS_PER_PAGE,
    currentPage * RECOMMENDATIONS_PER_PAGE
  );

  return (
    <div>
      <p className="listText">
        Explora todas las publicaciones y encuentra inspiración para tu próximo
        viaje. Déjate llevar y descubre las maravillas que ofrece el mundo.
      </p>
      <div className="sort">
        <div className="searchRemove">
          <input
            className="srinput"
            type="text"
            placeholder="Buscar por lugar"
            value={placeQuery}
            onChange={(e) => setPlaceQuery(e.target.value)}
          />
          <input
            className="srinput"
            type="text"
            placeholder="Buscar por categoría"
            value={categoryQuery}
            onChange={(e) => setCategoryQuery(e.target.value)}
          />
        </div>
        <div className="sortMedia">
          <IconButton
            onClick={handleSearch}
            aria-label="Buscar"
            sx={{
              color: "#80b192",
            }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            onClick={handleClearSearch}
            aria-label="Limpiar"
            sx={{
              color: "#80b192",
            }}
          >
            <DeleteIcon />
          </IconButton>
          <button className="srbutton" onClick={() => handleSortBy("maxmedia")}>
            <img className="imgMedia" src="1.png" alt="Logo"></img>
          </button>
          <button className="srbutton" onClick={() => handleSortBy("minmedia")}>
            <img className="imgMedia" src="2.png" alt="Logo"></img>
          </button>
        </div>
      </div>
      {paginatedRecommendations.length ? (
        <article>
          {paginatedRecommendations.map((recommendation) => (
            <ul className="ul" key={recommendation.id}>
              <li>
                <div className="slide-container">
                  <div className="userVote">
                    <Link to={`/user/${recommendation.idUser}`}>
                      <p className="slide-name">{recommendation.user}</p>
                    </Link>
                    <p className="slide-votes">
                      Nº votos: {recommendation.num_votes} votos:{" "}
                      {recommendation.media}
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
        <p className="listText">
          Aún no hay publicaciones. ¡Regístrate y se el primero en compartir tus
          experiencias!
        </p>
      )}
      {totalPages > 1 && (
        <div className="pages">
          {currentPage > 1 && (
            <button
              className="previousNext"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              className={`numbers ${page === currentPage ? "active" : ""}`}
              key={page}
              onClick={() => setCurrentPage(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              className="previousNext"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente
            </button>
          )}
        </div>
      )}
    </div>
  );
};
