// =========================
// Typed.js Animation
// =========================
if (document.querySelector('.text')) {
    var typed = new Typed(".text", {
        strings: [
            "Full Stack Developer",
            "MERN Stack Developer",
            "Problem Solver"
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        loop: true
    });
}

// =========================
// Navbar Scroll Effect & Mobile Menu
// =========================
const navbar = document.getElementById('navbar');
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('bx-menu', 'bx-x');
        } else {
            icon.classList.replace('bx-x', 'bx-menu');
        }
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuIcon.querySelector('i');
            icon.classList.replace('bx-x', 'bx-menu');
        }
    });
});

// =========================
// Initializing Scroll Reveal
// =========================
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// =========================
// Stats Counter Animation
// =========================
const counters = document.querySelectorAll('.counter');
let hasCounted = false;

window.addEventListener('scroll', () => {
    // Only run counter if the about section is in view
    const statsSection = document.querySelector('.about-grid');
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100 && !hasCounted) {
        hasCounted = true;
        counters.forEach(counter => {
            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 40; // Adjust speed here
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCounter();
        });
    }
});

// =========================
// Contact Form Submission
// =========================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        const feedback = document.getElementById('form-feedback');
        
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        // Button loading state
        submitBtn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
        submitBtn.style.opacity = '0.7';

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            const data = await res.json();

            feedback.style.display = 'block';
            if (res.ok) {
                feedback.style.color = '#10b981'; // Green success
                feedback.innerText = data.message;
                contactForm.reset();
            } else {
                feedback.style.color = '#ef4444'; // Red error
                feedback.innerText = data.error || "Something went wrong.";
            }
        } catch (error) {
            feedback.style.display = 'block';
            feedback.style.color = '#ef4444';
            feedback.innerText = "Network error. Make sure the Node server is running via `node server.js`!";
        } finally {
            // Restore button
            submitBtn.innerHTML = 'Send Message <i class="bx bx-send"></i>';
            submitBtn.style.opacity = '1';
        }
    });
}