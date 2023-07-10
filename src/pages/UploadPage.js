import React from "react";
import "../styles/UploadPage.css";

function UploadPage(){
    return(
        <div>
            <div id="UploadPageTitle">
                <h2>Upload Your Music</h2>
            </div>
            <div>
                <form id="form1">
                <input placeholder="Artist Name"></input>
                <input type="file" ></input>
                <button type="submit" form="form1" value="Submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UploadPage