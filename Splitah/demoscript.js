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
document.getElementById('startBtn').addEventListener('click', function() {
    console.log('Split My Bill button clicked'); // This should appear in the console when the button is clicked
    document.querySelectorAll('section').forEach(section => {
        console.log('Hiding section: ', section);
        section.style.display = 'none'; // Hide all sections
    });
    console.log('Showing user selection page');
    document.getElementById('userSelectionPage').style.display = 'block'; // Show the user selection
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
                // Add visible class after ensuring the video is playing
                document.getElementById('captureBtn').classList.add('visible');
                document.querySelector('.overlay-text').classList.add('visible');
                // Move the call to enterFullScreen here to be part of the successful callback
                enterFullScreen(document.querySelector('.video-container'));
            })
            .catch(err => console.error('Error accessing the camera:', err));
    }
    
    function enterFullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen().then(() => {
                // Fullscreen was entered successfully
                console.log('Entered fullscreen mode.');
            }).catch((err) => {
                console.error('Error attempting to enter fullscreen mode:', err);
            });
        } else if (element.webkitRequestFullscreen) { // Safari
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE11
            element.msRequestFullscreen();
        }
    }
    
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
            // Consider stopping the video when exiting fullscreen
            // videoElement.pause();
            // videoElement.srcObject.getTracks().forEach(track => track.stop());
        }
    });
    