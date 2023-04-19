import { useEffect } from "react";
import { useState } from "react";
import { getAllRecommendationsService } from "../services/index";

const useRecommendations = () => {
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

  /* Añadir una recomendacion  */
  const addRecommendation = (recommendation) => {
    setRecommendations([recommendation, ...recommendations]);
  };

  /* Borrar una recomendacion  */
  const removeRecommendations = (id) => {
    setRecommendations(
      recommendations.filter((recommendation) => recommendation.id !== id)
    );
  };

  return {
    recommendations,
    loading,
    error,
    addRecommendation,
    removeRecommendations,
  };
};

export default useRecommendations;
