import './style.css'

// Add scroll effects if needed
// Add scroll effects
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    const logo = document.getElementById('nav-logo');
    if (window.scrollY > 20) {
        nav.classList.add('py-1', 'bg-white/100', 'shadow-2xl');
        nav.classList.remove('py-2', 'bg-gray-50/95', 'shadow-xl');
        logo.classList.add('h-14');
        logo.classList.remove('h-20');
    } else {
        nav.classList.add('py-2', 'bg-gray-50/95', 'shadow-xl');
        nav.classList.remove('py-1', 'bg-white/100', 'shadow-2xl');
        logo.classList.add('h-20');
        logo.classList.remove('h-14');
    }
});

// Reveal on Scroll Observer
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));

console.log('Professional Networking Site Initialized');

const joinForm = document.getElementById('joinForm');
if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const container = document.getElementById('join-container');
        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 class="text-4xl md:text-5xl font-bold mb-6">Thank You for <span class="text-brand-accent">Connecting!</span></h2>
                <p class="text-xl text-brand-muted mb-8 max-w-2xl mx-auto">
                    We're excited to have you as part of our growing community. To get started, join our community WhatsApp group to interact, share opportunities, and collaborate.
                </p>
                <div class="p-4 bg-white/5 border border-white/10 rounded-xl inline-block">
                    <p class="text-brand-accent-pink font-mono text-sm">[Insert WhatsApp Group Link Here]</p>
                </div>
            </div>
        `;
    });
}

// Smooth Scroll for elements with data-target
document.querySelectorAll('[data-target], a[href^="#"]').forEach(el => {
    el.addEventListener('click', (e) => {
        const targetAttr = el.getAttribute('data-target');
        const hrefAttr = el.getAttribute('href');
        const targetId = targetAttr || (hrefAttr && hrefAttr.startsWith('#') ? hrefAttr.substring(1) : null);

        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
