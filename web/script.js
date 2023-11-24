(() => {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.

    const width = 320; // We will scale the photo width to this
    let height = 0; // This will be computed based on the input stream

    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.

    let streaming = false;

    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.

    let video = null;
    let canvas = document.getElementById("canvas0");
    let photo = null;
    let startbutton = null;
    let loadingText = null;
    let counter = 0;

    function showViewLiveResultButton() {
        if (window.self !== window.top) {
            // Ensure that if our document is in a frame, we get the user
            // to first open it in its own tab or window. Otherwise, it
            // won't be able to request permission for camera access.
            document.querySelector(".contentarea").remove();
            const button = document.createElement("button");
            button.textContent = "View live result of the example code above";
            document.body.append(button);
            button.addEventListener("click", () => window.open(location.href));
            return true;
        }
        return false;
    }

    function startup() {
        if (showViewLiveResultButton()) {
            return;
        }
        video = document.getElementById("video");
        photo = document.getElementById("photo");
        startbutton = document.getElementById("startbutton");
        loadingText = document.getElementById("loadingText");

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(`An error occurred: ${err}`);
            });

        video.addEventListener(
            "canplay",
            (ev) => {
                if (!streaming) {
                    height = video.videoHeight / (video.videoWidth / width);

                    // Firefox currently has a bug where the height can't be read from
                    // the video, so we will make assumptions if this happens.

                    if (isNaN(height)) {
                        height = width / (4 / 3);
                    }

                    video.setAttribute("width", width);
                    video.setAttribute("height", height);
                    canvas.setAttribute("width", width);
                    canvas.setAttribute("height", height);
                    streaming = true;
                }
            },
            false,
        );

        startbutton.addEventListener(
            "click",
            (ev) => {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                if (document.getElementById("number").value == "") {
                    alert("Please enter a number");
                    return;
                }
                preparePictures();
            },
            false,
        );
        

        clearphoto();
    }

    startup();

    // Fill the photo with an indication that none has been
    // captured.

    function clearphoto() {
        const context = canvas.getContext("2d");
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const data = canvas.toDataURL("image/png");
    }

    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.

    function preparePictures() {
        const number = document.getElementById("number").value;
        const timeLeft = document.getElementById("timeLeft");
        // loop through umbers and take photo each time with a 2 sec interval that is printed on the screen the time left
        let i = 0;

        timeLeft.innerText = "Starting soon...";
        var x = setInterval(function () {
            if (i >= number*2) { // 2 PHOTOS PER CHAR
                clearInterval(x);
                eel.doPredictions()(function (ret1) {
                    eel.getPredictedGesturesResult()(function (ret) {
                        loadingText.style.display = 'none';
                        console.log(JSON.stringify(ret, null, 4));
                        renderResults(ret);
                    }
                    );
                });
                loadingText = document.getElementById("loadingText");
                // enable button
                loadingText.style.display = 'block';
                // disable take photo button
                startbutton = document.getElementById("startbutton");
                startbutton.style.display = 'none';
                return;
            }

            timeLeft.innerText = "Photo in 3! ("+(i+1)+"/"+number*2+")";
            setTimeout(function () {
                timeLeft.innerText = "Photo in 2! ("+(i+1)+"/"+number*2+")";
                setTimeout(function () {

                    timeLeft.innerText = "Photo in 1! ("+(i+1)+"/"+number*2+")";
                    setTimeout(function () {
                        timeLeft.innerText = "NOW!";
                        takepicture();
                        i++;

                    }, 700);
                }, 700);
            }, 700);


        }, 3000);


    }







    function takepicture() {
        var main = document.getElementById("main");
        var div2 = document.createElement('div');
        div2.className = "col-3";
        var canvas2 = document.createElement('canvas');
        canvas2.id = "canvas" + counter;
        main.appendChild(div2);
        div2.appendChild(canvas2);

        var text = document.createElement('p');
        text.innerText = "Picture #" + counter;

        text.className = "text-center";
        div2.appendChild(text);



        const context = canvas2.getContext("2d");
        counter++;
        if (width && height) {
            canvas2.width = width;
            canvas2.height = height;
            context.drawImage(video, 0, 0, width, height);

            const data = canvas2.toDataURL("image/png");


            eel.sendPicture(data.toString(), 'canvas' + counter);
        } else {
            clearphoto();
        }
    }


    function renderResults(data){
        
        resultDiv = document.getElementById("results");
        var newDiv;
        
        newDiv = document.createElement("div");
        newDiv.style.border = "1px solid grey";
        newDiv.className = "col-12 rounded p-2 m-2";
        newDiv.innerHTML = "<p>Your translated HAND_GESTURE->UNICODE->STRING: <br><span id='resultDIV'>" + data + "</span></p>";
        resultDiv.appendChild(newDiv);

        // music stuff
        var audio = document.getElementById("audio");
        // change display to block
        audio.style.display = "block";
        // do the same with the play button
        var playButton = document.getElementById("playButton");
        playButton.style.display = "block";
               
    }

    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener("load", startup, false);

    // onclick play id
   
    
})();

function playSound() {
    var audio = document.getElementById("audio");
    // change the source
    audio.src = "http://api.voicerss.org/?key=acfdd1d5aaf341119d62d2a18149096b&hl=ca-es&c=MP3&src="+document.getElementById("resultDIV").innerText;
    // play the audio
    audio.play();
};  