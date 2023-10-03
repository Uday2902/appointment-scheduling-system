import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import AppointmentList from "./AppointmentList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Calendar(props) {

  const navigate = useNavigate()

  function compareDates(dateStr1, dateStr2) {
    const [day1, month1, year1] = dateStr1.split('-').map(Number);
    const [day2, month2, year2] = dateStr2.split('-').map(Number);
    const date1 = new Date(year1, month1 - 1, day1);
    const date2 = new Date(year2, month2 - 1, day2);
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  }

  const [initialDate, setInitialDate] = useState(new Date());

  // const [appointments, setAppointments] = useState([ { "_id": "650ed4e964690ecaca319852", "patient": "650ecd51cfef35880cc3c251", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "24-09-2023 8pm", "issue": "", "prescription": "", "tokenNo": "", "createdAt": "2023-09-23T12:07:05.515Z", "updatedAt": "2023-09-23T12:07:05.515Z", "__v": 0 }, { "_id": "650ed5ac64690ecaca319854", "patient": "650ecd8fcfef35880cc3c253", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "11-09-2023 11am", "issue": "", "prescription": "", "tokenNo": "", "createdAt": "2023-09-23T12:10:20.355Z", "updatedAt": "2023-09-23T12:10:20.355Z", "__v": 0 }, { "_id": "650ed5cf64690ecaca319856", "patient": "650ecdb7cfef35880cc3c255", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "12-09-2023 1pm", "issue": "", "prescription": "", "tokenNo": "", "createdAt": "2023-09-23T12:10:55.179Z", "updatedAt": "2023-09-23T12:10:55.179Z", "__v": 0 }, { "_id": "650ed5e364690ecaca319858", "patient": "650ecdc1cfef35880cc3c257", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "13-09-2023 5pm", "issue": "", "prescription": "", "tokenNo": "", "createdAt": "2023-09-23T12:11:15.217Z", "updatedAt": "2023-09-23T12:11:15.217Z", "__v": 0 }, { "_id": "650ed5fd64690ecaca31985a", "patient": "650ecdcfcfef35880cc3c259", "doctor": "650ecb4ebb66c7668bd7e4fc", "slot": "13-09-2023 1pm", "issue": "", "prescription": "", "tokenNo": "", "createdAt": "2023-09-23T12:11:41.111Z", "updatedAt": "2023-09-23T12:11:41.111Z", "__v": 0 } ]);
  const [appointments, setAppointments] = useState([]);

  const deleteAppointment = async (appointmentID) => {
    // const updatedAppointments = appointments.filter((appointment) => appointment._id !== appointmentId);
    // setAppointments(updatedAppointments);

    await axios.post("http://127.0.0.1:5000/appointment/cancel", {appointmentID})
    window.location.reload()
  }

  useEffect(() => {
    // Fetch appointments from the API here and set them using setAppointments
    // Example:
    let tokenOwner = "";
    let dataToSend = {id: "", type: ""};

    const patientID = localStorage.getItem("unity-patient-id");
    const doctorID = localStorage.getItem("unity-doctor-id");

    if (patientID || doctorID) {

      if (patientID) {
        dataToSend["id"] = patientID
        dataToSend["type"] = "patient";
        tokenOwner = "patient";
      } else {
        dataToSend["id"] = doctorID
        dataToSend["type"] = "doctor";
        tokenOwner = "doctor";
      }
    }
    else
    {
      navigate('/')
    }

    axios.post(`http://127.0.0.1:5000/appointment/list`, dataToSend)
      .then((response) => {
        console.log(response)
        setAppointments(response.data.appointments);
      })
      .catch((err) => {
        console.log(err, "Some error occurred");
      });
  }, [initialDate, props.userType]);

  const today = new Date();
  const todayDate = formatDate(today);
  const todaySelectedDate = dayjs(initialDate).format('DD-MM-YYYY');

  console.log(todaySelectedDate,"initialdate")
  
  let filteredAppointments = appointments.filter((item) => {
    const slot = item.slot?.split(' ')[0].toString();
    return slot && compareDates(slot, todaySelectedDate) === 0;
  });
  console.log(filteredAppointments,"filter")
  
  const handleChange = (e) => {
    console.log("target",e)
    setInitialDate(e.$d);
    // let x = dayjs(e).format('DD-MM-YYYY')
    // filteredAppointments = appointments.filter((item) => {
    //   const slot = item.slot?.split(' ')[0]?.toString();
    //   return slot && compareDates(slot, todaySelectedDate) === 0;
    // });
  }

  return (
    <>
    {console.log(initialDate)}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar"]}>
          <DateCalendar
            onChange={(newDate) => {
              handleChange(newDate);
            }}
            referenceDate={dayjs(initialDate)}
            views={["year", "month", "day"]}
          />
        </DemoContainer>
      </LocalizationProvider>
      {console.log("calling")}
      <AppointmentList data={filteredAppointments} deleteAppointment={deleteAppointment} />
    </>
  );
}


  