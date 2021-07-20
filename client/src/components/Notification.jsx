import React from "react";
import { Alert } from "react-bootstrap";

function Notification({ alert }) {
  const { msg, type } = alert;
  return (
    <>
      <div className="d-flex justify-content-center">
        <div
          className="text-center"
          style={{ position: "fixed", top: 100, width: "90vw", zIndex: 9999 }}
        >
          <Alert variant={type} className="pb-0">
            <Alert.Heading>{msg}</Alert.Heading>
          </Alert>
        </div>
      </div>
    </>
  );
}

export default Notification;
