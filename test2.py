import cv2
import requests
from picamera2 import Picamera2

picam2 = Picamera2()
picam2.preview_configuration.main.size = (800,800)
picam2.preview_configuration.main.format = "RGB888"
picam2.preview_configuration.align()
picam2.configure("preview")
picam2.start()

while True:
    ret, img = picam2.capture_array()
    ret, buffer = cv2.imencode('.jpg', img)
    requests.post("http://e760-1-233-65-186.ngrok-free.app/video_feed", files = {"frame" : buffer.tobytes()})
    if cv2.waitKey(1) == ord('q'):
        break
