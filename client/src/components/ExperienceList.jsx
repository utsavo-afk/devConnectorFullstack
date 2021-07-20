import { Button, Jumbotron, Table } from "react-bootstrap";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { notifyAndClear, notifyAndPersist } from "../reducers/alertReducer";
import { updateProfile } from "../reducers/profileReducer";

function ExperienceList({ experience }) {
  const dispatch = useDispatch();

  const deleteExp = async (id) => {
    try {
      experience = experience.filter((exp) => (exp._id === id ? null : exp));
      await dispatch(updateProfile({ exp: experience }));
      dispatch(notifyAndClear("Experience Updated", "success", 3));
    } catch (error) {
      dispatch(notifyAndPersist("" + error, "danger"));
    }
  };

  return (
    <div className="mt-3">
      <Jumbotron className="bg-light pb-0 pt-2 pl-2 pr-2">
        <h3>My Experience</h3>
        <Table striped className="mt-3" responsive>
          <thead>
            <tr className="text-center">
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experience.map((exp) => (
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
                <td>
                  <Button
                    onClick={() => deleteExp(exp._id)}
                    className="btn-sm btn-danger font-weight-bold"
                  >
                    <i className="fa fa-trash text-white-50"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Jumbotron>
    </div>
  );
}

export default ExperienceList;
