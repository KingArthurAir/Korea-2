/**
 * 서울나이트 - 프리미엄 데이트 커뮤니티
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Custom Cursor
    // ==========================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Outline follows with slight delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });
        
        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .profile-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(255, 71, 87, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }
    
    // ==========================================
    // Header Scroll Effect
    // ==========================================
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ==========================================
    // Preference Buttons Selection
    // ==========================================
    const preferenceCards = document.querySelectorAll('.preference-card');
    
    preferenceCards.forEach(card => {
        const buttons = card.querySelectorAll('.option-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active from siblings
                buttons.forEach(btn => btn.classList.remove('active'));
                // Add active to clicked
                this.classList.add('active');
            });
        });
    });
    
    // ==========================================
    // Match Button
    // ==========================================
    const matchBtn = document.querySelector('.btn-match');
    
    if (matchBtn) {
        matchBtn.addEventListener('click', function() {
            // Collect selected preferences
            const preferences = {};
            
            preferenceCards.forEach(card => {
                const category = card.dataset.category;
                const selected = card.querySelector('.option-btn.active');
                if (selected) {
                    preferences[category] = selected.dataset.value;
                }
            });
            
            console.log('Selected preferences:', preferences);
            
            // Show matching animation
            this.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                    </path>
                </svg>
                <span>매칭 중...</span>
            `;
            
            // Simulate matching process
            setTimeout(() => {
                alert('✨ 매칭이 완료되었습니다!\n\n카카오톡 채널로 이동합니다...');
                // Redirect to KakaoTalk channel
                // window.location.href = 'https://open.kakao.com/...';
            }, 2000);
        });
    }
    
    // ==========================================
    // Profile Card Interactions
    // ==========================================
    const profileCards = document.querySelectorAll('.profile-card, .profile-card-featured');
    
    profileCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('.profile-name')?.textContent;
            
            if (name) {
                // Heart animation
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.cssText = `
                    position: fixed;
                    font-size: 3rem;
                    pointer-events: none;
                    z-index: 9999;
                    animation: heartFloat 1s ease-out forwards;
                `;
                heart.style.left = this.getBoundingClientRect().left + this.offsetWidth / 2 + 'px';
                heart.style.top = this.getBoundingClientRect().top + 'px';
                document.body.appendChild(heart);
                
                setTimeout(() => heart.remove(), 1000);
                
                console.log(`Profile clicked: ${name}`);
            }
        });
        
        // Like button
        const likeBtn = card.querySelector('.btn-profile-action');
        if (likeBtn) {
            likeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('liked');
                
                if (this.classList.contains('liked')) {
                    this.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    `;
                } else {
                    this.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    `;
                }
            });
        }
    });
    
    // Add heart float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(1.5);
            }
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================
    // CTA Buttons
    // ==========================================
    const ctaButtons = document.querySelectorAll('.header-cta, .btn-glow');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const phoneNumber = prompt('휴대폰 번호를 입력해주세요:\n\n예: 010-1234-5678');
            
            if (phoneNumber) {
                console.log('Phone number entered:', phoneNumber);
                alert('인증번호가 전송되었습니다.');
            }
        });
    });
    
    // ==========================================
    // Scroll Animations (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.preference-card, .profile-card, .feature-card, .cta-content'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ==========================================
    // Phone Input Formatting
    // ==========================================
    const phoneInput = document.querySelector('.cta-input');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length > 3) {
                value = value.replace(/^(\d{3})(\d{4})(\d{4}).*/, '$1-$2-$3');
            } else if (value.length > 0) {
                value = value.replace(/^(\d{3}).*/, '$1-');
            }
            
            e.target.value = value;
        });
    }
    
    // ==========================================
    // Stats Counter Animation
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const hasSlash = text.includes('/');
                
                if (!hasSlash) {
                    const num = parseInt(text.replace(/[^0-9]/g, ''));
                    
                    if (num) {
                        let current = 0;
                        const increment = num / 50;
                        const duration = 2000;
                        const stepTime = duration / 50;
                        
                        const counter = setInterval(() => {
                            current += increment;
                            
                            if (current >= num) {
                                current = num;
                                clearInterval(counter);
                            }
                            
                            let display = Math.floor(current).toLocaleString();
                            if (hasPlus) display += '+';
                            if (hasPercent) display += '%';
                            
                            target.textContent = display;
                        }, stepTime);
                    }
                }
                
                statObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statObserver.observe(stat));
    
    // ==========================================
    // Console Ready Message
    // ==========================================
    console.log('%c🌙 서울나이트', 'font-size: 24px; font-weight: bold; color: #ff4757;');
    console.log('%c프리미엄 데이트 커뮤니티가 로드되었습니다.', 'font-size: 14px; color: #a0a0b0;');
    console.log('%c개발자 도구에서 콘솔을 사용할 수 있습니다.', 'font-size: 12px; color: #6b6b80;');
});
