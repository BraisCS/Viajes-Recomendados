import { Link } from "react-router-dom";
import "./RecommendationComments.css";

export const RecommendationComments = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id} className="Comments">
          <div className="userdatecomment">
            <Link to={`/user/${comment.idUser}`} className="CommentName">
              <p>{comment.name}</p>
            </Link>
            <p className="dateComment">
              {new Date(comment.createdAt).getDate()}{" "}
              {new Date(comment.createdAt)
                .toLocaleString("default", {
                  month: "short",
                })
                .toUpperCase()}{" "}
              {new Date(comment.createdAt).getFullYear()}
            </p>
          </div>
          <p className="CommentText">{comment.comment}</p>
        </li>
      ))}
    </ul>
  );
};
