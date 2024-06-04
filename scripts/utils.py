import math
import numpy as np
import cv2 as cv
import streamlit as st
import argparse

def valid_float(n):
    if not n.isfloat():
        raise argparse.ArgumentTypeError('Invalid integer value: {}'.format(n))
    return float(n)


def euclaideanDistance(point, point1):
    x, y = point
    x1, y1 = point1
    distance = math.sqrt((x1 - x)**2 + (y1 - y)**2)
    return distance

# Blinking Ratio
def blinkRatio(img, landmarks, right_indices, left_indices):
    # Right eyes 
    # horizontal line 
    rh_right = landmarks[right_indices[0]]
    rh_left = landmarks[right_indices[8]]
    # vertical line 
    rv_top = landmarks[right_indices[12]]
    rv_bottom = landmarks[right_indices[4]]
    # draw lines on right eyes 
    # cv.line(img, rh_right, rh_left, utils.GREEN, 2)
    # cv.line(img, rv_top, rv_bottom, utils.WHITE, 2)    # LEFT_EYE 
    # horizontal line 
    lh_right = landmarks[left_indices[0]]
    lh_left = landmarks[left_indices[8]]    # vertical line 
    lv_top = landmarks[left_indices[12]]
    lv_bottom = landmarks[left_indices[4]]    # Finding Distance Right Eye
    rhDistance = euclaideanDistance(rh_right, rh_left)
    rvDistance = euclaideanDistance(rv_top, rv_bottom)
    # Finding Distance Left Eye
    lvDistance = euclaideanDistance(lv_top, lv_bottom)
    lhDistance = euclaideanDistance(lh_right, lh_left)    # Finding ratio of LEFT and Right Eyes
    reRatio=0.0
    leRatio=0.0
    if (rvDistance > 0.0) & (lvDistance > 0.0):
        reRatio = rhDistance/rvDistance
        leRatio = lhDistance/lvDistance

    ratio = (reRatio+leRatio)/2    
    return ratio, reRatio, leRatio

def process_frame(frame, overlay, LEFT_EYE, RIGHT_EYE, LEFT_IRIS, RIGHT_IRIS, 
                  mp_face_mesh, min_detection_confidence, min_tracking_confidence,alpha):
    with mp_face_mesh.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=min_detection_confidence,
    min_tracking_confidence=min_tracking_confidence
) as face_mesh:
        # Convert frame to RGB
        rgb_frame = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
        # Convert RGB frame to RGBA
        rgba_frame = cv.cvtColor(frame, cv.COLOR_BGR2RGBA)
        # Get frame dimensions
        height, width = rgba_frame.shape[:2]
        # Process frame with face mesh
        results = face_mesh.process(rgb_frame)
        if results.multi_face_landmarks:
            # Initialize overlay with zeros
            zero_overlay = np.zeros_like(rgba_frame)
            # Get mesh points
            mesh_points = np.array([np.multiply([p.x, p.y],
                    [width, height]).astype(int) for p in results.multi_face_landmarks[0].landmark])
            # Initialize iris masks
            iris_mask_left = np.zeros(rgba_frame.shape, dtype=np.uint8)
            iris_mask_right = np.zeros(rgba_frame.shape, dtype=np.uint8)
            # Get blink ratio
            _, re_ratio, le_ratio = blinkRatio(rgb_frame, mesh_points, RIGHT_EYE, LEFT_EYE)
            # Get iris centers and radii
            (l_cx, l_cy), l_radius = cv.minEnclosingCircle(mesh_points[LEFT_IRIS])
            (r_cx, r_cy), r_radius = cv.minEnclosingCircle(mesh_points[RIGHT_IRIS])
            center_left = (int(l_cx), int(l_cy))
            center_right = (int(r_cx), int(r_cy))
            # Draw circles on iris masks
            cv.circle(iris_mask_left, center_left, int(l_radius), (255, 0, 0, 255), -1, cv.LINE_AA)
            cv.circle(iris_mask_right, center_right, int(r_radius), (255, 0, 0, 255), -1, cv.LINE_AA)
            # Get bounding box sizes
            bbx_size_l = int((l_radius * 2) / 2)
            bbx_size_r = int((r_radius * 2) / 2)
            # Resize overlay
            resized_overlay_l = cv.resize(overlay, (bbx_size_l * 2, bbx_size_l * 2), interpolation=cv.INTER_CUBIC)
            resized_overlay_r = cv.resize(overlay, (bbx_size_r * 2, bbx_size_r * 2), interpolation=cv.INTER_CUBIC)
            # Get bounding box coordinates
            y1_r = center_right[1] - bbx_size_r
            y2_r = center_right[1] + bbx_size_r
            x1_r = center_right[0] - bbx_size_r
            x2_r = center_right[0] + bbx_size_r
            y1_l = center_left[1] - bbx_size_l
            y2_l = center_left[1] + bbx_size_l
            x1_l = center_left[0] - bbx_size_l
            x2_l = center_left[0] + bbx_size_l
            # Add resized overlay to zero overlay if conditions are met
            if (resized_overlay_l.shape == zero_overlay[y1_l:y2_l, x1_l:x2_l].shape) & (le_ratio < 5.0) & (le_ratio > 2.0):
                zero_overlay[y1_l:y2_l, x1_l:x2_l] = resized_overlay_l
            if (resized_overlay_r.shape == zero_overlay[y1_r:y2_r, x1_r:x2_r].shape) & (re_ratio < 5.0) & (re_ratio > 2.0):
                zero_overlay[y1_r:y2_r, x1_r:x2_r] = resized_overlay_r
            # Initialize eye masks
            eye_mask_left = np.zeros(rgba_frame.shape, dtype=np.uint8)
            eye_mask_right = np.zeros(rgba_frame.shape, dtype=np.uint8)
            # Fill eye masks with polygons
            cv.fillPoly(eye_mask_left, [mesh_points[LEFT_EYE]], (255, 0, 0, 255))
            cv.fillPoly(eye_mask_right, [mesh_points[RIGHT_EYE]], (255, 0, 0, 255))
            # Use the 4-channel masks to create zero_overlay
            zero_overlay[np.where((iris_mask_left[:, :, 3] > 0) & (eye_mask_left[:, :, 3] == 0))] = 0
            zero_overlay[np.where((iris_mask_right[:, :, 3] > 0) & (eye_mask_right[:, :, 3] == 0))] = 0
            # Add weighted overlay to frame
            rgba_frame = cv.addWeighted(rgba_frame, 1, zero_overlay, alpha, 0)
        return rgba_frame
