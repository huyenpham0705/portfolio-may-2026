// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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