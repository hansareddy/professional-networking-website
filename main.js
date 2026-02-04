import './style.css'

// Add scroll effects
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    const logo = document.getElementById('nav-logo');
    if (window.scrollY > 20) {
        nav.classList.add('bg-white/100', 'shadow-2xl');
        nav.classList.remove('bg-gray-50/95', 'shadow-xl');
        // nav.classList.add('py-1');
        // nav.classList.remove('py-2');
        if (logo) {
            // logo.classList.add('h-14');
            // logo.classList.remove('h-20');
        }
    } else {
        nav.classList.add('bg-gray-50/95', 'shadow-xl');
        nav.classList.remove('bg-white/100', 'shadow-2xl');
        // nav.classList.add('py-4'); // Reset to py-4 matches initial HTML
        // nav.classList.remove('py-2');
        if (logo) {
            // logo.classList.add('h-20');
            // logo.classList.remove('h-14');
        }
    }
});

// Mobile Menu Functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu && closeMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close menu when a link is clicked
            mobileMenu.classList.add('translate-x-full');

            // Handle scroll target if applicable
            const targetAttr = link.getAttribute('data-target');
            const hrefAttr = link.getAttribute('href');
            const targetId = targetAttr || (hrefAttr && hrefAttr.startsWith('#') ? hrefAttr.substring(1) : null);

            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Check if it's the join-container toggle which might need special handling or just scrolling
                    // For now, let the smooth scroll handler below take care of 'href', 
                    // but we might need to manually trigger scroll if the default action is prevented by the other listener.
                    // Actually, the existing smooth scroll listener works on [data-target] and a[href^="#"],
                    // but since we preventDefault there, we need to ensure the menu closing happens first.
                    // The menu closing adds the class, which is instant.
                }
            }
        });
    });
}

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

// Mobile Snap Highlight Logic (Features & Industries)
const setupMobileSnap = (containerId) => {
    const container = document.getElementById(containerId);
    if (container && window.innerWidth < 768) {
        const mobileCards = container.querySelectorAll('.glass-card-new');
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    mobileCards.forEach(card => card.classList.remove('mobile-snap-active'));
                    entry.target.classList.add('mobile-snap-active');
                }
            });
        }, {
            root: container,
            threshold: 0.6
        });
        mobileCards.forEach(card => cardObserver.observe(card));
    }
};

// Initialize for both sections
setupMobileSnap('features-scroll');
setupMobileSnap('industries-scroll');

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        if (backToTopBtn) {
            backToTopBtn.classList.remove('translate-y-24', 'opacity-0');
            backToTopBtn.classList.add('translate-y-0', 'opacity-100');
        }
    } else {
        if (backToTopBtn) {
            backToTopBtn.classList.add('translate-y-24', 'opacity-0');
            backToTopBtn.classList.remove('translate-y-0', 'opacity-100');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
