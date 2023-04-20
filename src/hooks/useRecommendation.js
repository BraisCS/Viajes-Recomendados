import { useEffect } from "react";
import { useState } from "react";
import { getSingleRecommendationsService } from "../services/index";

const useRecommendation = (id) => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecommendation = async () => {
      try {
        setLoading(true);
        const data = await getSingleRecommendationsService(id);
        setRecommendation(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadRecommendation();
  }, [id]);

  const addComment = (comment) => {
    setRecommendation({
      ...recommendation,
      comments: [comment, ...recommendation.comments],
    });
  };

  const removeRecommendation = (id) => {
    setRecommendation(
      recommendation.filter((recommendation) => recommendation.id !== id)
    );
  };

  return { recommendation, loading, error, addComment, removeRecommendation };
};

export default useRecommendation;
