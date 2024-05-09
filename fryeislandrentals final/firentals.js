// index script//

  // Get the image and the hover-info element
  const islandMap = document.querySelector('.island-map-small');
  const hoverInfo = document.getElementById('hover-info');

  // Function to show the hover-info
  function showHoverInfo() {
    hoverInfo.style.display = 'block';
  }

  // Function to hide the hover-info
  function hideHoverInfo() {
    hoverInfo.style.display = 'none';
  }

  // Event listeners for mouse enter and leave
  islandMap.addEventListener('mouseenter', showHoverInfo);
  islandMap.addEventListener('mouseleave', hideHoverInfo);

// Improved with transition effects
function showHoverInfo() {
  hoverInfo.style.opacity = '0';
  hoverInfo.style.display = 'block';
  setTimeout(() => hoverInfo.style.opacity = '1', 10); // Smooth fade-in transition
}

function hideHoverInfo() {
  hoverInfo.style.opacity = '0';
  setTimeout(() => hoverInfo.style.display = 'none', 250); // Delay hide to allow fade-out
}






//golf cart rentals script//
function optionsOff() {
    // Hide all the images
    document.getElementById('twoseatcart').style.display = 'none';
    document.getElementById('fourseatcart').style.display = 'none';
    document.getElementById('sixseatcart').style.display = 'none';
    document.getElementById('bike').style.display = 'none';
    document.getElementById('eletricbike').style.display = 'none';
    document.getElementById('kyack').style.display = 'none';
    document.getElementById('canoe').style.display = 'none';

    // Hide all theinformation
    document.getElementById('twoseatcartinfo').style.display = 'none';
    document.getElementById('fourseatcartinfo').style.display = 'none';
    document.getElementById('sixseatcartinfo').style.display = 'none';
    document.getElementById('bikeinfo').style.display = 'none';
    document.getElementById('eletricbikeinfo').style.display = 'none';
    document.getElementById('kyackinfo').style.display = 'none';
    document.getElementById('canoeinfo').style.display = 'none';
}
function twoseatcartOn() {
document.getElementById('2seatcart').style.display = 'block';
document.getElementById('2seatcartinfo').style.display = 'block';
}

function fourseatcartOn() {
document.getElementById('4seatcart').style.display = 'block';
document.getElementById('4seatcartinfo').style.display = 'block';
}

function sixseatcartOn() {
document.getElementById('6seatcart').style.display = 'block';
document.getElementById('6seatcartinfo').style.display = 'block';
}

function bikeOn() {
document.getElementById('bike').style.display = 'block';
document.getElementById('bikeinfo').style.display = 'block';
}

function eletricbikeOn() {
document.getElementById('eletricbike').style.display = 'block';
document.getElementById('eletricbikeinfo').style.display = 'block';
}

function kyackOn() {
document.getElementById('kyack').style.display = 'block';
document.getElementById('kyackinfo').style.display = 'block';
}

function canoeOn() {
document.getElementById('canoe').style.display = 'block';
document.getElementById('canoeinfo').style.display = 'block';
}

//hamburger// 
document.querySelector('.hamburger').addEventListener('click', function() {
    var nav = document.querySelector('.nav');
    nav.classList.toggle('is-visible'); 
});
