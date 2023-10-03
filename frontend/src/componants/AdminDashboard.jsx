import React from 'react'
import DoctorRegistration from './DoctorRegistration';
import { useNavigate } from 'react-router-dom';
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import AdminProfilePage from './AdminProfilePage';
import "./dashboard.css"

function AdminDashboard() {
    console.log("Admin dashboard")

    const navigate = useNavigate()

  return (
    <div>
        <div className='dashboard-navigation'>
          <MDBBtn onClick={() => { navigate('/doctorRegistration') }} style={{background: "#471e75", margin:0, fontWeight: 600}} block>Doctor Registration</MDBBtn>
          <MDBBtn onClick={()=>{ navigate("/calendar") }} style={{background: "#471e75", margin:0, fontWeight: 600}} block>Calendar</MDBBtn>
          <MDBBtn onClick={()=>{ navigate("/") }} style={{background: "#471e75", margin: 0, fontWeight: 600}} block>Home</MDBBtn>
      </div>
      <AdminProfilePage/>
    </div>
  )
}

export default AdminDashboard;
