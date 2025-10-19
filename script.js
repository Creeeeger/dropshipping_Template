const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const yearEl = document.getElementById('year');

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
    navToggle.setAttribute('aria-expanded', 'false');

    const toggleNav = () => {
        nav.classList.toggle('is-open');
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
    };

    navToggle.addEventListener('click', toggleNav);
    navToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleNav();
        }
    });

    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
            nav.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    const navLinks = document.querySelectorAll('.site-nav__link');
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const swatchLists = document.querySelectorAll('.swatch-list');
swatchLists.forEach((list) => {
    const targetClass = list.dataset.target;
    const imageEl = document.querySelector(`.${targetClass}`);

    list.querySelectorAll('li').forEach((swatch) => {
        swatch.addEventListener('click', () => {
            const newSrc = swatch.dataset.image;
            if (newSrc && imageEl) {
                imageEl.src = newSrc;
            }
        });

        swatch.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                swatch.click();
            }
        });

        swatch.setAttribute('tabindex', '0');
        swatch.setAttribute('role', 'button');
    });
});
