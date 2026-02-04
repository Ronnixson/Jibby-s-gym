// Change navbar background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = '#000';
        nav.style.padding = '15px 8%';
    } else {
        nav.style.background = 'rgba(15, 15, 15, 0.95)';
        nav.style.padding = '20px 8%';
    }
});

// Simple animation trigger for cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

document.querySelectorAll('.price-card').forEach((el) => observer.observe(el));