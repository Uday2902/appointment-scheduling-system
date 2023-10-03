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
    console.log("Props",props)
    // let data = props.value;
    const {data, deleteAppointment} = props;
    console.log(data,"dataaaa")
    const handleEvent = async (id) => {
        // const dataToSend = {
        //     id: id
        // }
        // await axios.post('./appointment/delete', dataToSend)
        //     .then((response) => {
        //         console.log("Deleted")
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })


        // let newdata = data.filter((item) => {
        //     return item.id !== id; // Use !== for comparison
        // });

        // setData(newdata);
    }

    useEffect(() => {
        // Your async code here (if needed)
    }, []);

    return (
        <section className="gradient-custom-2 vh-100">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="d-flex justify-content-center align-items-center">
                    <MDBCol md="12" xl="10">
                        <MDBCard>
                            <MDBCardHeader className="p-3">
                                <h5 className="mb-0">
                                    <MDBIcon fas icon="tasks" className="me-2" />
                                    Today's Appointments List
                                </h5>
                            </MDBCardHeader>
                            {/* <MDBScrollbar style={{ position: "relative", height: "400px" }}> */}
                            <MDBCardBody>
                                <MDBTable className="mb-0">
                                    <MDBTableHead>
                                        <tr>
                                            <th scope="col">Patients' Names</th>
                                            <th scope="col">Issue</th>
                                            <th scope="col">Time Slot</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {data.map((items) => (
                                            <tr key={items._id}>
                                                <th>
                                                    {/* {
                                                        await axios.get(`patient/${items.patient}`)
                                                        .then((response) => {
                                                            console.log(response.data.patientName)
                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                        })
                                                    } */}
                                                    {/* Display patient name */}
                                                    <span className="ms-2">{items.patient.name}</span>
                                                </th>
                                                <td className="align-middle">
                                                    {/* Display issue */}
                                                    <span>{items.issue ? items.issue : "No issue provided"}</span>
                                                </td>
                                                <td className="align-middle">
                                                    <h6 className="mb-0">
                                                        <MDBBadge className="mx-2" color="danger">
                                                            {items.slot}
                                                        </MDBBadge>
                                                    </h6>
                                                </td>
                                                <td className="align-middle">
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
                                                        icon="trash-alt"
                                                        color="danger"
                                                        size="lg"
                                                        className="me-3"
                                                        // Add an onClick event handler for this action
                                                        // onClick={() => handleEvent(items._id)}
                                                        onClick={() => deleteAppointment(items._id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </MDBTableBody>
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
