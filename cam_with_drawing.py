import cv2
import mediapipe as mp
import numpy as np
from picamera2 import Picamera2

picam2 = Picamera2()
picam2.preview_configuration.main.size = (600,600)
picam2.preview_configuration.main.format = "RGB888"
picam2.preview_configuration.align()
picam2.configure("preview")
picam2.start()

mp_hands = mp.solutions.hands
mp_drawing= mp.solutions.drawing_utils 
hands = mp_hands.Hands(
    max_num_hands=2,
    min_detection_confidence=0.5, 
    min_tracking_confidence=0.5)

while True :
  img = picam2.capture_array()
  img = cv2.flip(img, 1)
  img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
  result = hands.process(img)
  img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
  if result.multi_hand_landmarks is not None:
    for res in result.multi_hand_landmarks:
      mp_drawing.draw_landmarks(img, res, mp_hands.HAND_CONNECTIONS)

  # cv2.putText(이미지, "AAAA", (100,100), cv2.FONT_HERSHEY_COMPLEX, 3, (0,0,0), 2)
  cv2.imshow('my webcam', img)
  
  if cv2.waitKey(1) == ord('q') :
    break
