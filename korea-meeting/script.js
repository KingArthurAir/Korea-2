/**
 * 한국미팅 - 1:1复刻 love-me.xyz
 * 交互功能
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 선호도 버튼 선택
    // ==========================================
    const preferenceColumns = document.querySelectorAll('.preference-column');
    
    preferenceColumns.forEach(column => {
        const buttons = column.querySelectorAll('.pref-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
    
    // ==========================================
    // 프로필 카드 클릭
    // ==========================================
    const allCards = document.querySelectorAll('.preview-card-large, .preview-card-small, .gallery-card');
    
    allCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('.preview-name, .gallery-name')?.textContent;
            const meta = this.querySelector('.preview-meta, .gallery-location')?.textContent;
            
            // 하트 이펙트
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: fixed;
                font-size: 3rem;
                pointer-events: none;
                z-index: 9999;
                left: ${this.getBoundingClientRect().left + this.offsetWidth / 2}px;
                top: ${this.getBoundingClientRect().top}px;
                animation: heartFloat 1s ease-out forwards;
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
                alert(`${name}${meta ? ' ' + meta : ''}님과의 매칭을 시작합니다!\n\n카카오톡 채널로 이동합니다...`);
            }, 500);
        });
    });
    
    // 하트 애니메이션
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartFloat {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-100px) scale(1.5); }
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================
    // CTA 버튼
    // ==========================================
    const ctaButtons = document.querySelectorAll('.btn-download, .btn-meet-now');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const confirmed = confirm('카카오톡 채널을 추가하시겠습니까?\n\n실제 사람들과의 매칭이 시작됩니다!');
            
            if (confirmed) {
                alert('카카오톡 채널: @한국미팅\n\n채널을 추가해주세요!');
            }
        });
    });
    
    // ==========================================
    // 헤더 스크롤 효과
    // ==========================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(20, 10, 40, 0.95)';
        } else {
            header.style.background = 'rgba(20, 10, 40, 0.8)';
        }
    });
    
    // ==========================================
    // 스크롤 애니메이션
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
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll(
        '.preference-column, .preview-card-large, .preview-card-small, .gallery-card, .feature-card, .cta-section'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ==========================================
    // 갤러리 드래그 스크롤 (데스크톱)
    // ==========================================
    const gallery = document.querySelector('.profile-gallery');
    
    if (gallery) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.style.cursor = 'grabbing';
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });
        
        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });
        
        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });
        
        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            gallery.scrollLeft = scrollLeft - walk;
        });
    }
    
    // ==========================================
    // 콘솔 로그
    // ==========================================
    console.log('%c💕 한국미팅', 'font-size: 24px; font-weight: bold; color: #ff4757;');
    console.log('%c1:1复刻 love-me.xyz - 한국 버전이 로드되었습니다.', 'font-size: 14px; color: #b8a8c8;');
});
