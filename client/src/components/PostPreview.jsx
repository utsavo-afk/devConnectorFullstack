import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { Image } from "react-bootstrap";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { notifyAndClear } from "../reducers/alertReducer";
import { removePost, likePost, unlikePost } from "../reducers/postReducer";

function PostPreview({ post, auth }) {
  const dispatch = useDispatch();
  // delete post
  const deletePost = async (id) => {
    try {
      await dispatch(removePost(id));
      dispatch(notifyAndClear("Post Deleted", "success", 3));
    } catch (error) {
      dispatch(notifyAndClear("" + error, "warning", 3));
    }
  };

  // like post
  const handleLikePost = async (id) => {
    try {
      await dispatch(likePost(id));
      dispatch(notifyAndClear("Liked Post", "success", 3));
    } catch (error) {
      dispatch(notifyAndClear("" + error, "danger", 3));
    }
  };

  // unlike post
  const handleUnlikePost = async (id) => {
    try {
      await dispatch(unlikePost(id));
      dispatch(notifyAndClear("Unliked Post", "success", 3));
    } catch (error) {
      dispatch(notifyAndClear("" + error, "danger", 3));
    }
  };

  return (
    <Card className="mb-3 bg-light border-light">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Link to={`/posts/${post._id}`}>
              <Card.Title>{post.text}</Card.Title>
            </Link>
            <Link to={`/profiles/${post.user.id}`}>
              <Card.Subtitle className="text-muted">
                ~{" "}
                <Image
                  src={post.avatar}
                  roundedCircle
                  style={{ height: "28px" }}
                />{" "}
                {post.author} on{" "}
                {<Moment format="MM/YY">{post.createdAt}</Moment>}
              </Card.Subtitle>
            </Link>
          </div>
          <div>
            <Badge>
              <i className="fas fa-star fa-lg text-secondary">
                {post.likes.length || null}
              </i>
            </Badge>
          </div>
        </div>

        <div className="mt-3 d-flex justify-content-between align-items-baseline">
          <div>
            <Button
              onClick={() => handleLikePost(post._id)}
              className="btn-sm btn-light"
            >
              <i className="fas fa-thumbs-up text-secondary"></i>{" "}
              <span className="text-primary text-monospace font-weight-bold">
                {post.likes.length || null}
              </span>
            </Button>
            <Button
              onClick={() => handleUnlikePost(post._id)}
              className="btn-sm btn-light mx-1"
            >
              <i
                className="fa fa-thumbs-down text-secondary"
                aria-hidden="true"
              ></i>
            </Button>
            <Link to={`/posts/${post._id}`}>
              <Button className="btn-sm btn-light">
                <i
                  className="fa fa-comment text-secondary"
                  aria-hidden="true"
                ></i>{" "}
                Discussion{" "}
                <span className="bg-secondary p-1 rounded text-light text-monospace">
                  {post.comments.length}
                </span>
              </Button>
            </Link>
          </div>
          {auth.user.id === post.user.id && (
            <div>
              <Button
                onClick={() => deletePost(post._id)}
                className="btn-sm btn-light"
              >
                <i className="fa fa-trash text-danger" aria-hidden="true"></i>
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default PostPreview;
