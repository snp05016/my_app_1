from flask import Flask, render_template, Response
from camera import VideoCamera
from flask_socketio import SocketIO  # Import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)  # Initialize SocketIO

@app.route('/')
def index():
    return render_template('index.html')  # Change to .html if you use it

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

# Function to emit an alert to the frontend
def alarm(msg):
    # Emit the message to the frontend
    socketio.emit('alert', {'message': msg})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, threaded=True, use_reloader=False)
