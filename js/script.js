// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');

if (navbar && navLinks && !navbar.querySelector('.nav-toggle')) {
    const navToggle = document.createElement('button');
    navToggle.type = 'button';
    navToggle.className = 'nav-toggle';
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    navbar.insertBefore(navToggle, navLinks);

    // Easing curve mimicking a premium editorial feel (fast start, slow brake)
    const customEasing = 'cubic-bezier(0.16, 1, 0.3, 1)';

    const openMenu = () => {
        navLinks.classList.add('is-open');
        navToggle.classList.add('is-open');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('nav-open');

        // JS Slide In: Right to Left
        navLinks.animate([
            { transform: 'translateX(100%)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 600,
            easing: customEasing,
            fill: 'forwards' // Keeps the menu at translateX(0) when finished
        });
    };

    const closeMenu = () => {
        // Only run close animation if the menu is actually open
        if (navLinks.classList.contains('is-open')) {
            navToggle.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');

            // JS Slide Out: Left to Right
            const slideOut = navLinks.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(100%)' }
            ], {
                duration: 600,
                easing: customEasing,
                fill: 'forwards'
            });

            // Wait for the JS animation to finish before clearing the class layout
            slideOut.onfinish = () => {
                navLinks.classList.remove('is-open');
            };
        }
    };

    // Toggle click controller logic
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('is-open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking navigation anchor links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            // Cancel any active JS styles when resizing back to desktop viewports
            navLinks.style.transform = '';
            closeMenu();
        }
    });

    window.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

// Reveal sections on scroll
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', reveal);
// Run once on load
reveal();

// Hover preview for published items
const items = document.querySelectorAll('.published-item');
const preview = document.getElementById('hover-preview');
const previewImg = document.getElementById('preview-img');

items.forEach(item => {
    // 1. When mouse enters a row
    item.addEventListener('mouseenter', (e) => {
        const imageSrc = item.getAttribute('data-image');
        previewImg.src = imageSrc;
        preview.classList.add('visible');
    });

    // 2. When mouse moves inside a row
    item.addEventListener('mousemove', (e) => {
        // e.clientX and e.clientY obtain hardware cursor window positions
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Push styles seamlessly to follow cursor path
        preview.style.top = `${mouseY}px`;
        preview.style.left = `${mouseX}px`;
    });

    // 3. When mouse leaves a row
    item.addEventListener('mouseleave', () => {
        preview.classList.remove('visible');
    });
});