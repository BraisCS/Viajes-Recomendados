export const RecommendationComments = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.comment} (by {comment.name})
        </li>
      ))}
    </ul>
  );
};
