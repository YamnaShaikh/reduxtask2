import React from "react";
import { Table } from "react-bootstrap";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { computeHeadingLevel } from "@testing-library/react";
import { deleteUser, editUser } from "./UserAction";
import { useNavigate } from "react-router-dom";

const UserRecords = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  debugger;
  const users = userList.users;

  const deleteRecord = (id) => {
    // debugger;
    navigate(`/users/${id}`);
    dispatch(deleteUser(id));
    navigate("/userRecords");
  };

  const EditRecord = (id) => {
    debugger;
    dispatch(editUser(id));
    navigate(`/`);
  };

  return (
    <>
      <div className="container">
        <Table striped bordered hover variant="primary">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">
                Education
                <Table striped size="sm">
                  <thead>
                    <tr>
                      <th>School</th>
                      <th>Degree</th>
                      <th>Year</th>
                    </tr>
                  </thead>
                </Table>
              </th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {console.log("usersdata", users)}
            {users.map((user) => {
              {
                /* debugger; */
              }

              return (
                <>
                  {console.log(user)}
                  <tr className="table-light">
                    <td>{user["personalInfo"].firstName}</td>
                    <td>{user["personalInfo"].lastName}</td>
                    <td>{user["personalInfo"].email}</td>
                    <td>{user["personalInfo"].phone}</td>
                    <td style={{ padding: "2px" }}>
                      <Table striped size="sm">
                        <tbody>
                          {user.education.map((education) => {
                            return (
                              <tr>
                                <td>{education.school}</td>
                                <td>{education.degree}</td>
                                <td>{education.year}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </td>

                    <td>
                      <button type="button" onClick={() => EditRecord(user.id)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteRecord(user.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UserRecords;
