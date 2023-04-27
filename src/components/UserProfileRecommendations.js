import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import "./UserProfileRecommendations.css";

export const UserProfileRecommendations = ({ recommendations }) => {
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(recommendations.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const selectedRecommendations = recommendations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <article className="rprofile">
        {selectedRecommendations.map((recommendation) => (
          <div className="profileR">
            <div className="placeC">
              <Link to={`/recommendations/${recommendation.id}`}>
                <p className="profileT">{recommendation.title}</p>
              </Link>
              <p className="profileV">
                ★{recommendation.media} ({recommendation.num_votes})
              </p>
            </div>
            <Link to={`/recommendations/${recommendation.id}`}>
              <img
                src={`${process.env.REACT_APP_BACKEND}/uploads/${recommendation.photo}`}
                alt={recommendation.title}
                className="profileI"
              />
            </Link>
            <div className="placeC">
              <p className="profilePlace">📍{recommendation.place}</p>
              <p className="profileC">{recommendation.category}</p>
            </div>
            <p className="profileS">{recommendation.summary}</p>
          </div>
        ))}
      </article>
      <Stack
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <Pagination count={pageCount} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
};
