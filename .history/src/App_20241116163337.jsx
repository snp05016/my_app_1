import React, { useEffect, useState } from "react";

const App = () => {
  const [alert, setAlert] = useState("Loading..."); // State to store the alert message

  useEffect(() => {
    const readAlertFile = async () => {
      try {
        // Access the text file from the public folder
        const response = await fetch(`${process.env.PUBLIC_URL}/alerts_log.txt`);
        const text = await response.text();
        const lines = text.trim().split("\n");
        setAlert(lines[lines.length - 1] || "No alerts yet!"); // Set the last line of the file as alert
      } catch (error) {
        console.error("Error reading alert file:", error);
        setAlert("Unable to fetch alerts.");
      }
    };

    readAlertFile(); // Read the file when the component mounts
    const interval = setInterval(readAlertFile, 1); // Poll the file every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <h1>Real-Time Alerts</h1>
      <p>{alert}</p> {/* Display the alert */}
    </div>
  );
};

export default App;
