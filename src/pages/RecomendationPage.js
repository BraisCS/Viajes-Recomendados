import { useParams } from "react-router-dom";
import useRecommendation from "../hooks/useRecommendation";
import { ErrorMessage } from "../components/ErrorMessage";
import { Recommendation } from "../components/Recommendation";

export const RecommendationPage = () => {
  const { id } = useParams();

  const {
    recommendation,
    loading,
    error,
    addComment,
    removeRecommendation,
    voteRecommendation,
  } = useRecommendation(id);

  if (loading) return <p>Cargando recomendacion</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <Recommendation
        recommendation={recommendation}
        addComment={addComment}
        removeRecommedation={removeRecommendation}
        voteRecommendation={voteRecommendation}
      />
    </section>
  );
};
