import React from "react";
import { Outlet } from "react-router-dom";

import '../styles/Layout.css';
import Footer from "./Footer";

function Layout() {
  
    return (
      <div>
        <Outlet />
        <Footer />
      </div>
    );
  }

  export default Layout;
  