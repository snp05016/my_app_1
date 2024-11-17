from flask import Flask, render_template, Response
from camera import VideoCamera , text
app = Flask(__name__)
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
    print(gen(VideoCamera()))
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
    
@app.route('/text')
def text():
    return Response(gen(text()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7000, threaded=True, use_reloader=False)