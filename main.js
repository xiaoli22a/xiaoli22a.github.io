document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Smooth Scroll for Navigation
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active Navigation on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });

    // Fun Corner - Bubble Emoji Switcher
    const bubbleEmoji = document.getElementById('bubbleEmoji');
    const funEmojiBtn = document.getElementById('funEmojiBtn');
    const emojis = ['😊', '😎', '🤩', '🥳', '😄', '😆', '🤗', '😇', '🧐', '🤓', '😏', '😬', '🤪', '😈', '👻', '🤖', '👽', '🦄', '🐱', '🐶'];

    if (funEmojiBtn && bubbleEmoji) {
        funEmojiBtn.addEventListener('click', function() {
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            bubbleEmoji.style.transform = 'scale(1.5) rotate(15deg)';
            this.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                bubbleEmoji.textContent = randomEmoji;
                bubbleEmoji.style.transform = 'scale(1) rotate(0deg)';
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    }

    // Fun Corner - Easter Egg
    const funEggBtn = document.getElementById('funEggBtn');
    const eggEmojis = ['🎉', '🌟', '🎊', '✨', '🚀', '💎', '🔮', '🎁'];

    if (funEggBtn) {
        funEggBtn.addEventListener('click', function() {
            const randomEgg = eggEmojis[Math.floor(Math.random() * eggEmojis.length)];
            this.querySelector('.btn-emoji').textContent = randomEgg;
            this.style.transform = 'scale(1.3) rotate(180deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.querySelector('.btn-emoji').textContent = '🎯';
            }, 500);

            createFloatingEmoji(randomEgg);
        });
    }

    function createFloatingEmoji(emoji) {
        const floatingEmoji = document.createElement('div');
        floatingEmoji.textContent = emoji;
        floatingEmoji.style.cssText = 'position:fixed;font-size:2rem;pointer-events:none;z-index:9999;right:40px;bottom:100px;animation:floatUp 2s ease forwards;';
        document.body.appendChild(floatingEmoji);
        setTimeout(() => floatingEmoji.remove(), 2000);
    }

    // Add float animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = '@keyframes floatUp { 0% { opacity:1;transform:translateY(0) scale(1); } 100% { opacity:0;transform:translateY(-150px) scale(1.5); } }';
    document.head.appendChild(floatStyle);

    // Music Player
    const bgMusic = document.getElementById('bgMusic');
    const musicPlayBtn = document.getElementById('musicPlayBtn');

    if (bgMusic && musicPlayBtn) {
        // 设置初始音量为0
        bgMusic.volume = 0;

        // 自动播放并渐进音量
        bgMusic.load();
        bgMusic.play().then(function() {
            musicPlayBtn.textContent = '⏸️ 暂停';
            // 音量渐进效果：10秒内从0到0.4
            fadeVolume(bgMusic, 0, 0.4, 10000);
        }).catch(function(err) {
            console.log('自动播放被阻止，需要用户交互');
        });

        // 点击按钮切换播放/暂停
        musicPlayBtn.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play().then(function() {
                    musicPlayBtn.textContent = '⏸️ 暂停';
                    // 如果从暂停恢复，音量渐进到合适大小
                    fadeVolume(bgMusic, bgMusic.volume, 0.4, 2000);
                });
            } else {
                bgMusic.pause();
                musicPlayBtn.textContent = '▶️ 继续播放';
            }
        });

        // 音量渐进函数
        function fadeVolume(audio, from, to, duration) {
            const startTime = performance.now();
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // 使用缓动函数让音量变化更自然
                const eased = progress * (2 - progress); // easeOutQuad
                audio.volume = from + (to - from) * eased;
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            requestAnimationFrame(update);
        }
    }

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .project-card, .timeline-content, .edu-card').forEach(function(el) {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Card Hover Effect
    document.querySelectorAll('.skill-card, .project-card').forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Navbar Background on Scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});
