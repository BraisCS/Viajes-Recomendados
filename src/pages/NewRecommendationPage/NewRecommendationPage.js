import { useNavigate, useParams } from "react-router-dom";
import { UserProfile } from "../../components/UserProfile";
import { ErrorMessage } from "../../components/ErrorMessage";
import useRecommendations from "../../hooks/useRecommendations";
import { UserProfileRecommendations } from "../../components/UserProfileRecommendations";
import { NewRecommendation } from "../../components/NewRecommendation";

export const NewRecommendationPage = () => {
  const { addRecommendation } = useRecommendations();
  return (
    <p>
      <NewRecommendation addRecommendation={addRecommendation} />
    </p>
  );
};
