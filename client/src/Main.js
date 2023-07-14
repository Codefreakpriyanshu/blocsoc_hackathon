import React from "react";
import Navbar from "./Navbar";
import "./styles/Main.css"
import UploadButton from "./UploadButton";

function Main(){
    return(
        <div>
            <Navbar/>
            <div>Marketplace</div>
            <UploadButton/>
        </div>
    )
}

export default Main