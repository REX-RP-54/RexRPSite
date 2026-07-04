document.addEventListener('DOMContentLoaded', function() {
    // ПРЕЛОАДЕР
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => { preloader.classList.add('hidden'); }, 2500);
    }

    // ПЕЧАТНАЯ МАШИНКА (только на главной)
    const typewriterElement = document.getElementById('typewriterText');
    if (typewriterElement) {
        const phrases = [
            'Создай свою историю в криминальном мире',
            'Стань лидером банды или бизнесменом',
            'Участвуй в обзвонах и зарабатывай авторитет',
            'Строй свою империю на REX RP',
            'Выбирай свой путь: полиция, мафия или бизнес'
        ];
        let currentPhraseIndex = 0, currentCharIndex = 0, isDeleting = false;
        
        function typeWriter() {
            const currentPhrase = phrases[currentPhraseIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }
            let speed = isDeleting ? 50 : 100;
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                speed = 3000;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                speed = 500;
            }
            setTimeout(typeWriter, speed);
        }
        setTimeout(typeWriter, 1000);
    }

    // СЧЁТЧИК ОНЛАЙН
    const onlineCount = document.getElementById('onlineCount');
    if (onlineCount) {
        let count = 78; // ← МЕНЯЙ ЦИФРУ ЗДЕСЬ
        let current = 0;
        const duration = 1500;
        const steps = 60;
        const increment = count / steps;
        const stepDuration = duration / steps;
        const timer = setInterval(() => {
            current += increment;
            if (current >= count) {
                current = count;
                clearInterval(timer);
            }
            onlineCount.textContent = Math.floor(current);
        }, stepDuration);
    }

    // СВЕТ ЗА КУРСОРОМ
    const glow = document.getElementById('globalGlow');
    if (glow) {
        document.addEventListener('mousemove', function(e) {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
            glow.classList.add('active');
        });
        document.addEventListener('mouseleave', function() { glow.classList.remove('active'); });
    }

    // ЧАСТИЦЫ
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 80;
        
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();
        
        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 4 + 1;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.8 + 0.3;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) { this.reset(); }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(46, 204, 113, ${this.opacity})`;
                ctx.shadowColor = 'rgba(46, 204, 113, 0.3)';
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
        for (let i = 0; i < particleCount; i++) { particles.push(new Particle()); }
        
        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // КНОПКА "НАВЕРХ"
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) { backToTop.classList.add('visible'); }
            else { backToTop.classList.remove('visible'); }
        });
        backToTop.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    // МОДАЛКА DISCORD
    const discordModal = document.getElementById('discordModal');
    const discordModalOpen = document.getElementById('discordModalOpen');
    const discordModalOpen2 = document.getElementById('discordModalOpen2');
    const discordModalClose = document.getElementById('discordModalClose');
    if (discordModal && discordModalOpen) {
        function openDiscordModal() {
            discordModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeDiscordModal() {
            discordModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        discordModalOpen.addEventListener('click', openDiscordModal);
        if (discordModalOpen2) discordModalOpen2.addEventListener('click', openDiscordModal);
        if (discordModalClose) discordModalClose.addEventListener('click', closeDiscordModal);
        discordModal.addEventListener('click', function(e) { if (e.target === this) closeDiscordModal(); });
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeDiscordModal(); });
    }

    // МОДАЛКА МВД
    const discordModalMVD = document.getElementById('discordModalMVD');
    const discordModalOpenMVD = document.getElementById('discordModalOpenMVD');
    const discordModalCloseMVD = document.getElementById('discordModalCloseMVD');
    if (discordModalMVD && discordModalOpenMVD) {
        function openDiscordModalMVD() {
            discordModalMVD.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeDiscordModalMVD() {
            discordModalMVD.classList.remove('active');
            document.body.style.overflow = '';
        }
        discordModalOpenMVD.addEventListener('click', openDiscordModalMVD);
        if (discordModalCloseMVD) discordModalCloseMVD.addEventListener('click', closeDiscordModalMVD);
        discordModalMVD.addEventListener('click', function(e) { if (e.target === this) closeDiscordModalMVD(); });
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeDiscordModalMVD(); });
    }

    // МОДАЛКА TIKTOK
    const tiktokModal = document.getElementById('tiktokModal');
    const tiktokModalOpen = document.getElementById('tiktokModalOpen');
    const tiktokModalClose = document.getElementById('tiktokModalClose');
    if (tiktokModal && tiktokModalOpen) {
        function openTiktokModal() {
            tiktokModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeTiktokModal() {
            tiktokModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        tiktokModalOpen.addEventListener('click', openTiktokModal);
        if (tiktokModalClose) tiktokModalClose.addEventListener('click', closeTiktokModal);
        tiktokModal.addEventListener('click', function(e) { if (e.target === this) closeTiktokModal(); });
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeTiktokModal(); });
    }

    // ПОДСВЕТКА АКТИВНОЙ ССЫЛКИ
    const navLinks = document.querySelectorAll('.nav-link-custom');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === window.location.pathname.split('/').pop() || 
            (href === 'index.html' && window.location.pathname.endsWith('/'))) {
            link.classList.add('active');
        }
    });
});
