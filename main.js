function openModal() {
document.getElementById("webModal").style.display = "block";
}

function closeModal() {
document.getElementById("webModal").style.display = "none";
}

window.onclick = function(event) {
let modal = document.getElementById("webModal");
if (event.target == modal) {
modal.style.display = "none";
}
}

// =========================
// Typed Text Animation
// =========================

var typed = new Typed(".text", {
    strings: [
        "Full Stack Developer",
        "Web Developer",
        "MERN Developer"
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1500,
    loop: true
});


// =========================
// Mobile Navbar Toggle
// =========================

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');   // change icon animation
    navbar.classList.toggle('active');
};


// =========================
// Close Navbar when clicking link (mobile)
// =========================

document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
});


// =========================
// Scroll to Top Button
// =========================

let topButton = document.querySelector('.top');

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topButton.style.display = "flex";
    } else {
        topButton.style.display = "none";
    }

});


// =========================
// Smooth Scroll Effect
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });

    });

});