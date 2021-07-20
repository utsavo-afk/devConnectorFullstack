import Moment from "react-moment";
import { Button, Jumbotron, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { notifyAndClear, notifyAndPersist } from "../reducers/alertReducer";
import { updateProfile } from "../reducers/profileReducer";

function EducationList({ education }) {
  const dispatch = useDispatch();

  const deleteEdu = async (id) => {
    try {
      education = education.filter((edu) => (edu._id === id ? null : edu));
      await dispatch(updateProfile({ education: education }));
      dispatch(notifyAndClear("Experience Updated", "success", 3));
    } catch (error) {
      dispatch(notifyAndPersist("" + error, "danger"));
    }
  };

  return (
    <div className="mt-3">
      <Jumbotron className="bg-light pb-0 pt-2 pl-2 pr-2">
        <h3>My Education</h3>
        <Table striped className="mt-3" responsive>
          <thead>
            <tr className="text-center">
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {education.map((edu) => (
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
                <td>
                  <Button
                    onClick={() => deleteEdu(edu._id)}
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

export default EducationList;
