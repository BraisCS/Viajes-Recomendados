import { useState, useEffect } from "react";
import { getAllRecommendationsService } from "../../services/index";
import { RecommendationsList } from "../../components/RecommendationsList";

export const AllRecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <section>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <RecommendationsList recommendations={recommendations} />
      )}
    </section>
  );
};
