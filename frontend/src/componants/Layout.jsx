import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React from "react";
import Footer from './Footer'
import './layout-main-div'

const Layout = () => {

  return (
    <div className="layout-main-div">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
