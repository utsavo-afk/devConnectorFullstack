import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { signup } from "../api/user-api";
import { notifyAndPersist } from "../reducers/alertReducer";
import { checkCacheAndSetAuth, setAuthAndCache } from "../reducers/authReducer";
import { useField } from "./../hooks/index";

function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const reset = "reset";
  const { [reset]: resetName, ...name } = useField("text");
  const { [reset]: resetEmail, ...email } = useField("email");
  const { [reset]: resetPassword, ...password } = useField("password");
  const { [reset]: resetPasswordConfirm, ...passwordConfirm } =
    useField("password");

  const resetAll = () => {
    resetName();
    resetEmail();
    resetPassword();
    resetPasswordConfirm();
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password.value !== passwordConfirm.value) {
      // danger alert check password
      dispatch(notifyAndPersist("🔴 Passwords don't match", "danger"));
    } else {
      // sign up
      const payload = {
        name: name.value,
        email: email.value,
        password: password.value,
      };
      try {
        const res = await signup(payload);
        if (res) {
          dispatch(setAuthAndCache(res));
          resetAll();
          history.push("/dashboard");
        }
      } catch (error) {
        resetAll();
        dispatch(notifyAndPersist("" + error, "danger"));
      }
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
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-baseline">
        <h2 className="font-weight-bolder text-info">Sign Up</h2>
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
              <i className="fas fa-user-plus"></i> Create your account
            </h2>
          </Card.Title>
          <Form onSubmit={handleSignup}>
            <div className="mb-2">
              <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                Name
              </Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  {...name}
                  id="username"
                  placeholder="Username"
                  required
                />
              </InputGroup>
            </div>

            <Form.Label htmlFor="inlineFormInputGroup" srOnly>
              Email
            </Form.Label>

            <div className="mb-2">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Email</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  {...email}
                  id="email"
                  placeholder="Email"
                  required
                />
              </InputGroup>
              <Form.Text className="text-dark-50 text-muted font-italic">
                This site uses{" "}
                <a
                  href="https://en.gravatar.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  gravatar
                </a>
                . Please use a gravatar compatible email, if you want a profile
                picture.
              </Form.Text>
            </div>

            <Row>
              <Col sm={12} md={6}>
                <div className="mb-2">
                  <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                    Password
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Password</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      {...password}
                      id="password"
                      placeholder="Password"
                      required
                    />
                  </InputGroup>
                  <Form.Text className="text-muted">
                    We will not share your password with anyone, use a secure
                    password
                  </Form.Text>
                </div>
              </Col>
              <Col sm={12} md={6}>
                <div className="mb-2">
                  <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                    Password Confirm
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Confirm Password</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      {...passwordConfirm}
                      id="passwordConfirm"
                      placeholder="Confirm Password"
                      required
                    />
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Please type your password again, make sure CAPS LOCK is
                    truned off
                  </Form.Text>
                </div>
              </Col>
            </Row>
            <Button className="font-weight-bold" variant="info" type="submit">
              <i className="fas fa-user-plus"></i> Register
            </Button>
            <hr />
            <p
              className="text-muted text-monospace"
              style={{ fontSize: "14px" }}
            >
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Signup;
