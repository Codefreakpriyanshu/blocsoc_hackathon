import React from "react";
import "../styles/UploadPage.css";
import upload from "./views/upload.ejs" ;

function UploadPage(){
    return(
        <div>
            <upload/>
            <script src="./app.js"></script>
        </div>
    )
}

export default UploadPage