import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function DashboardActions() {
  return (
    <div className="mt-2 d-flex flex-row justify-content-start align-items-center">
      <Button as={Link} to="/edit-profile" className="mr-1 btn-light text-info">
        <i className="d-none d-md-inline fas fa-edit"></i> Edit Profile
      </Button>
      <Button
        as={Link}
        to="/add-experience"
        className="mr-1 btn-light text-info"
      >
        <i className="d-none d-md-inline fas fa-briefcase"></i> Add Experience
      </Button>
      <Button as={Link} to="/add-education" className="btn-light text-info">
        <i className="d-none d-md-inline fas fa-book-open"></i> Add Education
      </Button>
    </div>
  );
}

export default DashboardActions;
