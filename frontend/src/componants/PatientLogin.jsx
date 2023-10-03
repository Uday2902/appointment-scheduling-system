import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Vortex } from "react-loader-spinner";

export default function MDBPLogin() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    istoken: false,
    token: "",
    purpose: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: {
      state: false,
      errMsg: "",
      para: {
        maxLength: 500,
        minLength: 3,
        match:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    },
    password: {
      state: false,
      errMsg: "",
    },
  });

  const unsetErrors = (event) => {
    let key = event.target.name;
    setErrors((prevData) => {
      return {
        ...prevData,
        [key]: {
          ...prevData[key],
          state: false,
        },
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {

    event.preventDefault();
    setIsLoading(true);
    
    await axios.post("http://127.0.0.1:5000/patient/login", loginData)
      .then((response) => {
        if (response.data.isValid) {
          localStorage.setItem("unity-jwt-patient", response.data.token);
          localStorage.setItem("unity-patient-id", response.data.patient._id);
          setIsLoading(false)
          navigate("/");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setIsLoading(false)
        if (error.response.data.msg === "Email not found") {
          setErrors((prevData) => {
            return {
              ...prevData,
              email: {
                state: true,
                errMsg: "Invalid email",
              },
            };
          });
        } else if (error.response.data.msg === "Password is incorrect") {
          setErrors((prevData) => {
            return {
              ...prevData,
              password: {
                state: true,
                errMsg: "Invalid Password",
              },
            };
          });
        }
      });
  };

  return (
    <>
      <form className="login-form" onSubmit={handleLogin}>
        {" "}
        {/* Apply CSS class for styling */}
        <MDBInput
          label="Email"
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          className="mt-4"
          onFocusCapture={(event) => {
            unsetErrors(event);
          }}
        />
        {errors.email.state ? (
          errors.email.errMsg !== "" ? (
            <div className="error-message">{errors.email.errMsg}</div>
          ) : (
            <div className="error-message">Please provide a valid email</div>
          )
        ) : null}
        <MDBInput
          label="Password"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          className="mt-4"
          onFocusCapture={(event) => {
            unsetErrors(event);
          }}
        />
        {errors.password.state ? (
          errors.password.errMsg !== "" ? (
            <div className="error-message">{errors.password.errMsg}</div>
          ) : (
            <div className="error-message">Please provide the password</div>
          )
        ) : null}
        <MDBBtn type="submit" className="mt-4" block>
          {isLoading ? (
            <Vortex
              visible={true}
              height="30"
              width="30"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={[
                "#ed2690",
                "#000032",
                "#ed2690",
                "#000032",
                "#000032",
                "#ed2690",
              ]}
            />
          ) : (
            "Sign in as Patient"
          )}
        </MDBBtn>
      </form>
    </>
  );
}
