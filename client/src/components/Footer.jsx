import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <Container className="mt-5">
      <hr />
      <footer className="text-center">
        <p className="text-muted text-monospace" style={{ fontSize: "12px" }}>
          Did you enjoy DevConnector,{" "}
          <a href="mailto:utsavojha0@gmail.com?subject = Feedback&body = Message">
            Send Feedback
          </a>
          . Check out more projects on my{" "}
          <a
            href="https://github.com/webzth/webzth"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          . 2021 &#169; Utsav Ojha
        </p>
      </footer>
    </Container>
  );
}

export default Footer;
