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

// --- DYNAMIC NAV SCROLL METRIC PROGRESS TRACKER ---
window.addEventListener('scroll', () => {
    if (navbar && window.innerWidth > 768) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressPercentage = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        // Pushes the exact calculation parameter into the CSS layout engine
        navbar.style.setProperty('--scroll-width', `${progressPercentage}%`);
    }
}, { passive: true }); // Passive flag ensures scrolling remains smooth

// --- ASYNCHRONOUS INTERSECTION OBSERVER REVEAL ENGINE ---
// Replaces continuous position calculations inside window scroll loops
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop tracking the element once it enters the viewport frame
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null, // Default browser window view frame boundary
    threshold: 0.12, // Element fires layout class when 12% enters screen area
    rootMargin: "0px 0px -30px 0px"
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// --- 3D PARALLAX COORDINATE MATRIX ROTATOR ---
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return; // Disable mathematical transforms on mobile

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse position inside card element frame
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Map mouse vector path coordinates into tilt parameters (-8deg to 8deg max range)
        const tiltX = ((centerY - y) / centerY) * 8;
        const tiltY = ((x - centerX) / centerX) * 8;

        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    // Smooth deceleration back to straight layout matrix on boundary leave
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});

// --- MAGNETIC BUTTON SPRING SYSTEM TRACKER ---
const magneticButtons = document.querySelectorAll('.btn');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return;

        const rect = btn.getBoundingClientRect();
        // Calculate coordinate distance offset vector from center axis
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);

        // Pull the button towards hardware cursor path by exactly 30% of vector offset
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// Hover preview for published items
const items = document.querySelectorAll('.published-item');
const preview = document.getElementById('hover-preview');
const previewImg = document.getElementById('preview-img');

if (preview && previewImg) {
    items.forEach(item => {
        // 1. When mouse enters a row
        item.addEventListener('mouseenter', () => {
            const imageSrc = item.getAttribute('data-image');
            if (imageSrc) {
                previewImg.src = imageSrc;
                preview.classList.add('visible');
            }
        });

        // 2. When mouse moves inside a row
        item.addEventListener('mousemove', (e) => {
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
}

// --- HERO IMAGE 3D MULTI-AXIS SHEEN TRACKER ---
const heroImgContainer = document.querySelector('.hero-image-interactive');

if (heroImgContainer) {
    heroImgContainer.addEventListener('mousemove', (e) => {
        // Skip processing heavy structural math operations on mobile viewports
        if (window.innerWidth <= 768) return;

        const rect = heroImgContainer.getBoundingClientRect();

        // Step 1: Calculate vector distances relative to container viewport bounds
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Step 2: Convert coordinate planes into degree metrics (-10deg to 10deg bounds)
        const rotateX = ((centerY - y) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * -10; // Reversed vector to natural tilt path

        // Step 3: Map precise percentage positioning metrics for lighting radial engine
        const sheenX = (x / rect.width) * 100;
        const sheenY = (y / rect.height) * 100;

        // Step 4: Inject mutations straight into elements
        heroImgContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        heroImgContainer.style.setProperty('--sheen-x', `${sheenX}%`);
        heroImgContainer.style.setProperty('--sheen-y', `${sheenY}%`);
    });

    // Reset components seamlessly to neutral baseline positions on boundary exit
    heroImgContainer.addEventListener('mouseleave', () => {
        heroImgContainer.style.transform = 'rotateX(0deg) rotateY(0deg)';
        heroImgContainer.style.setProperty('--sheen-x', '50%');
        heroImgContainer.style.setProperty('--sheen-y', '50%');
    });
}

// --- SMOOTH LERP CUSTOM CURSOR ENGINE ---
const customCursor = document.querySelector('.custom-cursor');

if (customCursor && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0; // Absolute hardware mouse coordinates
    let currentX = 0, currentY = 0; // Animated circle positions lagging behind

    // Track mouse movement instantly
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Continuously calculate the inertial step vector 
    // Inside your animateCursor() function in script.js:
    function animateCursor() {
        // Changing 0.15 to 0.2 makes the circle follow the visible cursor slightly closer
        currentX += (mouseX - currentX) * 0.2;
        currentY += (mouseY - currentY) * 0.2;

        customCursor.style.left = `${currentX}px`;
        customCursor.style.top = `${currentY}px`;

        requestAnimationFrame(animateCursor);
    }
    // Start loop
    requestAnimationFrame(animateCursor);

    // Add interactive expansion triggers over clickables
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .published-item');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            customCursor.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            customCursor.classList.remove('hovered');
        });
    });
}