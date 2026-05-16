//base
window.addEventListener('load', () => {
    document.body.classList.add('is-loaded');
    setTimeout(() => {
        document.body.classList.add('is-ready');
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {

    //cursor physics
    const cursor = document.querySelector('.mc-cursor');
    const core = document.querySelector('.mc-cur-core');
    const sight = document.querySelector('.mc-cur-sight');
    //cursor logic
    if (cursor && core && sight && window.innerWidth > 1024) {
        let targetX = 0, targetY = 0;
        let coreX = 0, coreY = 0;
        let sightX = 0, sightY = 0;

        const lerpFactor = 0.20; 

        let isHovered = false;
        let isMagnetic = false;
        let magneticTarget = null;

        window.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        }, { passive: true });

        // cursor reset
        function resetCursorState() {
            isHovered = false;
            cursor.classList.remove('is-hover');

            if (isMagnetic && magneticTarget) {
                magneticTarget.style.transform = 'translate3d(0, 0, 0)';
                isMagnetic = false;
                cursor.classList.remove('is-magnetic');
                magneticTarget = null;
            }
        }

        // 60fps
        function updateCursorPhysics() {
            // lerp
            coreX += (targetX - coreX) * lerpFactor;
            coreY += (targetY - coreY) * lerpFactor;

            sightX += (targetX - sightX) * (lerpFactor * 0.6); // Прицел отстает чуть сильнее для глубины
            sightY += (targetY - sightY) * (lerpFactor * 0.6);

            if (isMagnetic && magneticTarget) {
                const rect = magneticTarget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // magnification
                const pullX = (targetX - centerX) * 0.2;
                const pullY = (targetY - centerY) * 0.2;

                magneticTarget.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
            }

            // positioning
            core.style.transform = `translate3d(${coreX}px, ${coreY}px, 0) translate3d(-50%, -50%, 0)`;
            sight.style.transform = `translate3d(${sightX}px, ${sightY}px, 0) translate3d(-50%, -50%, 0) ${isHovered ? 'rotate(45deg)' : ''}`;

            requestAnimationFrame(updateCursorPhysics);
        }
        
        // animation
        requestAnimationFrame(updateCursorPhysics);

        const targetsSelector = 'a, button, .mc-avatar-w, .mc-rank-circle, .mc-soc-item, .burger-btn';

        // delegation
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest(targetsSelector);
            if (!target) return;

            isHovered = true;
            cursor.classList.add('is-hover');

            if (target.matches('button, .mc-avatar-w, .mc-rank-circle, .burger-btn')) {
                isMagnetic = true;
                cursor.classList.add('is-magnetic');
                magneticTarget = target;
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(targetsSelector)) {
                resetCursorState();
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.closest(targetsSelector)) {
                resetCursorState();
            }
        });

        window.addEventListener('blur', resetCursorState);
    }

    // mv-back and animations
    const video = document.getElementById('bgVideo');
    const overlay = document.getElementById('bgOverlay');
    const header = document.querySelector('header.main-nav');

    const profileBlocks = [
        { el: document.querySelector('.mc-prof-h'), delay: 400 },
        { el: document.querySelector('.mc-rank-plate'), delay: 600 },
        { el: document.querySelector('.mc-status-card'), delay: 800 },
        { el: document.querySelector('.artwork-showcase'), delay: 800 },
        { el: document.querySelector('.mc-soc-box'), delay: 1000 },
        { el: document.querySelector('.mc-nav2-sidebar'), delay: 1400 },
        { el: document.querySelector('.mc-sys-terminal'), delay: 1600 }
    ];

    function animateProfileBlocks() {
        profileBlocks.forEach(block => {
            if (block.el) {
                setTimeout(() => block.el.classList.add('animate-in'), block.delay);
            }
        });
    }

    if (video && overlay) {
        video.style.opacity = '0';
        overlay.style.opacity = '0';

        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translate3d(-50%, -60px, 0)';
        }

        // playback
        video.addEventListener('playing', () => {
            const easeTransition = 'opacity 2s cubic-bezier(0.23, 1, 0.32, 1)';
            video.style.transition = easeTransition;
            overlay.style.transition = easeTransition;

            video.style.opacity = '1';
            overlay.style.opacity = '0.04';

            if (header) {
                header.style.transition = 'opacity 2.2s cubic-bezier(0.23, 1, 0.32, 1), transform 2s cubic-bezier(0.23, 1, 0.32, 1)';
                header.style.opacity = '1';
                header.style.transform = 'translate3d(-50%, 0, 0)';
            }
            animateProfileBlocks();
        }, { once: true }); 

        // autoplayback
        const unlockVideo = () => {
            if (video.paused) {
                video.play().catch(err => console.log("Video play interrupted:", err));
            }
            document.removeEventListener('touchstart', unlockVideo);
            document.removeEventListener('click', unlockVideo);
        };
        document.addEventListener('touchstart', unlockVideo);
        document.addEventListener('click', unlockVideo);
    }

    //scroll and menu
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }, { passive: true });

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

    // dub clock
    const clockElement = document.getElementById('dublin-clock');
    
    if (clockElement) {
        const options = {
            timeZone: 'Europe/Dublin',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);

        function updateDublinClock() {
            clockElement.textContent = `DUB ${formatter.format(new Date())}`;
        }

        setInterval(updateDublinClock, 1000);
        updateDublinClock();
    }
});