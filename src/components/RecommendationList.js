import { Link } from "react-router-dom";

export const RecommendationList = ({ recommendations }) => {
  return recommendations.length ? (
    <article>
      {recommendations.map((recommendation) => (
        <ul key={recommendation.id}>
          <li>
            <Link to={`/recommendations/${recommendation.id}`}>
              <p> Titulo:{recommendation.title}</p>
            </Link>
            <Link to={`/user/${recommendation.idUser}`}>
              <p>Usuario:{recommendation.user}</p>
            </Link>
            <p>Categoria:{recommendation.category}</p>
            <p>Lugar:{recommendation.place}</p>
            <img
              src={`${process.env.REACT_APP_BACKEND}/uploads/${recommendation.photo}`}
              alt={recommendation.title}
            />
            <p>
              El numero de votos es de: {recommendation.num_votes} y la media es
              de: {recommendation.media}
            </p>
            <p>Numero de comentarios: {recommendation.num_comments}</p>
          </li>
        </ul>
      ))}
    </article>
  ) : (
    <p>There are no recommendations yet...</p>
  );
};
