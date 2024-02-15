// Event listener for "Let's Split My Bill" button
document.getElementById('startBtn').addEventListener('click', function() {
    // Hide the landing page and show the user selection page
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('userSelectionPage').style.display = 'block';
    console.log('Navigate to the user selection page');
});

// Event listener for "Host" button
document.getElementById('hostBtn').addEventListener('click', function() {
    console.log('Host selected');
    // Implement logic for host selection here
    // You might want to store this selection for later use
});

// Event listener for "Guest" button
document.getElementById('guestBtn').addEventListener('click', function() {
    console.log('Guest selected');
    // Implement logic for guest selection here
    // You might want to store this selection for later use
});

// Event listener for submitting the name
document.getElementById('submitName').addEventListener('click', function() {
    var userName = document.getElementById('nameInput').value;
    console.log('Name submitted:', userName);
    // Here you can hide the user selection page and proceed to camera access and receipt scanning
    // This might involve displaying another page or section for the camera interaction
    document.getElementById('userSelectionPage').style.display = 'none';
    document.getElementById('cameraFeed').style.display = 'block';
    startCamera();
});

// Event listener for the "Back" button
document.getElementById('backBtn').addEventListener('click', function() {
    // Hide the camera feed and show the user selection page
    document.getElementById('cameraFeed').style.display = 'none';
    document.getElementById('userSelectionPage').style.display = 'block';
    console.log('Navigate back to the user selection page');
});
document.getElementById('submitName').addEventListener('click', function() {
    // Hide current content and show the camera feed container
    document.getElementById('userSelectionPage').style.display = 'none';
    document.getElementById('cameraFeed').style.display = 'block';

    // Start the camera
    startCamera();
});

// Function to start the camera and show the camera feed, using the rear camera if available
function startCamera() {
    const constraints = {
        video: { facingMode: "environment" }  // Attempts to use the rear camera on devices
    };

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
document.getElementById('startBtn').addEventListener('click', function() {
    // Example of scrolling to the "How It Works" section
    document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });

    // Or, if proceeding directly to another action:
    // document.getElementById('userSelectionPage').style.display = 'block';
    // Hide or adjust visibility of other sections as necessary
});

// Adjusted event listener for the "Capture" button
document.getElementById('captureBtn').addEventListener('click', function() {
    captureImageFromVideo();
});

// Function to capture the image from the video feed and process it with Tesseract.js
function captureImageFromVideo() {
    const video = document.getElementById('videoElement');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Now that we have the image on the canvas, we can process it with Tesseract.js
    processImageWithTesseract(canvas);
}

// Function to process the captured image with Tesseract.js
function processImageWithTesseract(canvas) {
    Tesseract.recognize(
        canvas,
        'eng', // Change to the appropriate language as needed
        { logger: m => console.log(m) } // Log OCR progress
    ).then(({ data: { text } }) => {
        console.log('Recognized text:', text);
        // Display the recognized text for item selection or further processing
        displayOCRResults(text);
    }).catch(error => {
        console.error('OCR error:', error);
    });
}

// Function to display OCR results and enable item selection (this needs to be implemented)
function displayOCRResults(text) {
    // Split the text into lines or items, and display them in a way that users can select
    console.log('Display and select items logic goes here');
}

// Additional logic for displaying OCR results and managing item selections goes here

document.querySelector('.menu-trigger').addEventListener('click', function() {
    const sideMenu = document.querySelector('.side-menu');
    if (sideMenu.style.display === "none") {
        sideMenu.style.display = "block";
    } else {
        sideMenu.style.display = "none";
    }
});
