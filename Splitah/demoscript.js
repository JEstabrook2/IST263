document.addEventListener('DOMContentLoaded', function() {
    // Toggle Side Menu
    document.querySelector('.menu-trigger').addEventListener('click', function() {
        const sideMenu = document.querySelector('.side-menu');
        sideMenu.style.display = sideMenu.style.display === "block" ? "none" : "block";
    });

    // "Split My Bill" Button Event - Adjusted for functionality
    document.getElementById('startBtn').addEventListener('click', function() {
        // Hide current sections to ensure user selection page is shown
        document.querySelectorAll('section').forEach(function(section) {
            section.style.display = 'none'; // Optionally, hide all sections initially
        });

        // Directly display the user selection page
        document.getElementById('userSelectionPage').style.display = 'block';
    });

    // Host and Guest Selection
    document.getElementById('hostBtn').addEventListener('click', function() {
        console.log('Host selected');
        // Here, implement any specific actions for host selection
    });

    document.getElementById('guestBtn').addEventListener('click', function() {
        console.log('Guest selected');
        // Here, implement any specific actions for guest selection
    });

    // Submit Name and Proceed to Camera
    document.getElementById('submitName').addEventListener('click', function() {
        var userName = document.getElementById('nameInput').value;
        console.log('Name submitted: ', userName);
        document.getElementById('userSelectionPage').style.display = 'none';
        document.getElementById('cameraFeed').style.display = 'block';
        startCamera();
    });

    // Back Button Functionality Corrected
    document.getElementById('backBtn').addEventListener('click', function() {
        document.getElementById('cameraFeed').style.display = 'none';
        document.getElementById('userSelectionPage').style.display = 'block'; // Show the previous user selection page again
    });

    // Camera Start Function
    function startCamera() {
        const constraints = { video: { facingMode: "environment" } };
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            const videoElement = document.getElementById('videoElement');
            videoElement.srcObject = stream;
            videoElement.play();
            console.log('Camera feed started with rear-facing camera.');
        })
        .catch(function(err) {
            console.error('Error accessing the camera:', err);
        });
    }

    // Get the capture button element
    const captureButton = document.getElementById('captureBtn');

    // Event listener for entering full screen
    videoElement.addEventListener('fullscreenchange', function() {
        if (document.fullscreenElement) {
            // Show the capture button when entering full screen
            captureButton.style.display = 'block';
        } else {
            // Hide the capture button when exiting full screen
            captureButton.style.display = 'none';
        }
    });

    // Event listener for the capture button
    captureButton.addEventListener('click', function() {
        // Capture the image and send it for processing
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');

        // Here, you would send the imageData to your OCR reader for processing
        // For demonstration purposes, we'll log the base64 image data to the console
        console.log(imageData);
    });

});
