from flask import Flask, render_template, Response
from flask_socketio import SocketIO, emit
from flask_cors import CORS  # Import CORS
from camera import VideoCamera
import threading

# Initialize Flask app and SocketIO
app = Flask(__name__)

# Enable CORS for your frontend (React app) domain
CORS(app, origins="http://localhost:5173")  # Allow only React frontend origin

socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")  # For socket connections

@app.route('/')
def index():
    return render_template('index.html')  # Make sure this is an HTML file

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

# This will handle alerts sent from the backend
@socketio.on('alert')
def handle_alert(data):
    print(f"Alert received: {data['message']}")
    emit('alert', {'message': data['message']})

if __name__ == '__main__':
socketio.run(app, host='0.0.0.0', port=5000, use_reloader=False)

