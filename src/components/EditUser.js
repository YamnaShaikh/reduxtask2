import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "./UserAction";
import { useNavigate } from "react-router-dom";

const admissionSchema = Yup.object().shape({
  personalInfo: Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
  }),
  education: Yup.array().of(
    Yup.object().shape({
      school: Yup.string().required("School name is required"),
      degree: Yup.string().required("Degree name is required"),
      year: Yup.number().required("Year of completion is required"),
    })
  ),
});

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   const userList = useSelector((state) => state.userList);
//   const users = userList.users;
  const editUser = useSelector((state) => state.userList.editUser);

  console.log('User data' , editUser)
  debugger;
  let initialValues = null

  if(editUser != undefined){
    debugger
   initialValues = {
    id: editUser[0].id,
    personalInfo: {
      firstName: editUser[0].personalInfo.firstName,
      lastName: editUser[0].personalInfo.lastName,
      email: editUser[0].personalInfo.email,
      phone: editUser[0].personalInfo.phone,
    },
    education: editUser[0].education
  };
}
else {
  initialValues = {
    id: Date.now(),
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    education: [{ school: "", degree: "", year: "" }],
  };
}

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    debugger;
    dispatch(updateUser(values));
    navigate("/userRecords");
    alert("Successfully Submitted");
    resetForm();
  };

  return (
    <div className="container">
      
        <Formik
          initialValues={initialValues}
          validationSchema={admissionSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values }) => (
            <Form>
              <div className="container">
                <div className="formField">
                  <Field
                    type="text"
                    id="firstName"
                    name="personalInfo.firstName"
                    placeholder="Enter First Name"
                  />
                  <ErrorMessage name="personalInfo.firstName" component="div" />
                </div>
                <div className="formField">
                  <Field
                    type="text"
                    id="lastName"
                    name="personalInfo.lastName"
                    placeholder="Enter Last Name"
                  />
                  <ErrorMessage name="personalInfo.lastName" component="div" />
                </div>
                <div className="formField">
                  <Field
                    type="email"
                    id="email"
                    name="personalInfo.email"
                    placeholder="Enter Email"
                  />
                  <ErrorMessage name="personalInfo.email" component="div" />
                </div>
                <div className="formField">
                  <Field
                    type="text"
                    id="phone"
                    name="personalInfo.phone"
                    placeholder="Enter Phone#"
                  />
                  <ErrorMessage name="personalInfo.phone" component="div" />
                </div>
              </div>
              <div className="formField">
                <h2>Education Information</h2>
                <FieldArray name="education">
                  {({ push, remove }) => (
                    <div className="formContainer">
                      {values.education.map((_, index) => (
                        <div key={index} className="sform">
                          <div className="formField">
                            <Field
                              type="text"
                              id={`education[${index}].school`}
                              name={`education[${index}].school`}
                              placeholder="Enter School Name"
                            />
                            <ErrorMessage
                              name={`education[${index}].school`}
                              component="div"
                            />
                          </div>
                          <div className="formField">
                            <Field
                              type="text"
                              id={`education[${index}].degree`}
                              name={`education[${index}].degree`}
                              placeholder="Enter Degree Title"
                            />
                            <ErrorMessage
                              name={`education[${index}].degree`}
                              component="div"
                            />
                          </div>
                          <div className="formField">
                            <Field
                              type="text"
                              id={`education[${index}].year`}
                              name={`education[${index}].year`}
                              placeholder="Enter Passing Year"
                            />
                            <ErrorMessage
                              name={`education[${index}].year`}
                              component="div"
                            />
                          </div>
                          <button type="button" onClick={() => remove(index)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      ))}
                      <div className="formField">
                        <button
                          type="button"
                          onClick={() =>
                            push({ school: "", degree: "", year: "" })
                          }
                        >
                          Add Education
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="formContainer">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          )}
        </Formik>
      
    </div>
  );
};

export default EditUser;
