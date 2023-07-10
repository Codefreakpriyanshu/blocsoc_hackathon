import React from "react";
import "./styles/Upload.css";
import { Link } from "react-router-dom";

function UploadButton(){
    return(
        <div>
            <button id="Upload"><a href ="/UploadYourMusic" id="UploadText">+</a></button>
        </div>
    )
}

export default UploadButton