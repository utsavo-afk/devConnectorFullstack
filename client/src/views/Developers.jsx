import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  checkCacheAndSetAuth,
  checkIsTokenExpired,
} from "../reducers/authReducer";
import { getAllProfiles } from "../reducers/profileReducer";
import { isEmpty } from "lodash";
import { notifyAndPersist } from "../reducers/alertReducer";
import ProfileCard from "../components/ProfileCard";

function Developers() {
  const dispatch = useDispatch();
  const history = useHistory();
  const profiles = useSelector((state) => state.profiles.allProfiles);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(checkCacheAndSetAuth());
    async function getAll() {
      try {
        await dispatch(getAllProfiles());
      } catch (error) {
        dispatch(notifyAndPersist("" + error, "danger"));
        setIsLoading(false);
      }
    }
    if (isEmpty(profiles)) {
      getAll();
    }
  }, [dispatch, profiles]);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      console.log("checked");
      dispatch(checkIsTokenExpired(history));
    }
  }, [dispatch, history]);

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-baseline">
        <h2 className="font-weight-bolder text-info">Developers</h2>
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
      {isEmpty(profiles) && (
        <div className="mr-1 text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}

      {!isEmpty(profiles) && (
        <>
          <p className="lead">Browse and Connect with the Community</p>
          <div className="mt-5">
            {profiles.map((p) => (
              <ProfileCard key={p.id} profile={p} />
            ))}
          </div>
        </>
      )}
      {!isLoading && (
        <p className="text-muted text-center">
          There are no profiles to showcase currently.
        </p>
      )}
    </Container>
  );
}

export default Developers;
