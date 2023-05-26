import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
//import "../App.css"
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

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const users = userList.users;
  const editUser = useSelector((state) => state.userList.editUser);
  console.log("User data", editUser);
  debugger;
  let initialValues = null;

  if (editUser != undefined) {
    debugger;
    initialValues = {
      id: editUser[0].id,
      personalInfo: {
        firstName: editUser[0].personalInfo.firstName,
        lastName: editUser[0].personalInfo.lastName,
        email: editUser[0].personalInfo.email,
        phone: editUser[0].personalInfo.phone,
      },
      education: editUser[0].education,
    };
  } else {
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
    if(editUser != undefined){
      dispatch(updateUser(values));
      navigate("/userRecords");
      alert("Successfully Updated");
    }
    else{
    //debugger;
    dispatch(createUser(values));
    navigate("/userRecords");
    alert("Successfully Submitted");
    }
    resetForm();
  };

  return (
    <div className="container">
        <div className="formcontainer">
      <Formik
        initialValues={initialValues}
        validationSchema={admissionSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values }) => (
          <Form>
            <div className="personalInfo">
              <div className="formField">
                <Field
                  className="inputfield"
                  type="text"
                  id="firstName"
                  name="personalInfo.firstName"
                  placeholder="Enter First Name"
                />
                <ErrorMessage name="personalInfo.firstName" component="div" className="errorMsg" />
              </div>
              <div className="formField">
                <Field
                  className="inputfield"
                  type="text"
                  id="lastName"
                  name="personalInfo.lastName"
                  placeholder="Enter Last Name"
                />
                <ErrorMessage className="errorMsg" name="personalInfo.lastName" component="div" />
              </div>
              <div className="formField">
                <Field
                  className="inputfield"
                  type="email"
                  id="email"
                  name="personalInfo.email"
                  placeholder="Enter Email"
                />
                <ErrorMessage className="errorMsg" name="personalInfo.email" component="div" />
              </div>
              <div className="formField">
                <Field
                  className="inputfield"
                  type="text"
                  id="phone"
                  name="personalInfo.phone"
                  placeholder="Enter Phone#"
                />
                <ErrorMessage className="errorMsg" name="personalInfo.phone" component="div" />
              </div>
            </div>
            <div className="edicationform">
              <div className="formHeading">
                <h2 style={{textAlign:'left'}}>Education Information</h2>
              </div>
              <FieldArray name="education">
                {({ push, remove }) => (
                  <div className="fieldarea">
                    {values.education.map((_, index) => (
                      <div key={index} className="sform">
                        <div className="formField">
                          <Field
                            className="inputfield"
                            type="text"
                            id={`education[${index}].school`}
                            name={`education[${index}].school`}
                            placeholder="Enter School Name"
                          />
                          <ErrorMessage className="errorMsg"
                            name={`education[${index}].school`}
                            component="div"
                          />
                        </div>
                        <div className="formField">
                          <Field
                            className="inputfield"
                            type="text"
                            id={`education[${index}].degree`}
                            name={`education[${index}].degree`}
                            placeholder="Enter Degree Title"
                          />
                          <ErrorMessage className="errorMsg"
                            name={`education[${index}].degree`}
                            component="div"
                          />
                        </div>
                        <div className="formField">
                          <Field
                            className="inputfield"
                            type="text"
                            id={`education[${index}].year`}
                            name={`education[${index}].year`}
                            placeholder="Enter Passing Year"
                          />
                          <ErrorMessage className="errorMsg"
                            name={`education[${index}].year`}
                            component="div"
                          />
                        </div>
                        <Button type="button" onClick={() => remove(index)}>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                      </div>
                    ))}
                    <div className="buttonField">
                      <Button
                        type="button"
                        onClick={() =>
                          push({ school: "", degree: "", year: "" })
                        }
                      >
                        Add Education
                      </Button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </div>
            <div className="button">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </div>

  );
};

export default AddUser;
