import { Button, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteProfile, getCurrentProfile } from "../reducers/profileReducer";
import {
  checkCacheAndSetAuth,
  checkIsTokenExpired,
  logout,
} from "../reducers/authReducer";
import { notifyAndPersist } from "./../reducers/alertReducer";
import DashboardActions from "../components/DashboardActions";
import ExperienceList from "../components/ExperienceList";
import EducationList from "../components/EducationList";

function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth);
  const currentProfile = useSelector((state) => state.profiles.currentProfile);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkCacheAndSetAuth());
    }
    async function fetchProfile() {
      try {
        await dispatch(getCurrentProfile());
      } catch (error) {
        setIsLoading(false);
        dispatch(notifyAndPersist("" + error, "warning"));
      }
    }
    fetchProfile();
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      console.log("checked");
      dispatch(checkIsTokenExpired(history));
    }
  }, [dispatch, history]);

  const handleDeleteProfile = async (event) => {
    try {
      if (
        window.confirm("Do you want to proceed with deleting your Account?")
      ) {
        await dispatch(deleteProfile());
        dispatch(logout());
        dispatch(
          notifyAndPersist("Account was deleted successfully", "success")
        );
        history.push("/");
      }
    } catch (error) {
      dispatch(notifyAndPersist("" + error, "danger"));
    }
  };

  // user has profile
  if (isLoading) {
    return (
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-baseline">
          <div className="d-flex justify-content-between align-items-baseline p-0">
            {!currentProfile && (
              <div className="mr-1">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            )}
            <h2 className="font-weight-bolder text-info">Dashboard</h2>
          </div>
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
        {currentProfile && (
          <>
            <div className="d-flex flex-row align-items-center">
              <img
                src={`https://${currentProfile.user.avatar}`}
                alt=""
                className="img-thumbnail mr-1"
                style={{ height: "45px", borderRadius: "50%" }}
              />
              <span
                className="text-dark font-weight-bolder"
                style={{ fontSize: "30px" }}
              >
                {currentProfile.user.name}
              </span>
            </div>
            <DashboardActions />
            <div className="mt-5">
              {currentProfile.exp.length ? (
                <ExperienceList experience={currentProfile.exp} />
              ) : (
                <p className="text-muted mt-3">
                  You have not added any Professional experience
                </p>
              )}
              {currentProfile.education.length ? (
                <EducationList education={currentProfile.education} />
              ) : (
                <p className="text-muted">
                  You have not added any Educational Details
                </p>
              )}
            </div>

            <Button
              onClick={handleDeleteProfile}
              className="btn-block btn-danger font-weight-bolder"
            >
              Delete Profile
            </Button>
          </>
        )}
      </Container>
    );
  }

  // user doesnt have a profile
  if (!isLoading) {
    return (
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-baseline">
          <div className="d-flex justify-content-between align-items-baseline p-0">
            <h2 className="font-weight-bolder text-info">Dashboard</h2>
          </div>
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
        {!currentProfile && (
          <>
            <h3 className="font-italic">
              Welcome{" "}
              <span className="text-warning font-weight-bolder">
                {isAuthenticated.user.name}
              </span>
            </h3>
            <div className="mt-4">
              <p className="text-monospace font-weight-light text-muted">
                You have not created a profile, go ahead and set one up 📝
              </p>
              <Link to="/create-profile">
                <Button variant="info" className="btn-md font-weight-bold">
                  <i className="fas fa-fingerprint"></i> Create Profile
                </Button>
              </Link>
            </div>
          </>
        )}
      </Container>
    );
  }
}

export default Dashboard;
