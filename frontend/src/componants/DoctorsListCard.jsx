import React from 'react';
import "./doctor-list-card.css"


export default function DoctorListCard() {


    const doctor = {

        "name": "urvish",
        "phoneNumber": "8849906066",
        "email": "urvish@urvish.com",
        "age": "very young",
        "speciality": "all-rounder",
        "venue": "everywhere"
    }
 
  return (

    <div className='doctor-card-container'>
        
        <p>{doctor.name}</p>
        <p>{doctor.email}</p>
        <p>{doctor.phoneNumber}</p>
        <p>{doctor.age}</p>
        <p>{doctor.speciality}</p>
        <p>{doctor.venue}</p>
        
    </div>

  );
}