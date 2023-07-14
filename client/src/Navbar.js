import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import { ConnectWallet } from "@thirdweb-dev/react";

function Navbar(){
    return(
        <div id="navbar">
            <li><Link className = "navbar-link" to="/marketplace">MarketPlace</Link></li>
            <li><Link className = "navbar-link" to = "/about">About</Link></li>
            <li><Link className = "navbar-link" to = "/verify-ownership">Verify Ownership</Link></li>
            <ConnectWallet/>
        </div>
    )
}

export default Navbar