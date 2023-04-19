import useRecommendations from "../../hooks/useRecommendation";

export const AllRecommendationsPage = () => {
  const { recommendations, loading, error } = useRecommendations();

  if (loading) <p> La pagina está cargando </p>;
  if (error) <p> {error.message}</p>;

  return (
    <section>
      <AllRecommendationsPage recommendations={recommendations} />
    </section>
  );
};
