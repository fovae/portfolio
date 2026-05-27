//base
window.addEventListener('load', () => {
    document.body.classList.add('is-loaded');
    setTimeout(() => {
        document.body.classList.add('is-ready');
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {

    const cursor = document.querySelector('.mc-cursor');
    const core = document.querySelector('.mc-cur-core');
    const sight = document.querySelector('.mc-cur-sight');

    if (cursor && core && sight && window.innerWidth > 1024) {
        let targetX = 0, targetY = 0;
        let coreX = 0, coreY = 0;
        let sightX = 0, sightY = 0;

        // Тайминги для независимого от FPS плавного движения (LERP)
        let lastTime = performance.now();
        const BASE_LERP = 0.12; 

        let isHovered = false;
        let isMagnetic = false;
        
        // Объект для кэширования геометрии магнитной цели
        let magneticData = {
            el: null,
            centerX: 0,
            centerY: 0
        };

        window.addEventListener('pointermove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        }, { passive: true });

        function resetCursorState() {
            if (!isHovered && !isMagnetic) return; // избегаем лишней работы с DOM
            
            isHovered = false;
            cursor.classList.remove('is-hover');

            if (isMagnetic && magneticData.el) {
                magneticData.el.style.transform = '';
                isMagnetic = false;
                cursor.classList.remove('is-magnetic');
                magneticData.el = null;
            }
        }

        function updateCursorPhysics(now) {
            // Вычисляем дельту времени для выравнивания скорости на 60Hz/144Hz/240Hz
            const deltaTime = Math.min((now - lastTime) / 16.666, 3); 
            lastTime = now;

            // Корректируем коэффициент интерполяции под герцовку экрана
            const actualCoreLerp = 1 - Math.pow(1 - BASE_LERP, deltaTime);
            const actualSightLerp = 1 - Math.pow(1 - (BASE_LERP * 0.7), deltaTime);

            coreX += (targetX - coreX) * actualCoreLerp;
            coreY += (targetY - coreY) * actualCoreLerp;

            sightX += (targetX - sightX) * actualSightLerp;
            sightY += (targetY - sightY) * actualSightLerp;

            // Логика магнетизма без вызова getBoundingClientRect внутри кадра!
            if (isMagnetic && magneticData.el) {
                const pullX = (targetX - magneticData.centerX) * 0.28;
                const pullY = (targetY - magneticData.centerY) * 0.28;

                magneticData.el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
            }

            // Рендеринг позиций слоев курсора
            core.style.transform = `translate3d(${coreX}px, ${coreY}px, 0) translate3d(-50%, -50%, 0)`;
            sight.style.transform = `translate3d(${sightX}px, ${sightY}px, 0) translate3d(-50%, -50%, 0) ${isHovered ? 'rotate(45deg) scale(1.2)' : ''}`;

            requestAnimationFrame(updateCursorPhysics);
        }
        
        requestAnimationFrame(updateCursorPhysics);

        const targetsSelector = 'a, button, .mc-avatar-w, .mc-rank-circle, .mc-soc-item, .burger-btn';

        // Оптимизированный захват наведения через pointerover
        document.addEventListener('pointerover', (e) => {
            const target = e.target.closest(targetsSelector);
            if (!target) return;

            isHovered = true;
            cursor.classList.add('is-hover');

            if (target.matches('button, .mc-avatar-w, .mc-rank-circle, .burger-btn')) {
                isMagnetic = true;
                cursor.classList.add('is-magnetic');
                
                // Считаем геометрию ОДИН раз при наведении, сохраняя FPS!
                const rect = target.getBoundingClientRect();
                magneticData.el = target;
                magneticData.centerX = rect.left + rect.width / 2;
                magneticData.centerY = rect.top + rect.height / 2;
            }
        });

        // Жесткий и надежный сброс при выходе за пределы интерактивного элемента
        document.addEventListener('pointerout', (e) => {
            const target = e.target.closest(targetsSelector);
            // Если мы уходим с таргет-элемента вообще наружу
            if (target && !e.relatedTarget?.closest(targetsSelector)) {
                resetCursorState();
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.closest(targetsSelector)) {
                // Плавный сброс, чтобы не ломать анимацию клика
                setTimeout(resetCursorState, 50); 
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