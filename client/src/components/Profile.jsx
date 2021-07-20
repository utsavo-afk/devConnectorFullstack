import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Image,
  Jumbotron,
  Spinner,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { read } from "../api/profile-api";
import { notifyAndPersist } from "../reducers/alertReducer";
import { checkCacheAndSetAuth } from "../reducers/authReducer";
import { isEmpty } from "lodash";
import Moment from "react-moment";
import { getAllRepos } from "../reducers/profileReducer";
import RepoItem from "./RepoItem";

function Profile({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth);
  const allRepos = useSelector((state) => state.profiles.repos);

  useEffect(() => {
    dispatch(checkCacheAndSetAuth());
    async function getProfile() {
      try {
        let data = await read(match.params.id);
        setProfile(data);
      } catch ({ error }) {
        dispatch(notifyAndPersist("" + error, "danger"));
        setIsLoading(false);
      }
    }
    if (!profile) {
      getProfile();
    }
  }, [dispatch, profile, setIsLoading, match.params.id]);

  useEffect(() => {
    if (profile && profile.githubusername) {
      async function fetchAllRepos() {
        try {
          dispatch(getAllRepos(profile.githubusername));
        } catch (error) {
          dispatch(notifyAndPersist("" + error, "danger"));
          setIsLoadingRepos(false);
        }
      }
      fetchAllRepos();
    }
  }, [profile, dispatch]);

  if (isLoading) {
    return (
      <Container className="mt-3">
        {!profile && (
          <div className="mt-5 text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
        {profile && (
          <>
            <div className="d-flex justify-content-between align-items-baseline">
              <h2 className="font-weight-normal text-info">
                {profile.user.name}'s Profile
              </h2>
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

            <div>
              <Jumbotron className="text-center p-3 bg-info text-light">
                <Image
                  src={profile.user.avatar}
                  roundedCircle
                  className="img-thumbnail"
                />
                <h3 className="font-weight-bold mt-2">{profile.user.name}</h3>
                <p className="lead">
                  {profile.status}{" "}
                  {profile.company && <span>at {profile.company}</span>}
                </p>
                <p>{profile.location && <span>{profile.location}</span>}</p>
                {!isEmpty(profile.social) && (
                  <div>
                    {profile.website && (
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mr-1"
                      >
                        <i className="fas fa-globe fa-lg text-light"></i>
                      </a>
                    )}
                    {profile.social.twitter && (
                      <a
                        href={profile.social.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="mr-1"
                      >
                        <i className="fab fa-twitter fa-lg text-light"></i>
                      </a>
                    )}
                    {profile.social.linkedin && (
                      <a
                        href={profile.social.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="mr-1"
                      >
                        <i className="fab fa-linkedin fa-lg text-light"></i>
                      </a>
                    )}
                    {profile.social.github && (
                      <a
                        href={profile.social.github}
                        target="_blank"
                        rel="noreferrer"
                        className="mr-1"
                      >
                        <i className="fab fa-github fa-lg text-light"></i>
                      </a>
                    )}
                    {profile.social.facebook && (
                      <a
                        href={profile.social.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="mr-1"
                      >
                        <i className="fab fa-facebook fa-lg text-light"></i>
                      </a>
                    )}
                    {profile.social.instagram && (
                      <a
                        href={profile.social.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="mr-1"
                      >
                        <i className="fab fa-instagram fa-lg text-light"></i>
                      </a>
                    )}
                    {profile.social.youtube && (
                      <a
                        href={profile.social.youtube}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-youtube fa-lg text-light"></i>
                      </a>
                    )}
                  </div>
                )}
              </Jumbotron>

              {profile.bio && (
                <div className="bg-light p-2">
                  <h3 className="font-weight-bold">Bio</h3>
                  <hr />
                  <p className="lead">{profile.bio}</p>
                </div>
              )}

              {profile.skills && (
                <div className="bg-light p-2 mt-3">
                  <h3 className="font-weight-bold">Skills</h3>
                  <hr />
                  <p className="lead">
                    {profile.skills.map((s, idx) => (
                      <span className="mr-1" key={idx}>
                        ☑️{s}
                      </span>
                    ))}
                  </p>
                </div>
              )}

              {!isEmpty(profile.exp) && (
                <div className="mt-3">
                  <Jumbotron className="bg-light pb-0 pt-2 pl-2 pr-2">
                    <h3>Experience</h3>
                    <Table striped className="mt-3" responsive>
                      <thead>
                        <tr className="text-center">
                          <th>Company</th>
                          <th>Title</th>
                          <th>Years</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profile.exp.map((exp) => (
                          <tr className="text-center" key={exp._id}>
                            <td>{exp.company}</td>
                            <td>{exp.title}</td>
                            <td>
                              <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
                              {exp.to !== null ? (
                                <Moment format="DD/MM/YYYY">{exp.to}</Moment>
                              ) : (
                                "Present"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Jumbotron>
                </div>
              )}

              {!isEmpty(profile.education) && (
                <div className="mt-3">
                  <Jumbotron className="bg-light pb-0 pt-2 pl-2 pr-2">
                    <h3>Education</h3>
                    <Table striped className="mt-3" responsive>
                      <thead>
                        <tr className="text-center">
                          <th>School</th>
                          <th>Degree</th>
                          <th>Years</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profile.education.map((edu) => (
                          <tr className="text-center" key={edu._id}>
                            <td>{edu.school}</td>
                            <td>{edu.degree}</td>
                            <td>
                              <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
                              {edu.to !== null ? (
                                <Moment format="DD/MM/YYYY">{edu.to}</Moment>
                              ) : (
                                "Present"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Jumbotron>
                </div>
              )}

              {profile.githubusername && isLoadingRepos ? (
                isEmpty(allRepos) ? (
                  <div className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <div>
                    <p className="lead">
                      {profile.user.name.split(" ")[0]}'s Repositories on Github
                    </p>
                    {!isEmpty(allRepos) &&
                      allRepos.map((repo) => (
                        <RepoItem key={repo.id} repo={repo} />
                      ))}
                  </div>
                )
              ) : (
                <p>No github repositories found</p>
              )}

              {isAuthenticated &&
              isAuthenticated.user.id === profile.user.id ? (
                <Button
                  className="mt-3 btn-block btn-secondary font-weight-bold"
                  as={Link}
                  to="/edit-profile"
                >
                  Edit Profile
                </Button>
              ) : null}
            </div>
          </>
        )}
      </Container>
    );
  }

  if (!isLoading) {
    return (
      <p className="mt-5 lead text-muted text-monospace">
        Could not load this users profile, come back later! 💀
      </p>
    );
  }
}

export default Profile;
