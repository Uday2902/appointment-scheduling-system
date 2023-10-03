import React, { useState } from "react";
import PatientRegistration from "./PatientRegistration";
import DoctorRegistration from "./DoctorRegistration";
import DoctorLogin from "./DoctorLogin";
import PatientLogin from "./PatientLogin";
// import Loading from "./Loading";
// import axios from "axios";
import "./form.css";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function MDBForm() {
  const navigate = useNavigate();

  useEffect(() => {
    let tokenOwner = "";
    let dataToSend;
    const patientToken = localStorage.getItem("unity-jwt-patient");
    const doctorToken = localStorage.getItem("unity-jwt-doctor");

    if (patientToken || doctorToken) {
      dataToSend = {
        istoken: true,
        token: "",
        purpose: "verify",
        email: "",
        password: "",
      };

      if (patientToken) {
        dataToSend.token = patientToken;
        tokenOwner = "patient";
      } else {
        dataToSend.token = doctorToken;
        tokenOwner = "doctor";
      }

      const fetchData = async () => {
        try {
          let response = await axios.post(`${tokenOwner}/login`, dataToSend);
        
          if(tokenOwner==="doctor")
          {
            localStorage.setItem("unity-doctor-id", response.data.doctor._id);
          }
          else
          {
            localStorage.setItem("unity-patient-id", response.data.patient._id);
          }
        navigate("/");
        } catch (err) {
          navigate("/");
          console.error("Error fetching user info:", err);
        }
      };

      fetchData();
    } else {
      navigate("/form");
    }
  }, [navigate]);

  const [loginRegisterActive, setLoginRegisterActive] = useState("login");
  const [userType, setUserType] = useState("patient"); // Added userType state

  const handleLoginRegisterClick = (tab) => {
    setLoginRegisterActive(tab);
  };

  const handleUserTypeClick = (type) => {
    setUserType(type);
  };

  return (
    <>
    {/* <div className="form-formDiv"> */}
      <div className="form-allFormsContainer">
        <MDBTabs pills justify className="form-switchContainer">
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleLoginRegisterClick("login")}
              active={loginRegisterActive === "login"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleLoginRegisterClick("register")}
              active={loginRegisterActive === "register"}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent className="form-formInputs">
          <MDBTabsPane show={loginRegisterActive === "login"}>
            <div className="text-center">
              <MDBTabs pills className="form-switchContainer">
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleUserTypeClick("patient")}
                    active={userType === "patient"}
                  >
                    Patient
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleUserTypeClick("doctor")}
                    active={userType === "doctor"}
                  >
                    Doctor
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
            </div>
            {userType === "patient" ? (
              // patient Login Form
              <PatientLogin />
            ) : (
              // doctor Login Form
              <DoctorLogin />
            )}
          </MDBTabsPane>
          <MDBTabsPane show={loginRegisterActive === "register"}>
            <div className="text-center">
              <MDBTabs pills className="form-switchContainer">
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleUserTypeClick("patient")}
                    active={userType === "patient"}
                  >
                    patient
                  </MDBTabsLink>
                </MDBTabsItem>
                {/* <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleUserTypeClick("doctor")}
                      active={userType === "doctor"}
                    >
                      doctor
                    </MDBTabsLink>
                  </MDBTabsItem> */}
              </MDBTabs>
            </div>
            {userType === "patient" ? (
              // patient Registration Form
              <PatientRegistration />
            ) : (
              // doctor Registration Form
              <DoctorRegistration />
            )}
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
      {/* </div> */}
    </>
  );
}
