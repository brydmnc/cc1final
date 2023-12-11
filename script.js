function smoothScroll(target) {
    const element = document.querySelector(target);
    const elementPosition = element.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = elementPosition - 50; // 

    let startTime = null;
    const duration = 800;

    function animation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        const timeElapsed = currentTime - startTime;
        const ease = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, ease);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        smoothScroll(target);
        highlightNavLink(target);
        toggleMobileMenu();
    });
});

function highlightNavLink(target) {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`nav a[href="${target}"]`).classList.add('active');
}

function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
}

document.addEventListener('click', function (e) {
    if (!document.querySelector('nav').contains(e.target)) {
        const nav = document.querySelector('nav ul');
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    }
});
