import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Cam.css"; // Make sure your CSS is defined

const Cam = () => {
  const [alert, setAlert] = useState(""); // State to store the alert message
  const [isConnected, setIsConnected] = useState(true); // Track connection status

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

    // Listen for connection status change
    socket.on("connect", () => {
      console.log("Connected to the server");
      setIsConnected(true);  // Set connection status
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
      setIsConnected(false);  // Update connection status when disconnected
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Display video feed */}
      <img
        className="video-feed"
        src="http://localhost:5000/video_feed"
        alt="Video feed"
      />
      
      {/* Show alert message if available */}
      {alert && (
        <div className="alert-box">
          <p>{alert}</p>
        </div>
      )}
      
      {/* Show a message when disconnected */}
      {!isConnected && <div className="connection-error">Disconnected from server!</div>}
    </div>
  );
};

export default Cam;
