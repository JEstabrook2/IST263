document.addEventListener('DOMContentLoaded', function() {
    // Toggle Side Menu
    document.querySelector('.menu-trigger').addEventListener('click', function() {
        const sideMenu = document.querySelector('.side-menu');
        sideMenu.style.display = sideMenu.style.display === "block" ? "none" : "block";
    });

    // "Split My Bill" Button Event
    document.getElementById('startBtn').addEventListener('click', function() {
        document.querySelectorAll('section').forEach(function(section) {
            section.style.display = 'none';
        });
        document.getElementById('userSelectionPage').style.display = 'block';
    });

    // Host and Guest Selection
    document.getElementById('hostBtn').addEventListener('click', function() {
        console.log('Host selected');
    });

    document.getElementById('guestBtn').addEventListener('click', function() {
        console.log('Guest selected');
    });

    // Submit Name and Proceed to Camera
    document.getElementById('submitName').addEventListener('click', function() {
        var userName = document.getElementById('nameInput').value;
        console.log('Name submitted: ', userName);
        document.getElementById('userSelectionPage').style.display = 'none';
        document.getElementById('cameraFeed').style.display = 'block';
        startCamera();
    });

    // Back Button Functionality
    document.getElementById('backBtn').addEventListener('click', function() {
        document.getElementById('cameraFeed').style.display = 'none';
        document.getElementById('userSelectionPage').style.display = 'block';
    });

    // Camera Start Function
    function startCamera() {
        const videoElement = document.getElementById('videoElement');
        const constraints = { video: { facingMode: "environment" } };
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            videoElement.srcObject = stream;
            videoElement.play();
        })
        .catch(function(err) {
            console.error('Error accessing the camera:', err);
        });
    }

    document.getElementById('captureBtn').addEventListener('click', function() {
        const videoElement = document.getElementById('videoElement');
        captureAndProcessImage(videoElement);
    });

    // Capture the image and process it with OCR
    function captureAndProcessImage(videoElement) {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(function(blob) {
            performOCR(blob);
        }, 'image/jpeg');
    }

    // Perform OCR on the captured image Blob
    function performOCR(imageBlob) {
        Tesseract.recognize(
            imageBlob,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            console.log('Recognized Text:', text);
            processReceiptText(text);
        }).catch((err) => {
            console.error('OCR Error:', err);
        });
    }

    // Process recognized text to extract items and prices
    function processReceiptText(text) {
        const lines = text.split('\n');
        const itemRegex = /(.+?)\s+(\d+\.\d{2})$/;
        const items = lines.map(line => {
            const match = line.match(itemRegex);
            return match ? { item: match[1], price: match[2] } : null;
        }).filter(item => item !== null);

        console.log(items);
        displayItemsForSelection(items);
    }

    // Display items for user selection
    function displayItemsForSelection(items) {
        const selectionContainer = document.getElementById('itemSelectionContainer');
        selectionContainer.innerHTML = '';
        selectionContainer.style.display = 'block'; // Make sure to display the container
        
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

    // Handle the selected items when user clicks "Add Selected to Cart"
    function handleSelectedItems() {
        const selectedItems = [];
        document.querySelectorAll('#itemSelectionContainer input[type="checkbox"]:checked').forEach(checkbox => {
            selectedItems.push(JSON.parse(checkbox.value));
        });
        
        console.log(selectedItems); // For demonstration, replace with your cart handling logic
    }
});
