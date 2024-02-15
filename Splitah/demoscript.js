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

// Function to start the camera and show the camera feed
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        const videoElement = document.getElementById('videoElement');
        videoElement.srcObject = stream;
        videoElement.play();
        console.log('Camera feed started');
    })
    .catch(function(err) {
        console.error('Error accessing the camera: ', err);
    });
}
// All previous event listeners remain the same

// Capture Button logic (Assuming you've added a button with id="captureBtn" in your HTML)
document.getElementById('captureBtn').addEventListener('click', function() {
    // Assume this function captures the image from the video feed
    captureImageFromVideo();
});

// Placeholder function for capturing the image from the video feed
function captureImageFromVideo() {
    // Logic to draw video feed to a canvas and capture an image
    // This is where you'd then call Tesseract.js to process the image
    console.log('Capture image logic goes here');
}

// Example function to process the captured image with Tesseract.js
function processImageWithTesseract() {
    const canvas = document.createElement('canvas');
    // Assuming you've set canvas dimensions to match the video feed
    Tesseract.recognize(
        canvas,
        'eng', // Or any other language you're targeting
        { logger: m => console.log(m) } // Optional: log progress
    ).then(({ data: { text } }) => {
        console.log(text); // Output recognized text
        // Here you would display the recognized text for item selection
    });
}

// You'll need to implement the logic for displaying OCR results and managing item selection...

