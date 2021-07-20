import { useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { notifyAndPersist } from "../reducers/alertReducer";
import { useField } from "./../hooks/index";
import { checkCacheAndSetAuth, login } from "./../reducers/authReducer";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const reset = "reset";
  const { [reset]: resetPassword, ...password } = useField("password");
  const { [reset]: resetEmail, ...email } = useField("email");

  const resetAll = () => {
    resetPassword();
    resetEmail();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = {
      email: email.value,
      password: password.value,
    };
    try {
      await dispatch(login(credentials));
      resetAll();
      history.push(`${state?.from?.pathname || "/dashboard"}`);
    } catch (error) {
      dispatch(notifyAndPersist("" + error, "danger"));
      resetAll();
    }
  };

  // check for cached user
  useEffect(() => {
    dispatch(checkCacheAndSetAuth());
    if (localStorage.getItem("authUser")) {
      dispatch(notifyAndPersist("Already signed-in 🙌", "success"));
      history.push(`${state?.from?.pathname || "/dashboard"}`);
    }
  }, [dispatch, history, state]);

  return (
    <>
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-baseline">
          <h2 className="font-weight-bolder text-info">Login</h2>
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
        <Card className="bg-light">
          <Card.Body>
            <Card.Title>
              <h2>
                <i className="fas fa-sign-in-alt"></i> Login to your account
              </h2>
            </Card.Title>
            <Form onSubmit={handleLogin}>
              <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                Username
              </Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>Email</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  {...email}
                  id="email"
                  placeholder="Email"
                />
              </InputGroup>

              <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                Password
              </Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>Password</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  {...password}
                  id="password"
                  placeholder="Password"
                />
              </InputGroup>
              <Button className="font-weight-bold" variant="info" type="submit">
                <i className="fas fa-sign-in-alt"></i> Login
              </Button>
              <hr />
              <p
                className="text-muted text-monospace"
                style={{ fontSize: "14px" }}
              >
                Don't have an account? <Link to="/signup">Register</Link>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Login;
