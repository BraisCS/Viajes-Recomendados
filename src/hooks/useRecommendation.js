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
        console.log(data);
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

  const voteRecommendation = (id, votes, median) => {
    setRecommendation({
      ...recommendation,
      num_votes: votes,
      media: median,
    });
  };

  return {
    recommendation,
    loading,
    error,
    addComment,
    removeRecommendation,
    voteRecommendation,
  };
};

export default useRecommendation;
