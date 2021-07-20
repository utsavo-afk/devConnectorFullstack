import React, { useEffect } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { create } from "../api/profile-api";
import { useField } from "./../hooks/index";
import { useDispatch } from "react-redux";
import { notifyAndPersist } from "./../reducers/alertReducer";
import {
  checkCacheAndSetAuth,
  checkIsTokenExpired,
} from "../reducers/authReducer";

function CreateProfile() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCacheAndSetAuth());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      console.log("checked");
      dispatch(checkIsTokenExpired(history));
    }
  }, [dispatch, history]);

  // form fields
  const reset = "reset";
  const { [reset]: resetProfessionalStatus, ...professionalStatus } =
    useField("text");
  const { [reset]: resetCompany, ...company } = useField("text");
  const { [reset]: resetLocation, ...location } = useField("text");
  const { [reset]: resetBio, ...bio } = useField("text");
  const { [reset]: resetWebsite, ...website } = useField("text");
  const { [reset]: resetSkills, ...skills } = useField("text");
  const { [reset]: resetGithubusername, ...githubusername } = useField("text");
  const { [reset]: resetTwitter, ...twitterUrl } = useField("text");
  const { [reset]: resetLinkedin, ...linkedinUrl } = useField("text");
  const { [reset]: resetYoutube, ...youtubeUrl } = useField("text");
  const { [reset]: resetFacebook, ...facebookUrl } = useField("text");
  const { [reset]: resetInstagram, ...instagramUrl } = useField("text");
  const { [reset]: resetGithub, ...githubUrl } = useField("text");

  const resetAll = () => {
    resetProfessionalStatus();
    resetCompany();
    resetLocation();
    resetBio();
    resetWebsite();
    resetSkills();
    resetGithubusername();
    resetTwitter();
    resetLinkedin();
    resetYoutube();
    resetFacebook();
    resetInstagram();
    resetGithub();
  };

  const handleCreateProfile = async (event) => {
    event.preventDefault();
    const newProfile = {
      status: professionalStatus.value,
      company: company.value,
      location: location.value,
      bio: bio.value,
      website: website.value,
      skills: skills.value,
      githubusername: githubusername.value,
      social: {
        ...(twitterUrl.value && { twitter: twitterUrl.value }),
        ...(linkedinUrl.value && { linkedin: linkedinUrl.value }),
        ...(youtubeUrl.value && { youtube: youtubeUrl.value }),
        ...(facebookUrl.value && { facebook: facebookUrl.value }),
        ...(instagramUrl.value && { instagram: instagramUrl.value }),
        ...(githubUrl.value && { github: githubUrl.value }),
      },
    };

    try {
      await create(newProfile);
      history.push("/dashboard");
      resetAll();
    } catch ({ error }) {
      dispatch(notifyAndPersist("" + error, "danger"));
    }
  };
  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-baseline">
        <h2 className="font-weight-bolder text-info">Create Profile</h2>
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

      <p className="lead">
        Let's get some information to make your profile stand out
      </p>
      <Card>
        <Card.Body>
          <Card.Title className="text-info">Your Profile</Card.Title>
          <hr />
          <Form onSubmit={handleCreateProfile}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Professional Status</Form.Label>
              <Form.Control {...professionalStatus} as="select" required>
                <option value="0">Select Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </Form.Control>
              <Form.Text className="text-muted">
                Give us an idea where you are at in your career
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control {...company} placeholder="Company" />
              <Form.Text className="text-muted">
                Your own consultancy or where you work
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control {...location} placeholder="Location" />
            </Form.Group>
            <Form.Row>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Bio</Form.Label>
                  <Form.Control {...bio} placeholder="Bio" />
                  <Form.Text className="text-muted">
                    A short introduction about yourself for other devs
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    {...website}
                    placeholder="https://www.example.xyz"
                  />
                  <Form.Text className="text-muted">
                    A link to your personal or professional website
                  </Form.Text>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group>
              <Form.Label>Skills</Form.Label>
              <Form.Control
                {...skills}
                placeholder="Lion, Zebra, Camel"
                required
              />
              <Form.Text className="text-muted">
                Please use comma separated values to list your skills
              </Form.Text>
            </Form.Group>
            <div className="d-flex flex-column mb-4">
              <Form.Label>Github Username</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="githubusername">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  {...githubusername}
                  placeholder="github Username"
                  aria-label="githubusername"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <Form.Text>
                If you want your latest repos and a github link, include your
                valid and active github username
              </Form.Text>
            </div>
            <Accordion className="mb-4">
              <Accordion.Toggle
                className="mb-1"
                as={Button}
                variant="dark"
                eventKey="0"
              >
                Connect to your other Social Networks ✨️
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-muted">
                      Add Your Social Network Links
                    </Card.Title>
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="twitter">
                          <i className="text-primary fab fa-twitter fa-lg"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        {...twitterUrl}
                        placeholder="Twitter URL"
                        aria-label="twitter"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="linkedin">
                          <i className="text-info fab fa-linkedin fa-lg"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        {...linkedinUrl}
                        placeholder="Linkedin URL"
                        aria-label="linkedin"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="YouTube">
                          <i className="text-danger fab fa-youtube fa-lg"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        {...youtubeUrl}
                        placeholder="YouTube URL"
                        aria-label="youtube"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="Facebook">
                          <i className="text-primary fab fa-facebook fa-lg"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        {...facebookUrl}
                        placeholder="Facebook URL"
                        aria-label="facebook"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="instagram">
                          <i
                            className="fab fa-instagram fa-lg"
                            style={{ color: "orange" }}
                          ></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        {...instagramUrl}
                        placeholder="Instagram URL"
                        aria-label="instagram"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="github">
                          <i
                            className="fab fa-github fa-lg"
                            style={{ color: "purple" }}
                          ></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        {...githubUrl}
                        placeholder="Github URL"
                        aria-label="github"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Card.Body>
                </Card>
              </Accordion.Collapse>
              <Form.Text className="text-muted">This is optional</Form.Text>
            </Accordion>

            <Button type="submit" variant="info" className="font-weight-bold">
              <i className="fas fa-edit"></i> Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateProfile;
