import matplotlib.pyplot as plt
import os
 
folder_path = './test-imgs/'
from PIL import Image

import numpy as np



from keras.models import load_model

loaded_model = load_model('./models/gesture_recognition_model.h5')

reverselookup={0: '02_l',
 1: '04_fist_moved',
 2: '09_c',
 3: '10_down',
 4: '06_index',
 5: '08_palm_moved',
 6: '07_ok',
 7: '05_thumb',
 8: '01_palm',
 9: '03_fist'}



 
predicted_gestures = []
files = []
for filename in os.listdir(folder_path):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        files.append(filename)
        img_path = os.path.join(folder_path, filename)

       
        img = Image.open(img_path).convert('L')  # Convert to grayscale
        img = img.resize((320, 120))
        arr = np.array(img)
        t_test = arr.reshape((1, 120, 320, 1))
        t_test = t_test / 255.0
        plt.imshow(arr, cmap='gray')

   
        predictions = loaded_model.predict(t_test)

 
        predicted_class = np.argmax(predictions)
        predicted_gesture = reverselookup[predicted_class]
        predicted_gestures.append(predicted_gesture)

print("Predicted Gestures:")
for i in range(len(predicted_gestures)):
    print(predicted_gestures[i], files[i])