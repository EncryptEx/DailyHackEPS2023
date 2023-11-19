import matplotlib.pyplot as plt
import os

folder_path = "./captured-imgs/"
from PIL import Image

import numpy as np


from keras.models import load_model

loaded_model = load_model("./models/gesture_recognition_model.h5")

globalResult = {}

def getPredictedGestures():
    global globalResult
    reverselookup = {
        0: "L",
        1: "PUNY",
        2: "C",
        3: "ABAIX",
        4: "DIT_INDEX",
        5: "PUNY",
        6: "OK",
        7: "POLZE",
        8: "POLZE",
        9: "PUNY",
    }

    predicted_gestures = []
    files = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            files.append(filename)
            img_path = os.path.join(folder_path, filename)

            img = Image.open(img_path).convert("L")  # Convert to grayscale
            img = img.resize((320, 120))
            arr = np.array(img)
            t_test = arr.reshape((1, 120, 320, 1))
            t_test = t_test / 255.0
            # plt.imshow(arr, cmap="gray")

            predictions = loaded_model.predict(t_test)

            predicted_class = np.argmax(predictions)
            predicted_gesture = reverselookup[predicted_class]
            predicted_gestures.append(predicted_gesture)

    globalResult = {files[i]: predicted_gestures[i] for i in range(len(predicted_gestures))}

def getPredictedGesturesResult():
    return globalResult
