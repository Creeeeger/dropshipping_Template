const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const yearEl = document.getElementById('year');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setYear() {
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

function closeNav() {
    if (siteNav) {
        siteNav.dataset.open = 'false';
        navToggle?.setAttribute('aria-expanded', 'false');
    }
}

function openNav() {
    if (siteNav) {
        siteNav.dataset.open = 'true';
        navToggle?.setAttribute('aria-expanded', 'true');
    }
}

function toggleNav() {
    if (!siteNav) return;
    const isOpen = siteNav.dataset.open === 'true';
    if (isOpen) {
        closeNav();
    } else {
        openNav();
    }
}

function handleResize() {
    if (!siteNav) return;
    if (window.innerWidth > 768) {
        openNav();
    } else {
        closeNav();
    }
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();

            if (!prefersReducedMotion) {
                target.scrollIntoView({ behavior: 'smooth' });
            } else {
                target.scrollIntoView();
            }

            if (link.closest('.site-nav') && window.innerWidth <= 768) {
                closeNav();
            }
        });
    });
}

navToggle?.addEventListener('click', toggleNav);
window.addEventListener('resize', handleResize);

handleResize();
setYear();
initSmoothScroll();
