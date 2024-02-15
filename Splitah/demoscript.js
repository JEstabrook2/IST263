document.addEventListener('DOMContentLoaded', function() {
    // Toggle Side Menu
    document.querySelector('.menu-trigger').addEventListener('click', function() {
        const sideMenu = document.querySelector('.side-menu');
        sideMenu.style.display = sideMenu.style.display === "block" ? "none" : "block";
    });

    // "Split My Bill" Button Event
    document.getElementById('startBtn').addEventListener('click', function() {
        document.querySelectorAll('section').forEach(section => section.style.display = 'none');
        document.getElementById('userSelectionPage').style.display = 'block';
    });

    // Host and Guest Selection
    document.getElementById('hostBtn').addEventListener('click', () => console.log('Host selected'));
    document.getElementById('guestBtn').addEventListener('click', () => console.log('Guest selected'));

    // Submit Name and Proceed to Camera
    document.getElementById('submitName').addEventListener('click', function() {
        console.log('Name submitted: ', document.getElementById('nameInput').value);
        document.getElementById('userSelectionPage').style.display = 'none';
        document.getElementById('cameraFeed').style.display = 'block';
        startCamera();
    });

    // Back Button Functionality
    document.getElementById('backBtn').addEventListener('click', function() {
        document.getElementById('cameraFeed').style.display = 'none';
        document.getElementById('userSelectionPage').style.display = 'block';
    });

    function startCamera() {
        const videoElement = document.getElementById('videoElement');
        const constraints = { video: { facingMode: "environment" } };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                videoElement.srcObject = stream;
                videoElement.play();
                document.getElementById('captureBtn').classList.add('visible'); // Make button visible using class
                document.querySelector('.overlay-text').classList.add('visible'); // Make instructional text visible using class
                enterFullScreen(document.querySelector('.video-container')); // Go full-screen
            })
            .catch(err => console.error('Error accessing the camera:', err));
    }

    function enterFullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) { // Safari
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE11
            element.msRequestFullscreen();
        }
    }

    document.getElementById('captureBtn').addEventListener('click', function() {
        captureAndProcessImage(document.getElementById('videoElement'));
    });

    function captureAndProcessImage(videoElement) {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(blob => performOCR(blob), 'image/jpeg');
    }

    function performOCR(imageBlob) {
        document.querySelector('.overlay-text').textContent = 'Processing...';
        Tesseract.recognize(imageBlob, 'eng', { logger: m => console.log(m) })
            .then(({ data: { text } }) => {
                console.log('Recognized Text:', text);
                processReceiptText(text);
            })
            .catch(err => {
                console.error('OCR Error:', err);
                document.querySelector('.overlay-text').textContent = 'Error processing image. Please try again.';
            });
    }

    function processReceiptText(text) {
        // Existing function remains unchanged
    }

    function displayItemsForSelection(items) {
        // Existing function remains unchanged
    }

    function handleSelectedItems() {
        // Existing function remains unchanged
    }
});

document.addEventListener('fullscreenchange', () => {
    const isFullScreen = !!document.fullscreenElement;
    const captureBtn = document.getElementById('captureBtn');
    const overlayText = document.querySelector('.overlay-text');

    if (isFullScreen) {
        captureBtn.classList.add('visible');
        overlayText.classList.add('visible');
    } else {
        captureBtn.classList.remove('visible');
        overlayText.classList.remove('visible');
    }
});
