import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyAndClear } from "../reducers/alertReducer";
import { checkCacheAndSetAuth } from "../reducers/authReducer";
import {
  addCommentToPost,
  getPost,
  resetSinglePost,
} from "../reducers/postReducer";
import {
  Image,
  Button,
  Card,
  Container,
  Spinner,
  Badge,
  Form,
  Row,
  Col,
  Jumbotron,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Moment from "react-moment";
import { useField } from "./../hooks/index";
import { isEmpty } from "lodash";
import Comment from "./Comment";

function Post({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => state.posts.post);
  const isAuthenticated = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkCacheAndSetAuth());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(resetSinglePost());
    async function getSinglePost() {
      try {
        await dispatch(getPost(match.params.id));
      } catch (error) {
        dispatch(notifyAndClear("" + error, "danger", 3));
      }
    }
    if (!post) {
      getSinglePost();
    }
  }, [dispatch, post, match.params.id]);

  const reset = "reset";
  const { [reset]: resetComment, ...comment } = useField("text");

  const handleAddComment = async (event) => {
    event.preventDefault();
    let data = {
      text: comment.value,
    };
    try {
      await dispatch(addCommentToPost(post._id, data));
      dispatch(notifyAndClear("Commented on post", "success", 3));
      resetComment();
    } catch (error) {
      dispatch(notifyAndClear("" + error, "danger", 3));
    }
  };

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-baseline">
        <h2 className="font-weight-bolder text-info">Post</h2>
        <div className="d-flex">
          <Button
            className="bg-light border-0 mr-1"
            onClick={() => history.goBack()}
          >
            <i className="text-dark fas fa-arrow-circle-left fa-2x"></i>
          </Button>
          <Button
            className="bg-light border-0"
            onClick={() => history.push("/")}
          >
            <i className="text-dark fas fa-home fa-2x"></i>
          </Button>
        </div>
      </div>
      <hr className="mb-5" />

      {!post && (
        <div className="mt-5 text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {post && (
        <Card className="bg-light">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Card.Title>{post.text}</Card.Title>

                <Link to={`/api/profiles/${post.user.id}`}>
                  <Card.Subtitle className="text-muted">
                    ~{" "}
                    <Image
                      src={post.avatar}
                      roundedCircle
                      style={{ height: "28px" }}
                    />{" "}
                    {post.author} on{" "}
                    {<Moment format="DD/MM/YY">{post.createdAt}</Moment>}
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
          </Card.Body>
          <Card.Footer>
            {!isEmpty(post.comments) && (
              <Jumbotron className="mb-2 p-3">
                {post.comments
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((c) => (
                    <Comment
                      key={c._id}
                      postId={post._id}
                      comment={c}
                      auth={isAuthenticated}
                    />
                  ))}
              </Jumbotron>
            )}
            <Form onSubmit={handleAddComment}>
              <Row className="align-items-center">
                <Col>
                  <Form.Control
                    placeholder="add comment..."
                    id="comment"
                    aria-describedby="comment"
                    {...comment}
                  />
                </Col>
                <Button type="submit" className="mr-3 btn-info btn-md">
                  <i className="fas fa-comment"></i>
                </Button>
              </Row>
            </Form>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
}

export default Post;
