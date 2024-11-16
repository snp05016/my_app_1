import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Cam.css"; // import the CSS file

const Cam = () => {
  const [alert, setAlert] = useState(""); // state to store the alert message
  let data = null;
  useEffect(() => {
    // Create a socket connection to Flask backend
    // const socket = io("http://localhost:5000");
    
    

    // Listen for 'alert' event and update the state
    // socket.on("alert", (data) => {
    //   setAlert(data.message); // set alert message from backend
    // });
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/video_feed", {
          method: "GET", // HTTP method
          headers: {
            "Content-Type": "application/json", // headers
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        data = await response.json(); // parse the response as JSON
        console.log(data);
        setDataFromFlask(data.message); // set state with the data
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData()
    // Cleanup the socket connection when the component unmounts
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <div>
      <img
        className="image"
        src={data == null ? null : data[0]}
        alt="Video"
      />
      {data == null ? null : data[0]}
      {data == null ? null :  (
        <div className="alert-box">
          <p>{data[1]}</p> {/* Display the alert message */}
        </div>
      )}
    </div>
  );
};

export default Cam;