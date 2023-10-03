import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import PatientProfilePage from './PatientProfilePage';
import "./dashboard.css"

function AdminDashboard() {

  

  const navigate = useNavigate()

  return (
    <div>
        <div className='dashboard-navigation'>
          <MDBBtn onClick={()=>{ navigate("/calendar") }} style={{background: "#471e75", margin:0, fontWeight: 600}} block>Calendar</MDBBtn>
          <MDBBtn onClick={()=>{ navigate("/") }} style={{background: "#471e75", margin: 0, fontWeight: 600}} block>Home</MDBBtn>
      </div>
      <PatientProfilePage/>
    </div>
  )
}

export default AdminDashboard;
