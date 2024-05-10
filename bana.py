from ultralytics import YOLO
import cv2

model = YOLO('yolov8n.pt')

img = cv2.imread('b1.jpg') 
model(img, save=True, save_crop=True)


