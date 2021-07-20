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

function AddEducation() {
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
  const { [reset]: resetSchool, ...school } = useField("text");
  const { [reset]: resetDegree, ...degree } = useField("text");
  const { [reset]: resetFieldOfStudy, ...fieldofstudy } = useField("text");
  const { [reset]: resetFromDate, ...from } = useField("date");
  const { [reset]: resetToDate, ...to } = useField("date");
  const { [reset]: resetDescription, ...description } = useField("text");

  const resetAll = () => {
    resetSchool();
    resetDegree();
    resetFieldOfStudy();
    resetFromDate();
    resetToDate();
    resetDescription();
  };

  const handleAddEducation = async (event) => {
    event.preventDefault();
    const education = {
      school: school.value,
      degree: degree.value,
      fieldofstudy: fieldofstudy.value,
      current,
      from: from.value,
      to: to.value,
      description: description.value,
    };
    try {
      await dispatch(
        updateProfile({ education: [...currentProfile.education, education] })
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
        <h2 className="font-weight-bolder text-info">Add Education</h2>
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
        <i className="fas fa-award fa-lg"></i> Add Education/Certifications
      </p>
      <Card>
        <Card.Body>
          <Form onSubmit={handleAddEducation}>
            <Form.Row>
              <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="jobtitle">
                  <Form.Label>School</Form.Label>
                  <Form.Control
                    {...school}
                    placeholder="School/University"
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="company">
                  <Form.Label>Degree</Form.Label>
                  <Form.Control {...degree} placeholder="Degree" required />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Field of Study</Form.Label>
              <Form.Control {...fieldofstudy} placeholder="Field of Study" />
            </Form.Group>
            <Form.Row className="align-items-end">
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="from">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    {...from}
                    title="When did you start studying here"
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="to">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    {...to}
                    title="When did you leave complete your course"
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
                    label="Currently Enrolled"
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
              Add Education
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddEducation;
