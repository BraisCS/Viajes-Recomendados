import { useState, useEffect } from "react";
import { getAllRecommendationsService } from "../../services/index";
import { RecommendationsList } from "../../components/RecommendationsList";

export const AllRecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setLoading(true);
        const data = await getAllRecommendationsService();
        setRecommendations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadRecommendations();
  }, []);

  const handleSortBy = (option) => {
    setSortBy(option);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecommendations = recommendations.filter(
    (recommendation) =>
      recommendation.place.includes(searchTerm) ||
      recommendation.category.includes(searchTerm)
  );

  const sortedRecommendations = filteredRecommendations.slice().sort((a, b) => {
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    } else if (sortBy === "place") {
      return a.place.localeCompare(b.place);
    } else {
      return b.createdAt.localeCompare(a.createdAt);
    }
  });

  return (
    <section>
      <div>
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" onChange={handleSearch} />

        <button onClick={() => handleSortBy("category")}>Category</button>
        <button onClick={() => handleSortBy("place")}>Place</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <RecommendationsList recommendations={sortedRecommendations} />
      )}
    </section>
  );
};
