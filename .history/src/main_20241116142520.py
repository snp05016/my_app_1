from flask import Flask, render_template, Response
from camera import VideoCamera
app = Flask(_name_)
@app.route('/')
def index():
    return render_template('index.js')
def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
if __name__ == '_main_':
    app.run(host='0.0.0.0', port=5000, threaded=True, use_reloader=False)