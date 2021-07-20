import React from "react";
import Moment from "react-moment";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeComment } from "../reducers/postReducer";
import { notifyAndClear } from "../reducers/alertReducer";

function Comment({ comment, auth, postId }) {
  const dispatch = useDispatch();
  const handleDeleteComment = async (commentId) => {
    try {
      await dispatch(removeComment(postId, commentId));
      dispatch(notifyAndClear("Deleted comment", "success", 3));
    } catch (error) {
      dispatch(notifyAndClear("" + error, "danger", 3));
    }
  };
  return (
    <div className="bg-light mb-3 rounded">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <Link to={`/api/profiles/${comment.user}`}>
            <Image
              src={comment.avatar}
              style={{ height: "20px" }}
              roundedCircle
            />
          </Link>
          <span className="mx-1">
            {comment.text}{" "}
            <span className="text-muted text-small">
              on {<Moment format="MM/YY">{comment.createdAt}</Moment>}
            </span>
          </span>
        </div>
        {comment.user === auth.user.id && (
          <div className="mx-1">
            <i
              onClick={() => handleDeleteComment(comment._id)}
              className="fas fa-minus-circle text-danger"
            ></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
