import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../reducers/authReducer";
import { resetPostsReducer } from "../reducers/postReducer";
import { resetProfileReducer } from "../reducers/profileReducer";

const Navigation = () => {
  const authenticated = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  // display name for auth user
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <div>
          <Navbar.Brand as={Link} to="/" href="#home">
            <h2 className="mb-0 text-info font-weight-bolder font-italic">
              <i className="fas fa-code"></i> DevConnector
            </h2>
          </Navbar.Brand>
          {authenticated && (
            <Navbar.Text className="d-none d-sm-inline-block">
              Signed in as:{" "}
              <Link
                className="text-success"
                to={`/profiles/${authenticated.user.id}`}
              >
                {authenticated.user.name}
              </Link>
            </Navbar.Text>
          )}
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <hr />
          <Nav className="ml-auto d-flex flex-row justify-content-between">
            <Nav.Link as={Link} to="/developers" href="/developers">
              <Button className="btn-md" variant="outline-light">
                <i className="fas fa-users"></i> Developers
              </Button>
            </Nav.Link>
            {authenticated && (
              <Nav.Link
                className="ml-auto"
                as={Link}
                to="/dashboard"
                href="/dashboard"
              >
                <Button className="btn-md" variant="outline-light">
                  <i className="fas fa-user-cog"></i> Dashboard
                </Button>
              </Nav.Link>
            )}
            {authenticated && (
              <Nav.Link className="ml-auto" as={Link} to="/posts" href="/posts">
                <Button className="btn-md" variant="outline-light">
                  <i className="fas fa-comments"></i> Posts
                </Button>
              </Nav.Link>
            )}
            {authenticated && (
              <Nav.Link className="ml-auto" href="#">
                <Button
                  onClick={() => {
                    dispatch(logout());
                    dispatch(resetProfileReducer());
                    dispatch(resetPostsReducer());
                    history.push("/");
                  }}
                  className="btn-md"
                  variant="outline-danger"
                >
                  <i className="fas fa-times-circle"></i> Logout
                </Button>
              </Nav.Link>
            )}
            {!authenticated && (
              <>
                <Nav.Link as={Link} to="/login" href="/login">
                  <Button
                    className="btn-md font-weight-bold"
                    variant="outline-info"
                  >
                    Login
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" href="/signup">
                  <Button
                    className="btn-md font-weight-bold"
                    variant="outline-info"
                  >
                    Sign Up
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
