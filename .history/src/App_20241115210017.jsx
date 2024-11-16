import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Cam.css"; // Import the CSS file

const Cam = () => {
  const [alert, setAlert] = useState(""); // State to store the alert message

  useEffect(() => {
    // Create a socket connection to Flask backend
    const socket = io("http://localhost:5000", {
      transports: ['websocket', 'polling'], // Ensures connection uses websocket first
    });

    // Listen for 'alert' event and update the state
    socket.on("alert", (data) => {
      console.log("Received alert:", data.message);  // Debugging: Check if the event is received
      setAlert(data.message); // Set alert message from backend
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <img
        className="video-feed"
        src="http://localhost:5000/video_feed"
        alt="Video feed"
      />
      {alert && (
        <div className="alert-box">
          <p>{alert}</p>
        </div>
      )}
    </div>
  );
};

export default Cam; 