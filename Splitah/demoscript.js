document.addEventListener('DOMContentLoaded', function() {
    // Existing initialization code for menu toggle and button events...

    function startCamera() {
        const videoElement = document.getElementById('videoElement');
        const constraints = { video: { facingMode: "environment" } };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                videoElement.srcObject = stream;
                videoElement.play();
                // Delay full-screen until the stream is successfully playing
                enterFullScreen(document.querySelector('.video-container'));
            })
            .catch(err => console.error('Error accessing the camera:', err));
    }

    // Adjusted to handle custom full-screen alongside capturing
    document.getElementById('captureBtn').addEventListener('click', function() {
        // Check if already in full-screen when attempting to capture
        if (document.fullscreenElement) {
            captureAndProcessImage(document.getElementById('videoElement'));
        } else {
            console.error("Not in full-screen mode. Ensure you're capturing in full-screen.");
        }
    });

    function enterFullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) { /* Safari */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE11 */
            element.msRequestFullscreen();
        }
        // Make sure the capture button and instructional text are visible
        showOverlayElements();
    }

    function showOverlayElements() {
        document.getElementById('captureBtn').style.display = 'block';
        document.querySelector('.overlay-text').style.display = 'block';
    }

    function captureAndProcessImage(videoElement) {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(blob => performOCR(blob), 'image/jpeg');
    }

    function performOCR(imageBlob) {
        // Show processing message within the full-screen mode
        document.querySelector('.overlay-text').textContent = 'Processing...';
        Tesseract.recognize(imageBlob, 'eng', { logger: m => console.log(m) })
            .then(({ data: { text } }) => {
                console.log('Recognized Text:', text);
                processReceiptText(text);
                // Optionally reset or hide overlay elements post-processing
                document.querySelector('.overlay-text').textContent = 'Position the receipt within the view of the camera.';
            })
            .catch(err => {
                console.error('OCR Error:', err);
                document.querySelector('.overlay-text').textContent = 'Error processing image. Please try again.';
            });
    }

    // Additional functions for processing text, displaying selections, and handling selected items...

    // Optional: Function to exit full-screen mode if needed
    function exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
});
