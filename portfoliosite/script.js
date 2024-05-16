function showNav() {
    document.getElementById("navlinks").style.display = "block";
}

function hideNav() {
    document.getElementById("navlinks").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const mobileMenu = document.querySelector('#hamicon');
    const navList = document.querySelector('#navlinks');
    const closeBtn = document.querySelector('#close');

    mobileMenu.addEventListener('click', () => {
        navList.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        navList.style.display = 'none';
    });
});
