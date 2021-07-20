import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { notifyAndClear, notifyAndPersist } from "../reducers/alertReducer";
import {
  checkCacheAndSetAuth,
  checkIsTokenExpired,
} from "../reducers/authReducer";
import { getCurrentProfile, updateProfile } from "../reducers/profileReducer";
import { useField } from "./../hooks/index";

function AddExperience() {
  const dispatch = useDispatch();
  const history = useHistory();
  let currentProfile = useSelector((state) => state.profiles.currentProfile);

  useEffect(() => {
    dispatch(checkCacheAndSetAuth());
    if (!currentProfile) {
      dispatch(getCurrentProfile());
    }
  }, [dispatch, currentProfile]);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      console.log("checked");
      dispatch(checkIsTokenExpired(history));
    }
  }, [dispatch, history]);

  const [current, setCurrent] = useState(false);
  const [toDateDisabled, setToDateDisabled] = useState(false);

  const reset = "reset";
  const { [reset]: resetStartDate, ...from } = useField("date");
  const { [reset]: resetEndDate, ...to } = useField("date");
  const { [reset]: resetDescription, ...description } = useField("text");
  const { [reset]: resetTitle, ...title } = useField("text");
  const { [reset]: resetCompany, ...company } = useField("text");
  const { [reset]: resetLocation, ...location } = useField("text");

  const resetAll = () => {
    resetStartDate();
    resetEndDate();
    resetDescription();
    resetTitle();
    resetCompany();
    resetLocation();
  };

  const handleAddExperience = async (event) => {
    event.preventDefault();
    const experience = {
      title: title.value,
      company: company.value,
      location: location.value,
      current,
      from: from.value,
      to: to.value,
      description: description.value,
    };
    try {
      await dispatch(
        updateProfile({ exp: [...currentProfile.exp, experience] })
      );
      dispatch(notifyAndClear("Experience Added", "success", 3));
      resetAll();
    } catch (error) {
      dispatch(notifyAndPersist("" + error, "danger"));
      resetAll();
    }
  };

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-baseline">
        <h2 className="font-weight-bolder text-info">Add Experience</h2>
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
        <i className="fas fa-code-branch fa-lg"></i> Add Professional/Job
        experience
      </p>
      <Card>
        <Card.Body>
          <Form onSubmit={handleAddExperience}>
            <Form.Row>
              <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="jobtitle">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control {...title} placeholder="Job Title" required />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="company">
                  <Form.Label>Company</Form.Label>
                  <Form.Control {...company} placeholder="Company" required />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control {...location} placeholder="Location" />
            </Form.Group>
            <Form.Row className="align-items-end">
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="from">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    {...from}
                    title="When did you start working here"
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="to">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    {...to}
                    title="When did you leave this position"
                    disabled={toDateDisabled}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <Form.Check
                    value={current}
                    onChange={() => {
                      setCurrent(!current);
                      setToDateDisabled(!toDateDisabled);
                    }}
                    id="current"
                    label="Current Role"
                    disabled={to.value ? "disabled" : ""}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control {...description} as="textarea" rows={3} />
            </Form.Group>
            <Button
              variant="info"
              className="btn-md font-weight-bold"
              type="submit"
            >
              Add Experience
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddExperience;
