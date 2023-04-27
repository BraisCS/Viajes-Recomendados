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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 6000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    dotsClass: "slick-dots",
    fade: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <p className="firstText">
        Las tres recomendaciones más votadas están aquí!
      </p>

      <Slider {...settings}>
        {topThreeRecommendations.map((recommendation) => (
          <MostVoted key={recommendation.id} recommendation={recommendation} />
        ))}
      </Slider>

      {topThreeRecommendations.length > 0 ? null : (
        <p className="listText">
          Aún no hay publicaciones. ¡Anímate y se el primero en compartir tus
          experiencias!
        </p>
      )}
    </>
  );
};
