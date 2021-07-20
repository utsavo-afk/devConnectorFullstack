import React from "react";
import { Button, Card } from "react-bootstrap";

function RepoItem({ repo }) {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title className="font-weight-bold text-muted">
          <div className="d-flex justify-content-between align-items-center">
            <p>{repo.name.toUpperCase()}</p>
            <div className="d-flex">
              <div className="mr-1">
                <p>
                  <i className="far fa-eye fa-lg text-danger"></i>
                  <span className="text-muted" style={{ fontSize: "25px" }}>
                    {repo.watchers_count}
                  </span>
                </p>
              </div>
              <div className="mr-1">
                <p>
                  <i className="fas fa-star fa-lg text-warning"></i>
                  <span className="text-muted" style={{ fontSize: "25px" }}>
                    {repo.stargazers_count}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <i className="fas fa-network-wired fa-lg text-primary"></i>
                  <span className="text-muted" style={{ fontSize: "25px" }}>
                    {repo.forks_count}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Card.Title>
        <hr />
        <p className="lead">
          {repo.description || "No description available for this repository"}
        </p>
        <Button className="btn-info">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-light"
          >
            View Code
          </a>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RepoItem;
