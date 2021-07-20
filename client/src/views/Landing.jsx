import { useEffect } from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import {
  checkCacheAndSetAuth,
  checkIsTokenExpired,
} from "../reducers/authReducer";

const Landing = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(checkCacheAndSetAuth());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      console.log("checked");
      dispatch(checkIsTokenExpired(history));
    }
  }, [dispatch, history]);
  return (
    <Container className="mt-3">
      <Jumbotron className="pb-3">
        <h1 className="display-4 text-info">Are you a Developer?</h1>
        <p className="lead">
          This is a website made by developers for developers. You can follow
          other developers, comment on posts that interest you and share your
          work through your custom profile.
        </p>
        <hr className="my-2" />
        <p className="text-muted">
          This website is developed using node.js and react, you can clone this
          repository to make custom changes and add functionality. If you are
          interested, go{" "}
          <a
            href="https://github.com/webzth"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline" }}
          >
            here
          </a>
        </p>
        <p className="lead">
          <Button variant="info btn-lg" as={Link} to="/developers">
            DevConnetor Network <i className="fas fa-paper-plane"></i>
          </Button>
        </p>
        <p
          className="text-muted font-weight-lighter text-monospace"
          style={{ fontSize: "12px" }}
        >
          Already a user?{" "}
          <Link
            to="/login"
            style={{ fontSize: "14px", textDecoration: "underline" }}
          >
            Login
          </Link>{" "}
          or{" "}
          <Link
            to="/signup"
            style={{ fontSize: "14px", textDecoration: "underline" }}
          >
            Register
          </Link>
        </p>
      </Jumbotron>
      <ScrollToTop />
    </Container>
  );
};
export default Landing;
