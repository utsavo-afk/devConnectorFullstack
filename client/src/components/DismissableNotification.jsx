import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { dismissNotification } from "../reducers/alertReducer";

function DismissableNotification({ alert }) {
  const { msg, type } = alert;
  const dispatch = useDispatch();

  return (
    <>
      <div className="d-flex justify-content-center">
        <div
          className="text-center"
          style={{ position: "fixed", top: 100, width: "90vw", zIndex: 9999 }}
        >
          <Alert
            variant={type}
            className="pb-0"
            onClick={() => {
              dispatch(dismissNotification());
            }}
          >
            <div className="d-flex justify-content-between align-items-baseline">
              <Alert.Heading className="text-center">{msg}</Alert.Heading>
              <i className="far fa-times-circle fa-2x"></i>
            </div>
          </Alert>
        </div>
      </div>
    </>
  );
}

export default DismissableNotification;
