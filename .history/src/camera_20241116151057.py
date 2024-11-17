from flask import Flask, Response
from flask_socketio import SocketIO, emit
from scipy.spatial import distance as dist
from imutils import face_utils
from imutils.video import VideoStream
import numpy as np
import cv2
import dlib
import time
import math
from threading import Thread
from flask_cors import CORS

# Initialize Flask app and SocketIO
class VideoCamera(object):
    def __init__(self):
      self.video = cv2.VideoCapture(0)
    def __del__(self):
      self.video.release()
    def get_frame(self):
      ret, frame = self.video.read()
      ret, jpeg = cv2.imencode('.jpg', frame)
      return jpeg.tobytes()