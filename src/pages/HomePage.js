import { MostVoted } from "../components/MostVotedRecommendations/MostVoted";
import { settings } from "../components/MostVotedRecommendations/MostVoted";
import useRecommendations from "../hooks/useRecommendations";
import { ErrorMessage } from "../components/ErrorMessage";
import Slider from "react-slick";

export const HomePage = () => {
  const { recommendations, loading, error } = useRecommendations();

  if (loading) return <p> La pagina está cargando </p>;
  if (error) return <ErrorMessage message={error}> </ErrorMessage>;

  /* Ordena recomendaciones de menor a mayor, la menor va arriba */
  const sortedRecommendations = recommendations.sort(
    (a, b) => b.media - a.media
  );
  const topThreeRecommendations = sortedRecommendations.slice(0, 3);

  return (
    <Slider {...settings}>
      {topThreeRecommendations.map((recommendation) => (
        <MostVoted key={recommendation.id} recommendation={recommendation} />
      ))}
    </Slider>
  );
};
