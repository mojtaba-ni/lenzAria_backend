# Import necessary libraries
import cv2 as cv
import numpy as np
import sys
import mediapipe as mp
import argparse
from utils import *
import os



# Create the parser
parser = argparse.ArgumentParser(description='Process overlay path, camera ID, and input file.')
parser.add_argument('--OverlayPath', metavar='path', type=str, help='the path to overlay')
parser.add_argument('--InputFile', metavar='file', type=str, help='the path to the input video or image file')
parser.add_argument('--OutputFormat', metavar='format', type=str, default='mp4', help='the format of the output file (default: mp4 for videos, png for images)')
parser.add_argument('--OutputFrameRate', metavar='fps', type=str, default='0', help='The frame rate of the output video')
parser.add_argument('--MinDetectionConfidence', metavar='Detection', type=valid_float, default=0.5, help='The min confidence of landmarks detection')
parser.add_argument('--MinTrackingConfidence', metavar='Tracking', type=valid_float, default=0.5, help='The min confidence of landmarks tracking')
parser.add_argument('--Alpha', metavar='format', type=valid_float, default=0.3, help='overlay transparency value')

# Parse the arguments
args = parser.parse_args()

# Initialize face mesh
mp_face_mesh = mp.solutions.face_mesh

# Indices for left and right eyes and irises
LEFT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385,384, 398]
RIGHT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161 , 246]
LEFT_IRIS = [474,475, 476, 477]
RIGHT_IRIS = [469, 470, 471, 472]
# Load overlay image
if os.path.exists(os.path.abspath(args.OverlayPath)):
    overlay=cv.imread(os.path.abspath(args.OverlayPath), cv.IMREAD_UNCHANGED)
else:
    print("The overlay file path isn't correct.")
    sys.exit()

# Check if uploads/overlayedImages exist, if not create them
os.makedirs('uploads', exist_ok=True) 

# Get the base name of the input file
if os.path.exists(os.path.abspath(args.InputFile)):
    base_name = os.path.splitext(os.path.basename(os.path.abspath(args.InputFile)))[0]
else:
    print("The input file path isn't correct.")
    sys.exit()
# Check if the input file is an image or a video
if os.path.abspath(args.InputFile).lower().endswith(('.png', '.jpg', '.jpeg')):
    # Process image
    img = cv.imread(os.path.abspath(args.InputFile))
    if (not isinstance(overlay,type(None))) & (not isinstance(img,type(None))):
        processed_img = process_frame(img,overlay,LEFT_EYE, RIGHT_EYE, LEFT_IRIS, RIGHT_IRIS, 
                                      mp_face_mesh,float(args.MinDetectionConfidence), float(args.MinTrackingConfidence)
                                      ,float(args.Alpha))  # Assuming process_frame is a function that processes a single frame
        processed_img = cv.cvtColor(processed_img, cv.COLOR_RGBA2BGR)
        overlayedImagePathName = f'uploads/{base_name}_processed.png'
        cv.imwrite(overlayedImagePathName, processed_img)  # Save as .png by default
        print(overlayedImagePathName)
    else:
        print('The input path are incorrect or the is corrupted')
        sys.exit()
elif args.InputFile.lower().endswith(('.mp4')):
    # Process video
    cap = cv.VideoCapture(args.InputFile)
    if (not isinstance(overlay,type(None))) & (not isinstance(cap,type(None))):
        # Get the dimensions of the frame, fps
        fps=int(args.OutputFrameRate)
        if fps==0:
            fps = cap.get(5)
        ret, frame = cap.read()
        height, width, _ = frame.shape
        fourcc = cv.VideoWriter_fourcc(*'mp4v' if args.OutputFormat == 'mp4' else 'MJPG')
        overlayedVideoPathName = f'uploads/{base_name}_processed.{args.OutputFormat}'
        out = cv.VideoWriter(overlayedVideoPathName, fourcc, fps, (width, height))  
        while(cap.isOpened()):
            ret, frame = cap.read()
            if ret == True:
                processed_frame = process_frame(frame,overlay,LEFT_EYE, RIGHT_EYE, LEFT_IRIS, RIGHT_IRIS, 
                                                mp_face_mesh, float(args.MinDetectionConfidence), 
                                                float(args.MinTrackingConfidence), float(args.Alpha))  # Assuming process_frame is a function that processes a single frame
                processed_frame = cv.cvtColor(processed_frame, cv.COLOR_RGBA2BGR)
                out.write(processed_frame)
            else:
                break
        cap.release()
        out.release()
        print(overlayedVideoPathName)
    else:
        print('The input path are incorrect or the is corrupted')
        sys.exit()
else:
    print('the program only supports these input formats: mp4, jpeg, png, jpg')
    sys.exit()

# cv.destroyAllWindows()
