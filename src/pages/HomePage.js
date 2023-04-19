import { RecommendationList } from "../components/RecommendationList";
import useRecommendations from "../hooks/useRecommendations";
import { ErrorMessage } from "../components/ErrorMessage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NewRecommendation } from "../components/NewRecommendation";
import { Link } from "react-router-dom";
export const HomePage = () => {
  const { recommendations, loading, error, removeRecommendations } =
    useRecommendations();

  const { user } = useContext(AuthContext);

  if (loading) return <p> La pagina está cargando </p>;
  if (error) return <ErrorMessage message={error}> </ErrorMessage>;

  /* Ordena recomendaciones de menor a mayor, la menor va arriba */
  const sortedRecommendations = recommendations.sort(
    (a, b) => b.media - a.media
  );
  const topThreeRecommendations = sortedRecommendations.slice(0, 3);

  return (
    <section>
      <h1> Las tres recomendaciones con mejor valoracion </h1>
      <RecommendationList
        recommendations={topThreeRecommendations}
        removeRecommendations={removeRecommendations}
      />
    </section>
  );
};
