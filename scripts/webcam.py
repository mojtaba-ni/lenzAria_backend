# Import necessary libraries
import cv2 as cv
import numpy as np
import mediapipe as mp
import argparse
import os
import sys
from utils import *

# Create the parser
parser = argparse.ArgumentParser(description='Process overlay path and camera ID.')
parser.add_argument('OverlayPath', metavar='path', type=str, help='the path to overlay')
parser.add_argument('CameraID', metavar='id', type=int, help='the ID of the camera')
parser.add_argument('--MinDetectionConfidence', metavar='Detection', type=valid_float, default=0.5, help='The min confidence of landmarks detection')
parser.add_argument('--MinTrackingConfidence', metavar='Tracking', type=valid_float, default=0.5, help='The min confidence of landmarks tracking')
parser.add_argument('--Alpha', metavar='format', type=valid_float, default=0.3, help='overlay transparency value')
# Parse the arguments
args = parser.parse_args()

# Initialize video capture with the provided camera ID
cap = cv.VideoCapture(args.CameraID)
if cap.isOpened():
    print("Camera is available!")
else:
    cap.release()
    print("Camera is not available!")
    sys.exist()

# Initialize face mesh
mp_face_mesh = mp.solutions.face_mesh

# Indices for left and right eyes and irises
LEFT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385,384, 398]
RIGHT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161 , 246]
LEFT_IRIS = [474,475, 476, 477]
RIGHT_IRIS = [469, 470, 471, 472]

# Check if uploads exist, if not create them
os.makedirs('uploads', exist_ok=True) 

# Load overlay image
if os.path.exists(args.OverlayPath):
    overlay=cv.imread(args.OverlayPath, cv.IMREAD_UNCHANGED)
else:
    print("The overlay file path isn't correct.")
    sys.exit()

# Initialize face mesh with parameters
with mp_face_mesh.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=float(args.MinDetectionConfidence),
    min_tracking_confidence=float(args.MinTrackingConfidence)
) as face_mesh:
    while True:
        # Read frame from video
        ret, frame = cap.read()
        if not ret:
            break
        # Flip frame
        frame = cv.flip(frame,1)
        # Convert frame to RGB
        rgb_frame=cv.cvtColor(frame,cv.COLOR_BGR2RGB)
        # Convert RGB frame to RGBA
        rgba_frame=cv.cvtColor(rgb_frame, cv.COLOR_BGR2RGBA)
        # Get frame dimensions
        height, width = rgba_frame.shape[:2]
        # Process frame with face mesh
        results = face_mesh.process(rgb_frame)
        if results.multi_face_landmarks:
            # Initialize overlay with zeros
            zero_overlay = np.zeros_like(rgba_frame)
            # Get mesh points
            mesh_points=np.array([np.multiply([p.x, p.y],
                    [width, height]).astype(int) for p in results.multi_face_landmarks[0].landmark])
            # Initialize iris masks
            iris_mask_left = np.zeros(rgba_frame.shape, dtype=np.uint8)
            iris_mask_right = np.zeros(rgba_frame.shape, dtype=np.uint8)
            # Get blink ratio
            _,re_ratio,le_ratio=blinkRatio(rgb_frame, mesh_points,RIGHT_EYE,LEFT_EYE)
            # Get iris centers and radii
            (l_cx, l_cy), l_radius = cv.minEnclosingCircle(mesh_points[LEFT_IRIS])
            (r_cx, r_cy), r_radius = cv.minEnclosingCircle(mesh_points[RIGHT_IRIS])
            center_left = (int(l_cx), int(l_cy))
            center_right = (int(r_cx), int(r_cy))
            # Draw circles on iris masks
            cv.circle(iris_mask_left, center_left, int(l_radius), (255,0,0,255), -1, cv.LINE_AA)
            cv.circle(iris_mask_right, center_right, int(r_radius), (255,0,0,255), -1, cv.LINE_AA)
            # Get bounding box sizes
            bbx_size_l=int((l_radius*2)/2)
            bbx_size_r=int((r_radius*2)/2)
            # Resize overlay
            resized_overlay_l=cv.resize(overlay,(bbx_size_l*2,bbx_size_l*2),interpolation=cv.INTER_CUBIC)
            resized_overlay_r=cv.resize(overlay,(bbx_size_r*2,bbx_size_r*2),interpolation=cv.INTER_CUBIC)
            # Get bounding box coordinates
            y1_r=center_right[1]-bbx_size_r
            y2_r=center_right[1]+bbx_size_r
            x1_r=center_right[0]-bbx_size_r
            x2_r=center_right[0]+bbx_size_r

            y1_l=center_left[1]-bbx_size_l
            y2_l=center_left[1]+bbx_size_l
            x1_l=center_left[0]-bbx_size_l
            x2_l=center_left[0]+bbx_size_l
            # Add resized overlay to zero overlay if conditions are met
            if (resized_overlay_l.shape == zero_overlay[y1_l:y2_l,x1_l:x2_l].shape) & (le_ratio < 5.0) & (le_ratio > 1.9):
                zero_overlay[y1_l:y2_l,x1_l:x2_l]=resized_overlay_l
            if (resized_overlay_r.shape == zero_overlay[y1_r:y2_r,x1_r:x2_r].shape) & (re_ratio < 5.0) & (re_ratio > 1.9):
                zero_overlay[y1_r:y2_r,x1_r:x2_r]=resized_overlay_r
            # Initialize eye masks
            eye_mask_left = np.zeros(rgba_frame.shape, dtype=np.uint8)
            eye_mask_right = np.zeros(rgba_frame.shape, dtype=np.uint8)
            # Fill eye masks with polygons
            cv.fillPoly(eye_mask_left, [mesh_points[LEFT_EYE]], (255,0,0,255))
            cv.fillPoly(eye_mask_right, [mesh_points[RIGHT_EYE]], (255,0,0,255))
             # Use the 4-channel masks to create zero_overlay
            zero_overlay[np.where((iris_mask_left[:, :, 3] > 0) & (eye_mask_left[:, :, 3] == 0))] = 0
            zero_overlay[np.where((iris_mask_right[:, :, 3] > 0) & (eye_mask_right[:, :, 3] == 0))] = 0
            # Add weighted overlay to frame
            rgba_frame = cv.addWeighted(rgba_frame, 1, zero_overlay, float(args.Alpha), 0)
        # Display frame
        cv.imshow('img', rgba_frame)
        # Wait for key press
        key = cv.waitKey(1)
        if key == ord('q'):
            break
# Release video capture
cap.release()
# Destroy all windows
cv.destroyAllWindows()