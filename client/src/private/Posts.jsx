import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PostPreview from "../components/PostPreview";
import { notifyAndClear } from "../reducers/alertReducer";
import {
  checkCacheAndSetAuth,
  checkIsTokenExpired,
} from "../reducers/authReducer";
import { addPost, getAllPosts } from "../reducers/postReducer";
import { isEmpty } from "lodash";
import { useField } from "./../hooks/index";

function Posts() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts.allPosts);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkCacheAndSetAuth());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      console.log("checked");
      dispatch(checkIsTokenExpired(history));
    }
  }, [dispatch, history]);

  useEffect(() => {
    async function getPosts() {
      try {
        await dispatch(getAllPosts());
      } catch (error) {
        dispatch(notifyAndClear("" + error, "danger", 3));
      }
    }
    getPosts();
  }, [dispatch]);

  const reset = "reset";
  const { [reset]: resetText, ...text } = useField("text");

  const handleCreatePost = async () => {
    const data = {
      text: text.value,
    };
    try {
      await dispatch(addPost(data));
      resetText();
    } catch (error) {
      dispatch(notifyAndClear("" + error, "danger", 3));
    }
  };

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-baseline">
        <h2 className="font-weight-bolder text-info">Posts</h2>
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
      {
        <Row>
          <Col sm={12} md={4}>
            <div className="mb-5">
              <Form onSubmit={handleCreatePost}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="font-weight-bold">
                    Share a Post
                  </Form.Label>
                  <Form.Control
                    {...text}
                    placeholder="What's on your mind?"
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="btn-sm btn-info font-weight-bold"
                >
                  <i className="fa fa-paper-plane" aria-hidden="true"></i> Share
                </Button>
              </Form>
              <hr />
            </div>
          </Col>
          <Col sm={12} md={8}>
            <div>
              <p className="mb-2 font-weight-bold text-info">
                DevConnector Feed
              </p>
              {isEmpty(posts) && (
                <p className="text-muted">Feed is empty, no posts to display</p>
              )}
              {!isEmpty(posts) && (
                <div>
                  {posts.map((p) => (
                    <PostPreview key={p._id} post={p} auth={isAuthenticated} />
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
      }
    </Container>
  );
}

export default Posts;
