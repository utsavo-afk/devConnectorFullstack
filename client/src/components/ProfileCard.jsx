import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProfileCard({ profile }) {
  return (
    <Card className="bg-light mt-2">
      <Card.Header className="lead">{profile.user.name}</Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-start align-items-center">
          <img
            src={profile.user.avatar}
            alt=""
            className="d-none d-md-block img-thumbnail mx-5"
          />
          <div className="mx-5">
            <p className="lead">
              👩‍💻 <span className="font-weight-bold">{profile.status}</span>{" "}
              {profile.company && (
                <span>
                  at <span className="font-weight-bold">{profile.company}</span>
                </span>
              )}
            </p>
            <p className="lead">
              📍 {profile.location && <span>{profile.location}</span>}
            </p>
            <p className="text-monospace lead">
              🧰
              {profile.skills &&
                profile.skills.slice(0, 4).map((s, idx) => (
                  <span key={idx} className="mx-1">
                    {s}
                  </span>
                ))}
            </p>
            <Button
              className="btn-md btn-block btn-info"
              as={Link}
              to={`/profiles/${profile.user.id}`}
            >
              View Profile
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
