import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import { NavLink, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Footer() {

  const navigate = useNavigate()

  return (
    <MDBFooter className='text-center' style={{ backgroundColor: '#f8f5fc' }}>
      <MDBContainer>
        <section>
          <MDBBtn
            rippleColor="light"
            color='link'
            floating
            size="lg"
            className='text-light'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='text-dark fab fa-facebook-f' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='text-dark fa-twitter' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='text-dark fa-google' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='text-dark fa-instagram' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='text-dark fa-linkedin' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='text-dark fa-github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div style={{ backgroundColor: 'black', color: "white", padding: "10px", fontSize: "14px" }}>
        © 2020 Copyright:
        <span onClick={()=>{ navigate("/adminLogin") }}>AdminVerse</span>
      </div>
    </MDBFooter>
  );
}