import Loading from "./Loading";
import { useState, useEffect } from "react";
import React from 'react';
import axios from "axios";
import "./admin-profile-page.css"
import DoctorsListCard from "./DoctorsListCard";
import TodayAppointmentList from "./TodayAppointmentList";


export default function AdminProfilePage() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    
    setIsAdmin( () => {

        return (
          {
            name: "Admin",
            email: "admin@admin.com",
            phoneNo: "9999009999"
          }
        )
      }
    );

    setIsLoading(false);

    const fetchData = async () => {

      // const data = await axios.get("/doctor/list")   

      setDoctors((p)=>{})
    } 

    fetchData()

  }, []);

  return (
    
    <div className="admin-container">

      <div className="admin-details">

      <h2 className="title">Admin Profile</h2>

        <div className="detail-line" style={{padding: "10px", margin: "5px"}}>
            <p className="detail label" style={{padding: 0, margin: 0}}>First Name</p>
            <p className="detail" style={{padding: 0, margin: 0}}>Urvish Patel</p>
        </div>

        <div className="detail-line" style={{padding: "10px", margin: "5px"}}>
            <p className="detail label" style={{padding: 0, margin: 0}}>Phone Number</p>
            <p className="detail" style={{padding: 0, margin: 0}}>8849906066</p>
        </div>

        
      </div>

      <div className="admin-list">

        <TodayAppointmentList />

      </div>

    </div>

  );
}