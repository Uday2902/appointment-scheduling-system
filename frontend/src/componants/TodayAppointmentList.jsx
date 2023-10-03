import React, { useState, useEffect } from "react";
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
import axios from "axios";

export default function AppointmentList(props) {

    // const handleEvent = async (id) => {
    //   const dataToSend = {
    //     id: id,
    //   };
    //   await axios
    //     .post("./appointment/delete", dataToSend)
    //     .then((response) => {
    //       console.log("Deleted");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    //   let newdata = data.filter((item) => {
    //     return item.id !== id; // Use !== for comparison
    //   });

//   setData(newdata);
    // };

    useEffect(() => {

    }, []);

  return (
    <section className='gradient-custom-2 vh-100' style={{ width: "100%" }}>
      <MDBContainer className='py-5 h-100'>
        <MDBRow className='d-flex justify-content-center align-items-center'>
          <MDBCol md='12' xl='10'>
            <MDBCard>
              <MDBCardHeader className='p-3'>
                <h5 className='mb-0'>
                  <MDBIcon fas icon='tasks' className='me-2' />
                  Today's Appointments List
                </h5>
              </MDBCardHeader>
              {/* <MDBScrollbar style={{ position: "relative", height: "400px" }}> */}
              <MDBCardBody>
                <MDBTable className='mb-0'>
                  <MDBTableHead>
                    <tr>
                      <th scope='col'>Patients' Names</th>
                      <th scope='col'>Issue</th>
                      <th scope='col'>Time Slot</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>{props.value}</MDBTableBody>
                </MDBTable>
              </MDBCardBody>
              {/* </MDBScrollbar> */}
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
