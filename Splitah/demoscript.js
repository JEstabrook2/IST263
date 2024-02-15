document.addEventListener('DOMContentLoaded', function() {
    // Toggle Side Menu
    document.querySelector('.menu-trigger').addEventListener('click', function() {
        const sideMenu = document.querySelector('.side-menu');
        sideMenu.style.display = sideMenu.style.display === "block" ? "none" : "block";
    });

    // Adjusted "Split My Bill" Button Event to show User Selection Page
    document.getElementById('startBtn').addEventListener('click', function() {
        // Hide sections you don't want to display and show the user selection page
        document.getElementById('introduction').style.display = 'none'; // Hide introduction section
        document.getElementById('how-it-works').style.display = 'none'; // Hide 'how-it-works' section
        document.getElementById('userSelectionPage').style.display = 'block'; // Show user selection page
    });

    // Host and Guest Selection remains unchanged
    document.getElementById('hostBtn').addEventListener('click', function() {
        console.log('Host selected');
        // Implement any specific actions for host selection here
    });

    document.getElementById('guestBtn').addEventListener('click', function() {
        console.log('Guest selected');
        // Implement any specific actions for guest selection here
    });

    // Submit Name and Proceed to Camera
    document.getElementById('submitName').addEventListener('click', function() {
        var userName = document.getElementById('nameInput').value;
        console.log('Name submitted:', userName);
        document.getElementById('userSelectionPage').style.display = 'none';
        document.getElementById('cameraFeed').style.display = 'block';
        startCamera();
    });

    // Back Button Functionality
    document.getElementById('backBtn').addEventListener('click', function() {
        document.getElementById('userSelectionPage').style.display = 'none';
        // Show whichever section is appropriate for "Back" action; adjust as needed
        document.getElementById('introduction').style.display = 'block';
    });

    // Camera Start Function remains unchanged
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

    // Adjusted Capture Button Event to include the captureImageFromVideo function definition
    document.getElementById('captureBtn').addEventListener('click', function() {
        captureImageFromVideo();
    });

    // Define the captureImageFromVideo function if not already defined
    function captureImageFromVideo() {
        // Placeholder function for capturing video; implement as required
        console.log('Capture image functionality goes here.');
    }
});
