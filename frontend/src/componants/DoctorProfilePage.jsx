import Loading from "./Loading";
import { useState, useEffect } from "react";
import React from 'react';
import axios from "axios";
import "./admin-profile-page.css"
import TodayAppointmentList from "./TodayAppointmentList";
import dayjs from "dayjs";

import {
  MDBBadge,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBScrollbar,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
} from "mdb-react-ui-kit";


export default function DoctorProfilePage() {

  const [isLoading, setIsLoading] = useState(true);
  const [appointmentsList, setAppointmentList] = useState([]);
  const [doctor, setDoctor] = useState([]);

  const id = localStorage.getItem("unity-doctor-id")

  useEffect(() => {
    
    const fetchData = async () => {

      const response = await axios.post("http://localhost:5000/appointment/list", {id,type:"doctor"})
      const responseDoctor = await axios.get(`http://localhost:5000/doctor/${id}`)

      console.log(responseDoctor)
      setAppointmentList(response.data.appointments)
      setDoctor(responseDoctor.data.doctor)
    } 

    fetchData()

    setIsLoading(false);

  }, []);
  
  
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

  const today = new Date();
  const todayDate = formatDate(today);
  const todaySelectedDate = dayjs(today).format('DD-MM-YYYY');

  let filteredAppointments = appointmentsList.filter((item) => {
    const slot = item.slot?.split(' ')[0].toString();
    return slot && compareDates(slot, todaySelectedDate) === 0;
  });


  
  let element = filteredAppointments.map((items) => {

    return (
      <tr key={items._id}>
        <th>
          {/* Display patient name */}
          <span className='ms-2'>{items.patient.name}</span>
        </th>
        <td className='align-middle'>
          {/* Display issue */}
          <span>{items.issue?items.issue:"not provided"}</span>
        </td>
        <td className='align-middle'>
          <h6 className='mb-0'>
            <MDBBadge className='mx-2' color='danger'>
              {items.slot}
            </MDBBadge>
          </h6>
        </td>
        <td className='align-middle'>
          {/* <MDBIcon
                      fas
                      icon="check"
                      color="success"
                      size="lg"
                      className="me-3"
                      // Add an onClick event handler for this action
                      onClick={() => handleEvent(items.id)}
                  /> */}
          <MDBIcon
            fas
            icon='trash-alt'
            color='danger'
            size='lg'
            className='me-3'
            // Add an onClick event handler for this action
            // onClick={() => handleEvent(items._id)}
          />
        </td>
      </tr>
    );
  });


  return (
    
    <div className="admin-container">

      <div className="admin-details">

        <h2 className="title">Doctor Profile</h2>

        <div className="detail-line" style={{padding: "10px", margin: "5px"}}>
            <p className="detail label" style={{padding: 0, margin: 0}}>First Name</p>
            <p className="detail" style={{padding: 0, margin: 0}}>{doctor.name}</p>
        </div>

        <div className="detail-line" style={{padding: "10px", margin: "5px"}}>
            <p className="detail label" style={{padding: 0, margin: 0}}>Email</p>
            <p className="detail" style={{padding: 0, margin: 0}}>{doctor.email}</p>
        </div>
        
        <div className="detail-line" style={{padding: "10px", margin: "5px"}}>
            <p className="detail label" style={{padding: 0, margin: 0}}>Phone Number</p>
            <p className="detail" style={{padding: 0, margin: 0}}>{doctor.phoneNumber}</p>
        </div>
        
        <div className="detail-line" style={{padding: "10px", margin: "5px"}}>
            <p className="detail label" style={{padding: 0, margin: 0}}>Age</p>
            <p className="detail" style={{padding: 0, margin: 0}}>{doctor.age}</p>
        </div>

        <div className="detail-line" style={{padding: "10px", margin: "5px"}}>
            <p className="detail label" style={{padding: 0, margin: 0}}>Speciality</p>
            <p className="detail" style={{padding: 0, margin: 0}}>{doctor.speciality}</p>
        </div>

        <div className="detail-line" style={{padding: "10px", margin: "5px"}}>
            <p className="detail label" style={{padding: 0, margin: 0}}>Venue</p>
            <p className="detail" style={{padding: 0, margin: 0}}>{doctor.venue}</p>
        </div>

      </div>

      <div className="admin-list">

        <TodayAppointmentList value = { element }/>

      </div>

    </div>

  );
}