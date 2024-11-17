import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Cam.css"; // Import the CSS file

const Cam = () => {
  const [alert, setAlert] = useState(""); // State to store the alert message

  

  return (
    <div>
      <img
        className="image"
        src="http://localhost:7000/video_feed"
        alt="Video"
      />
      {alert && (
        <div className="alert-box">
          <p>{alert}</p> {/* Display the alert message */}
        </div>
      )}
    </div>
  );
};

export default Cam;