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
// --- MULTI-AXIS 3D TILT & SHEEN TRACKER (HERO & ABOUT IMAGES) ---
const interactiveImages = document.querySelectorAll('.hero-image-interactive, .about-me-img-container');

interactiveImages.forEach(container => {
    container.addEventListener('mousemove', (e) => {
        // Skip processing heavy spatial math operations on mobile viewports
        if (window.innerWidth <= 768) return;

        const rect = container.getBoundingClientRect();

        // Step 1: Calculate cursor vector positions relative to container bounds
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Step 2: Convert coordinates into degree metrics (-10deg to 10deg bounds)
        const rotateX = ((centerY - y) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * -10; // Reversed vector to feel natural

        // Step 3: Map precise percentage positioning for lighting radial engine
        const sheenX = (x / rect.width) * 100;
        const sheenY = (y / rect.height) * 100;

        // Step 4: Inject dynamic values into elements
        container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        container.style.setProperty('--sheen-x', `${sheenX}%`);
        container.style.setProperty('--sheen-y', `${sheenY}%`);
    });

    // Reset components seamlessly back to flat baseline positions on mouse exit
    container.addEventListener('mouseleave', () => {
        container.style.transform = 'rotateX(0deg) rotateY(0deg)';
        container.style.setProperty('--sheen-x', '50%');
        container.style.setProperty('--sheen-y', '50%');
    });
});

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

// --- HERO TEXT SPLITTING & TIMED LOAD ENGINE ---
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero');
    const titles = document.querySelectorAll('.interactive-title');

    titles.forEach(title => {
        // Break text by spaces to retain words cleanly
        const words = title.textContent.split(' ');
        title.textContent = ''; // Flush original text string out

        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word-span';

            // Break individual word structures straight down to characters
            const characters = word.split('');
            characters.forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.className = 'char-span';
                charSpan.textContent = char;

                // Calculate incremental staggered delay sequence loops for page load
                // (Global sequence placement based on characters across the phrase block)
                const globalIndex = (wordIndex * 5) + charIndex;
                charSpan.style.transitionDelay = `${globalIndex * 0.04}s`;

                wordSpan.appendChild(charSpan);
            });

            title.appendChild(wordSpan);

            // Re-insert standard spacing structures back between split phrase spans
            if (wordIndex < words.length - 1) {
                const space = document.createTextNode(' ');
                title.appendChild(space);
            }
        });
    });

    // Fire the activation classes inside a safe animation frame window
    requestAnimationFrame(() => {
        if (heroSection) {
            heroSection.classList.add('loaded');
        }
    });

    // Clean up startup load delays after initial execution sequence completes
    // This allows hover transition rules to handle cursor entries immediately
    setTimeout(() => {
        document.querySelectorAll('.char-span').forEach(span => {
            span.style.transitionDelay = '0s';
        });
    }, 1500);
});
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    // 1. Force container constraints so the canvas pins perfectly to the background
    hero.style.position = "relative";
    hero.style.overflow = "hidden";

    // 2. Create and inject the Background Canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    Object.assign(canvas.style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: "1", // Placed directly behind content layers
        pointerEvents: "none" // Ensures links and buttons remain fully clickable
    });

    hero.prepend(canvas);

    // Ensure your typography layers over the canvas context safely
    const heroContent = hero.querySelector(".hero-content");
    if (heroContent) {
        heroContent.style.position = "relative";
        heroContent.style.zIndex = "10";
    }

    // 3. Handle Scaling Windows
    let width = canvas.width = hero.offsetWidth;
    let height = canvas.height = hero.offsetHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = hero.offsetWidth;
        height = canvas.height = hero.offsetHeight;
    });

    // 4. Cursor Position Vector Trackers
    let mouseX = width / 2;
    let mouseY = height / 2;
    let currentMouseX = width / 2;
    let currentMouseY = height / 2;

    hero.addEventListener("mousemove", (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    hero.addEventListener("mouseleave", () => {
        mouseX = width / 2;
        mouseY = height / 2;
    });

    // 5. Blob Engine Data (The 4 exact specific color palettes & sizing configurations)
    const blobConfigs = [
        { r: 155, g: 136, b: 220, maxAlpha: 0.65, radius: 250 }, // #9B88DC
        { r: 231, g: 139, b: 155, maxAlpha: 0.60, radius: 220 }, // #E78B9B
        { r: 255, g: 191, b: 53, maxAlpha: 1.00, radius: 180 }, // #FFBF35
        { r: 199, g: 228, b: 241, maxAlpha: 0.92, radius: 260 },  // #C7E4F1
        { r: 218, g: 156, b: 106, maxAlpha: 0.92, radius: 260 },  // #da9c6a
    ];

    // Initialize individual circle attributes (positions, individual drifting paths, opacity phases)
    const circles = blobConfigs.map((config) => {
        return {
            ...config,
            // Scattered start layout across the viewport area
            x: Math.random() * width/2,
            y: Math.random() * height/2,
            // Small target offsets for the continuous slow drift movement
            targetX: Math.random() * width,
            targetY: Math.random() * height,
            // Phase parameter tracking for the opacity pulsing loop
            alphaPhase: Math.random() * Math.PI * 2,
            alphaSpeed: 0.005 + Math.random() * 0.03, // Determines how fast opacity transitions happen
            currentAlpha: 0
        };
    });

    // 6. Main Draw Loop (Equivalent to the p5.js draw() loop function)
    function draw() {
        // Clear canvas context box per frame rendering cycle
        ctx.clearRect(0, 0, width, height);

        // Optional Base Clear Color matching layout background canvas environments
        ctx.fillStyle = "#fafafa";
        ctx.fillRect(0, 0, width, height);

        // Smooth out cursor movement vectors using a gentle inertial interpolation (LERP step layout)
        currentMouseX += (mouseX - currentMouseX) * 1;
        currentMouseY += (mouseY - currentMouseY) * 1;

        // Calculate a tiny global layout offset factor based on cursor center variance
        const cursorOffsetX = (currentMouseX - width / 2) * 0.08;
        const cursorOffsetY = (currentMouseY - height / 2) * 0.08;

        circles.forEach((circle) => {
            // A. Update coordinate drift arrays smoothly over runtime metrics
            circle.x += (circle.targetX - circle.x) * 0.005;
            circle.y += (circle.targetY - circle.y) * 0.005;

            // Pick a brand new coordinate position cluster if a blob approaches its destination target boundaries
            if (Math.abs(circle.targetX - circle.x) < 10 && Math.abs(circle.targetY - circle.y) < 10) {
                circle.targetX = Math.random() * width;
                circle.targetY = Math.random() * height;
            }

            // B. Animate opacity states from 0 to max alpha seamlessly using standard Math.sin equations
            circle.alphaPhase += circle.alphaSpeed;
            // Maps the sin curve window (-1 to 1) beautifully straight into positive values (0 to 1)
            const pulseFactor = (Math.sin(circle.alphaPhase) + 1) / 2;
            circle.currentAlpha = pulseFactor * circle.maxAlpha;

            // C. Combine dynamic position attributes + soft tracking displacements
            const renderX = circle.x + cursorOffsetX;
            const renderY = circle.y + cursorOffsetY;

            // D. Render the radiant blur glow utilizing a precise radial gradient paint stroke setup
            const gradient = ctx.createRadialGradient(
                renderX, renderY, 0,
                renderX, renderY, circle.radius
            );

            gradient.addColorStop(0, `rgba(${circle.r}, ${circle.g}, ${circle.b}, ${circle.currentAlpha})`);
            gradient.addColorStop(0.7, `rgba(${circle.r}, ${circle.g}, ${circle.b}, ${circle.currentAlpha * 0.5})`);
            gradient.addColorStop(1, `rgba(${circle.r}, ${circle.g}, ${circle.b}, 0)`); // Soft transparent boundary edge

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(renderX, renderY, circle.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    // Fire rendering thread cycle
    requestAnimationFrame(draw);
});