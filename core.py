import eel
import base64
from PIL import Image
import os
import base64
from io import BytesIO


eel.init('web')

counter = 0


def clearFilesOnFolder(folder):
    for filename in os.listdir(folder):
        if filename.startswith('img-'):
            file_path = os.path.join(folder, filename)
            os.unlink(file_path)


@eel.expose
def doPredictions():
    import predict
    return eel.spawn(predict.getPredictedGestures)
    

@eel.expose
def sendPicture(data, canvasId):
    showPic(data[22:])

    

def showPic(data):
    global counter
    if(counter == 0):
        clearFilesOnFolder('./captured-imgs/')
    bytes_decoded = base64.b64decode(data)

    img = Image.open(BytesIO(bytes_decoded))
    img.save('./captured-imgs/img-'+str(counter)+'.png')
    counter+=1

@eel.expose
def getPredictedGesturesResult():
    import predict
    return predict.getPredictedGesturesResult()

eel.start('index.html', mode='default')