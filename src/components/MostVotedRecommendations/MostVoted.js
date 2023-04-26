import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../MostVotedRecommendations/MostVoted.css";

export const settings = {
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

export const MostVoted = ({ recommendation }) => {
  return (
    <div>
      <p className="firstText">
        Las tres recomendaciones más votadas están aquí!
      </p>
      <div className="slide-container">
        <div className="userVote">
          <Link to={`/user/${recommendation.idUser}`}>
            <p className="slide-name">{recommendation.user}</p>
          </Link>
          <p className="slide-votes">
            Nº votos: {recommendation.votes} votos: {recommendation.votes}
          </p>
        </div>

        <p className="slide-place">{recommendation.place}</p>

        <Link to={`/recommendations/${recommendation.id}`}>
          <img
            src={`${process.env.REACT_APP_BACKEND}/uploads/${recommendation.photo}`}
            alt={recommendation.title}
            className="slide-image"
          />
        </Link>

        <Link to={`/recommendations/${recommendation.id}`}>
          <p className="slide-title">{recommendation.title}</p>
        </Link>

        <p className="slide-category">{recommendation.category}</p>

        <p className="slide-summary">{recommendation.summary}</p>
      </div>
      <p className="listText">
        Aún no hay publicaciones. ¡Regístrate y se el primero en compartir tus
        experiencias!
      </p>
    </div>
  );
};
