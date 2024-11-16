from flask import Flask, render_template, Response
from camera import VideoCamera
app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.js')
def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
# Fix for the video feed route in Flask
@app.route('/video_feed')
def video_feed():
    camera = VideoCamera()  # create a camera object
    return Response(gen(camera), mimetype='multipart/x-mixed-replace; boundary=frame')  # Streaming response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True, use_reloader=False)