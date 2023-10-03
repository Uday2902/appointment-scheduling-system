import React, { useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { Vortex } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";


export default function PatientRegistration() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const genderOptions = ["Male", "Female", "Other"];
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    weight: "",
    height:"",
    gender: "",
    disability: false
});

  const [errors, setErrors] = useState({
    name: { state: false, para: { maxLength: 50, minLength: 1 } },
    age: { state: false, para: { maxLength: 50, minLength: 1 } },
    phoneNumber: { state: false, para: { maxLength: 15, minLength: 10 } },
    weight: { state: false, para: { maxLength: 50, minLength: 1 } },
    height: { state: false, para: { maxLength: 50, minLength: 1 } },
    email: {
      state: false,
      errMsg: '',
      para: {
        maxLength: 500,
        minLength: 3,
        match:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    },
    // birthDate: {
    //   state: false,
    //   para: {
    //     maxLength: null,
    //     minLength: null,
    //     minDate: new Date().toJSON().slice(0, 10),
    //   },
    // },
    // completionYear: {
    //   state: false,
    //   para: { maxLength: null, minLength: null },
    // },
    gender: { state: false, para: { maxLength: null, minLength: null } },
    password: {
      state: false,
      para: {
        maxLength: 50,
        minLength: 6,
        match: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{6,}$/,
      },
    },
    confirmPassword: { state: false, para: { maxLength: 50, minLength: 6 } },
  });

  const unsetErrors = (event) => {
    let key = event.target.name;
    // //console.log(key)
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    //console.log("Inside the validate form")
    // Trim all form field values
    setIsLoading(true);
    const trimmedFormData = {};
    for (const key in formData) {
      if(key!=="disability")
      trimmedFormData[key] = formData[key].trim();
    }
    setFormData(trimmedFormData);

    // Validate each field
    const updatedErrors = { ...errors };
    for (const key in updatedErrors) {
      const value = trimmedFormData[key];
      const para = updatedErrors[key].para;
      if (value === "" || value === null || value === undefined) {
        updatedErrors[key].state = true;
      } else if (
        para.minLength !== null &&
        (value.length < para.minLength || value.length > para.maxLength)
      ) {
        updatedErrors[key].state = true;
      } else if (para.match && !value.match(para.match)) {
        updatedErrors[key].state = true;
      } else {
        updatedErrors[key].state = false;
      }
    }
    setIsLoading(false);
    setErrors(updatedErrors);
  };

  const sendDataToBackend = async () => {
    console.log("entered")
    setIsLoading(true);
    if (!errors.password.state && !errors.confirmPassword.state) {
      if (formData.password === formData.confirmPassword) {
        let totalValidInputs = 0;
        for (const key in errors) {
            if (!errors[key].state) {
                totalValidInputs++;
          }
        }
        console.log(totalValidInputs,Object.keys(errors).length)

        if (totalValidInputs === Object.keys(errors).length) {
            console.log("total",formData)
          let dataToSend = formData;

          delete dataToSend["confirmPassword"];

          console.log(dataToSend);

          await axios
            .post("http://127.0.0.1:5000/patient/registration", dataToSend)
            .then((response) => {
              console.log(dataToSend);
              setIsLoading(false);
              navigate('/');
            })
            .catch((error) => {
              setIsLoading(false)
              console.log("Error during registration", error);
              console.log(error.response);
              if (error.response.data.msg === "duplicate email") {
                setErrors((prevData) => {
                  return {
                    ...prevData,
                    email: {
                      ...prevData.email,
                      state: true,
                      errMsg: "User with this email already exists",
                    },
                  };
                });
              }
            });
        }
      } else {
        setIsLoading(false);
        setErrors((prevData) => {
          return {
            ...prevData,
            confirmPassword: {
              ...prevData.confirmPassword,
              state: true,
            },
          };
        });
      }
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    await validateForm();
    await sendDataToBackend();
  };

  return (
    <form onSubmit={handleRegister} className="registration-form">
      {/* Participant registration form fields */}
      <MDBInput
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.name.state ? <div className="error-message" >Please provide Name</div> : null}
      <MDBInput
        label="Phone Number"
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
        {errors.phoneNumber.state ? <div className="error-message" >Please provide Phone Number</div> : null}
      <MDBInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.email.state ? (
        errors.email.errMsg !== "" ? (
          <div className="error-message">{errors.email.errMsg}</div>
        ) : (
          <div className="error-message" >Please provide a valid email</div>
        )
      ) : null}
      <MDBInput
      label="Password"
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="mt-4"
      onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.password.state ? <div className="error-message" >Please provide a valid password(Atleat 6 character including[numbers, lower and upper case letters and special characters])</div> : null}
      
      <MDBInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.confirmPassword.state ? (
          <div className="error-message" >Please confirm your password</div>
        ) : null}
      <MDBInput
        label="Age"
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.age.state ? <div className="error-message" >Please provide Age</div> : null}
      <MDBInput
        label="Weight"
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {/* {errors.weight.state ? (
        <div className="error-message" >Please provide your weight</div>
      ) : null} */}
      <MDBInput
        label="Height"
        type="number"
        name="height"
        value={formData.height}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {/* {errors.height.state ? (
        <div className="error-message" >Please provide your height</div>
      ) : null}
       */}
      {/* <MDBInput
        label="Gender"
        type="text"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="mt-4"
      /> */}

      <select
        name="gender"
        onChange={handleChange}
        value={formData.gender}
        className="mt-4 form-gender"
        onFocusCapture={(event) => {unsetErrors(event)}}
        required
      >
        <option value="" disabled>
          Select Gender
        </option>
        {genderOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors.gender.state ? <div className="error-message" >Please select your gender</div> : null}
      <div>
        <label >Disability:</label>
      <span className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
  <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
</span>

<span className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" defaultChecked/>
  <label className="form-check-label" htmlFor="inlineRadio2">No</label>
</span>
</div>

      {/* <MDBInput
        label="Birth Date"
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.birthDate.state ? (
        <div className="error-message" >Please provide your birth date</div>
      ) : null}
      <MDBInput
        label="Completion Year"
        type="text"
        name="completionYear"
        value={formData.completionYear}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.completionYear.state ? (
          <div className="error-message" >Please provide your college completion year</div>
        ) : null} */}
      
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
            "Sign Up as Participant"
          )}
      </MDBBtn>
    </form>
  );
}