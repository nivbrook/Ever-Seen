import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {

    const seeList = JSON.parse(localStorage.getItem("seeList"))

  
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper blue">
            <Link
              to="/dashboard"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">movie</i>
              EVER SEEN? - The Movie Tracker
            </Link>
            <Link style={{
              color: "black",
              marginLeft: "20px",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px"
            }}to="/seen">My SEEN List{seeList? "("+seeList.length+")":""}</Link>
          </div>
        </nav>
      </div>
    );

}

export default Navbar;

