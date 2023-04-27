import { useParams } from "react-router-dom";
import { UserProfile } from "../../components/UserProfile";
import { ErrorMessage } from "../../components/ErrorMessage";
import useRecommendations from "../../hooks/useRecommendations";
import { UserProfileRecommendations } from "../../components/UserProfileRecommendations";
import "../UserProfilePage/UserProfilePage.css";

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
        <div className="userPage">
          <img
            className="imgProfile"
            src={`${process.env.REACT_APP_BACKEND}/uploads/${user.photo}`}
            alt={user.name}
          />
          <div className="userDates">
            <p className="nameProfile">{user.name} </p>
            <p className="bioProfile">{user.biography}</p>
          </div>
        </div>

        <h1 className="h1profile">Publicaciones de {user.name}</h1>
        <section>
          <h1>
            <UserProfileRecommendations recommendations={userRecommendations} />
          </h1>
        </section>
      </section>
    );
  }
};
