# DailyHackEPS2023

## What is DailyHack?

Welcome to the DailyHackEPS2023 repository! This project is an integral part of a challenge to gear up for [HackEPS](https://lleidahack.dev/hackeps/), a thrilling event that showcases the prowess of developers and problem solvers.

For an in-depth understanding of the challenge and its nuances, please refer to the [challenge description (in Catalan)](https://github.com/FerranAD/dailyhack2023/blob/main/README.md).

## Important info about this solution

### How to use the app
You'll be prompted with a camera, and an input asking for a set of characters you want to express.
For instance if you want to express the word `Hello`, it is 4 chars length.

Since our latin alphabet has 26 chars, we'll need 2 photos per char to decide which char we're going to use.

The following schema is used to compute the alphabet using the images:

```
 alphabet = {
    "FIST": 0,
    "INDEX_FINGER": 1,
    "L_SHAPE": 2,
    "OK_SHAPE": 3,
    "C_SHAPE": 4,
    "PALM": 5,
    "THUMB_FINGER": 6,
    "FIST_MOVED": 7,
    "PALM_MOVED": 8,
    "PALM_DOWN": 9
}
```

And you'll be thiking, why this order? 
Well, I thought I'd the easiest to learn, since we can remember thanks to this mnemotecnic:

0. With out fist (puny en català) we count as 0 when we were kids
1. With our index finger we start to count
2. Making an L shape uses 2 fingers
3. An ok hand gesture uses 3 straight fingers
4. In spanish the 4 is spelled CUATRO
5. The palm has clearly 5 fingers
6. The first finger when we need to count >5 (6 is the firsts) with our hands
7,8,9 High numbers which you'll need to remember :D (come on, there are only 3 numbers with no reason, JUST 3!)

Once the alphabet is encoded using UNICODE, **take in mind that A=00, B=01, C=02 .... Z=26 **
You can use this as a reference:
```
A = 1
B = 2
C = 3
D = 4
E = 5
F = 6
G = 7
H = 8
I = 9
J = 10
K = 11
L = 12
M = 13
N = 14
O = 15
P = 16
Q = 17
R = 18
S = 19
T = 20
U = 21
V = 22
W = 23
X = 24
Y = 25
Z = 26
```

#### Little disclaimer
The model is trained under low-light levels, so try to recreate the model's enviroment to take photos, otherwise it won't work.

#### Model reference
Please reffer to [this Kaggle link](https://www.kaggle.com/code/gauravsrivastav2507/kv-hand-gesture) to see more about how the model was trained


## Architecture

### Project Overview

DailyHackEPS2023 is built using Python3 and the Eel library to create a desktop application. The structure is centered around the `core.py` script, supplemented by `predict.py` (using a Keras AI model) and `captureImgs.py` to save images to the local disk.

### Core Components

#### 1. core.py

The `core.py` script serves as the backbone, orchestrating fundamental functionalities.

#### 2. predict.py

Empowered by a Keras AI model, `predict.py` adds intelligent capabilities for predictive tasks.

#### 3. captureImgs.py

The `captureImgs.py` script facilitates seamless image capture and storage on the user's machine.

### Python and Eel Synergy

Python3, coupled with the Eel library, efficiently powers the desktop application, bridging the gap between front-end and back-end development.

## Production Deploy
Just download the executable file I've prepared inside the GitHub section called Releases.


## Development Deploy

To begin with DailyHackEPS2023:

1. Clone the repository.
2. Ensure Python3 is installed.
3. Create a virtualenv `virtualenv env` and enter it `soruce env/bin/activate`
4. Install dependencies with `pip install -r requirements.txt`.
5. Execute `python3 core.py` to launch the application.
6. Hurray! The app will pop up!


## Contribution Guidelines

Contributions are welcome. Review our [contribution guidelines](CONTRIBUTING.md) before getting started.
