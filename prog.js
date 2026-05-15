//base
window.addEventListener('load', () => {
    document.body.classList.add('is-loaded');
    setTimeout(() => {
        document.body.classList.add('is-ready');
    }, 500);
});
//mv-back
const video = document.getElementById('bgVideo');
const overlay = document.getElementById('bgOverlay');
const videoWrapper = document.querySelector('.video-wrapper');
const heroText = document.querySelector('.glow-text');
const header = document.querySelector('header.main-nav');

if (video && overlay) {
    video.style.opacity = '0';
    overlay.style.opacity = '0';
    
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translate(-50%, -60px)';
    }

    video.addEventListener('playing', () => {
        const transition = 'opacity 2s cubic-bezier(0.23, 1, 0.32, 1)';
        video.style.transition = transition;
        overlay.style.transition = transition;
        video.style.opacity = '1';
        overlay.style.opacity = '0.04';
        if (header) {
            header.style.transition = 'opacity 2.2s cubic-bezier(0.23, 1, 0.32, 1), transform 2s cubic-bezier(0.23, 1, 0.32, 1)';
            header.style.opacity = '1';
            header.style.transform = 'translate(-50%, 0)';
        }
    });

    const unlockVideo = () => {
        if (video.paused) video.play();
        document.removeEventListener('touchstart', unlockVideo);
        document.removeEventListener('click', unlockVideo);
    };
    document.addEventListener('touchstart', unlockVideo);
    document.addEventListener('click', unlockVideo);

    video.addEventListener('ended', () => {
        video.play();
    });
}
//scroll
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (scrollY > 50) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }

    if (videoWrapper) {
        const offset = scrollY * 0.15;
        videoWrapper.style.transform = `translate3d(0, ${offset}px, 0)`;
    }

    if (heroText) {
        const opacity = 1 - (scrollY / 600);
        const textOffset = -scrollY * 0.1;
        heroText.style.opacity = Math.max(opacity, 0);
        heroText.style.transform = `translate3d(0, ${textOffset}px, 0)`;
    }
}, { passive: true });
//burger
const burgerBtn = document.querySelector('.burger-btn');
const cyberMenu = document.querySelector('.cyber-hud-menu');
const hudNav = document.querySelector('.hud-nav');
const hudLinks = document.querySelectorAll('.hud-link');

if (burgerBtn) {
    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.body.classList.toggle('hud-open');
    });
}

hudLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('hud-open');
    });
});

if (cyberMenu && hudNav) {
    cyberMenu.addEventListener('click', (e) => {
        if (!hudNav.contains(e.target)) {
            document.body.classList.remove('hud-open');
        }
    });
}