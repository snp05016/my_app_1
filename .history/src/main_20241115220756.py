from flask import Flask, Response
from flask_socketio import SocketIO, emit
from flask_cors import CORS  # Import CORS
from scipy.spatial import distance as dist
from imutils import face_utils
from imutils.video import VideoStream
import numpy as np
import cv2
import dlib
import time
import math
from threading import Thread

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all origins (HTTP and WebSocket)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize SocketIO with CORS support for WebSocket connections
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow all origins for SocketIO

class VideoCamera:
    # Your class code remains unchanged...
    ...

# Route for video feed
@app.route('/video_feed')
def video_feed():
    camera = VideoCamera()
    return Response(camera.get_frame(), mimetype='multipart/x-mixed-replace; boundary=frame')

# Run the Flask-SocketIO app
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
