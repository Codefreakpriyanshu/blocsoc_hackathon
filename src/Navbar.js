import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

function Navbar(){
    return(
        <div id="navbar">
            <li><Link to="/marketplace">MarketPlace</Link></li>
            <li><Link to = "/about">About</Link></li>
            <li><Link to = "/verify-ownership">Verify Ownership</Link></li>
        </div>
    )
}

export default Navbar