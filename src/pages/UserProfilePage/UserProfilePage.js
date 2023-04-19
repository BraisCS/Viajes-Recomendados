import { useParams } from "react-router-dom";
import { UserProfile } from "../../components/UserProfile";
import { ErrorMessage } from "../../components/ErrorMessage";
import useRecommendations from "../../hooks/useRecommendations";
import { UserProfileRecommendations } from "../../components/UserProfileRecommendations";

export const UserProfilePage = () => {
  const { idUser } = useParams();

  const { user, loading, error } = UserProfile(idUser);
  const { recommendations } = useRecommendations();

  if (loading) return <p> Cargando recomendacion </p>;
  if (error) return <ErrorMessage message={error} />;

  if (user) {
    // Filtrar las recomendaciones por el idUser del usuario actual
    const userRecommendations = recommendations.filter(
      (rec) => rec.idUser === user.id
    );

    return (
      <section>
        <h1> Datos de {user.name} </h1>
        <p>Nombre: {user.name}</p>
        <p>Biografia: {user.biography}</p>
        <img
          src={`${process.env.REACT_APP_BACKEND}/uploads/${user.photo}`}
          alt={user.name}
        />
        <h1>Las recomendaciones subida por {user.name} son las siguientes :</h1>
        <section>
          <h1>
            <UserProfileRecommendations recommendations={userRecommendations} />
          </h1>
        </section>
      </section>
    );
  }
};
