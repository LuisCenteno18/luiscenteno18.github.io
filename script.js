// ==========================================
// DOM Elements
// ==========================================
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// ==========================================
// Navigation Behavior
// ==========================================
// Change Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ==========================================
// Intersection Observer for Animations
// ==========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            // Optional: stop observing once animated to keep it shown
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Select all elements to animate
const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');
fadeElements.forEach(el => observer.observe(el));

// Delay hero animations slightly on load
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#hero .fade-in-up');
        heroElements.forEach(el => el.classList.add('appear'));
    }, 100);
});


// ==========================================
// Dynamic Canvas Background (Stars / Space Effect)
// ==========================================
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Setup canvas dimension
    function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Far away stars are smaller and slower
            this.size = Math.random() * 2 + 0.1;
            this.speedX = (Math.random() - 0.5) * 0.3;
            // Move slowly upwards
            this.speedY = (Math.random() - 0.5) * 0.3 - Math.random() * 0.5;
            this.opacity = Math.random();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Twinkle effect
            this.opacity += (Math.random() - 0.5) * 0.05;
            if (this.opacity < 0.1) this.opacity = 0.1;
            if (this.opacity > 1) this.opacity = 1;

            // Reset position if it goes off screen
            if (this.y < 0) {
                this.y = height;
                this.x = Math.random() * width;
            }
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // Darker blue/cyan tint to stars for light background
            ctx.fillStyle = `rgba(2, 132, 199, ${this.opacity * 0.5})`;
            ctx.fill();
        }
    }

    // Create particles based on screen size
    function initParticles() {
        particles = [];
        const particleCount = Math.floor((width * height) / 8000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        initCanvas();
        initParticles();
    });

    // Start
    initCanvas();
    initParticles();
    animate();
}
