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
        document.getElementById('captureBtn').style.display = 'block';

        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                videoElement.srcObject = stream;
                videoElement.play();
                document.getElementById('captureBtn').style.display = 'block'; // Make button visible
                document.querySelector('.overlay-text').style.visibility = 'visible'; // Make instructional text visible
                enterFullScreen(document.querySelector('.video-container')); // Go full-screen
            })
            .catch(err => console.error('Error accessing the camera:', err));
    }

    // Adjusted for entering and managing full-screen mode
    function enterFullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) { // Safari
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE11
            element.msRequestFullscreen();
        }
        // Adjust styling for visibility of overlay elements
        setTimeout(() => { // Ensure elements are visible after entering full screen
            document.getElementById('captureBtn').style.visibility = 'visible';
            document.querySelector('.overlay-text').style.visibility = 'visible';
        }, 100);
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
        const lines = text.split('\n');
        const itemRegex = /(.+?)\s+(\d+\.\d{2})$/;
        const items = lines.map(line => {
            const match = line.match(itemRegex);
            return match ? { item: match[1], price: match[2] } : null;
        }).filter(item => item !== null);

        displayItemsForSelection(items);
    }

    function displayItemsForSelection(items) {
        const selectionContainer = document.getElementById('itemSelectionContainer');
        selectionContainer.innerHTML = '';
        selectionContainer.style.display = 'block';
        
        const list = document.createElement('ul');
        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'item' + index;
            checkbox.value = JSON.stringify(item);
            
            const label = document.createElement('label');
            label.htmlFor = 'item' + index;
            label.textContent = `${item.item}: $${item.price}`;
            
            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            list.appendChild(listItem);
        });
        selectionContainer.appendChild(list);
        
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Add Selected to Cart';
        submitButton.addEventListener('click', handleSelectedItems);
        selectionContainer.appendChild(submitButton);
    }

    function handleSelectedItems() {
        const selectedItems = [];
        document.querySelectorAll('#itemSelectionContainer input[type="checkbox"]:checked').forEach(checkbox => {
            selectedItems.push(JSON.parse(checkbox.value));
        });
        
        console.log(selectedItems); // Ideally, integrate with your cart system or further processing here
    }
});
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        console.log('Exited full-screen mode.');
        // Adjust UI as needed. For example:
        document.getElementById('captureBtn').style.visibility = 'hidden';
        document.querySelector('.overlay-text').style.visibility = 'hidden';
        // Optionally, you might want to resume or reset the video feed here.
    } else {
        // Full-screen mode entered
        document.getElementById('captureBtn').style.visibility = 'visible';
        document.querySelector('.overlay-text').style.visibility = 'visible';
    }
});
