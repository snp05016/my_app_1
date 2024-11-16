import React from "react";
import "./Cam.css"; // import the CSS file

const Cam = () => {
  return (
    <div>
      <img
        className="image"
        src="http://localhost:5000/video_feed"
        alt="Video"
      />
    </div>
  );
};

export default Cam;
