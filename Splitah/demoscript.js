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
});
