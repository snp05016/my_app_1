import React, { useEffect, useState } from "react";
import "./Cam.css"; // Import the CSS file

const Cam = () => {
  const [alert, setAlert] = useState("Loading..."); // State to store the alert message

  // Function to fetch the last alert
  const fetchLastAlert = async () => {
    try {
      // Access the text file from the public folder
      const response = await fetch(`C:\Users\Asus\Desktop\Career\SPOTIFY\natHACKS2024-Project\my_app_1\src\alerts_log.txt');
      const text = await response.text();
      const lines = text.trim().split("\n");
      setAlert(lines[lines.length - 1] || "No alerts yet!"); // Set the last line of the file as alert
    } catch (error) {
      console.error("Error reading alert file:", error);
      setAlert("Unable to fetch alerts.");
    }
  };

  useEffect(() => {
    fetchLastAlert(); // Fetch the last alert on component mount
    const interval = setInterval(fetchLastAlert, 5000); // Update every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <img
        className="image"
        src="http://localhost:7000/video_feed"
        alt="Video"
      />
      <div className="alert-box">
        {console.log(alert)};
        <p>{alert}</p> {/* Display the alert message */}
      </div>
    </div>
  );
};

export default Cam;
