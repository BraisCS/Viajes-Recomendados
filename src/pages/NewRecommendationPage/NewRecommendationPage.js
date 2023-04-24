import useRecommendations from "../../hooks/useRecommendations";
import { NewRecommendation } from "../../components/NewRecommendation";

export const NewRecommendationPage = () => {
  const { addRecommendation } = useRecommendations();
  return (
    <p>
      <NewRecommendation addRecommendation={addRecommendation} />
    </p>
  );
};
