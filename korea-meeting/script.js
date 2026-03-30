/**
 * 한국미팅 - 프리미엄 성인 데이트 커뮤니티
 * 1:1复刻 love-me.xyz 交互功能
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 선호도 버튼 선택
    // ==========================================
    const preferenceSections = document.querySelectorAll('.preference-section');
    
    preferenceSections.forEach(section => {
        const buttons = section.querySelectorAll('.pref-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // 같은 섹션의 다른 버튼들에서 active 제거
                buttons.forEach(btn => btn.classList.remove('active'));
                // 클릭된 버튼에 active 추가
                this.classList.add('active');
            });
        });
    });
    
    // ==========================================
    // 프로필 카드 클릭
    // ==========================================
    const previewCards = document.querySelectorAll('.preview-card, .gallery-card');
    
    previewCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('.preview-name, .gallery-name')?.textContent;
            const meta = this.querySelector('.preview-meta, .gallery-location')?.textContent;
            
            console.log('프로필 클릭:', name, meta);
            
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
                alert(`${name}${meta}님과의 매칭을 시작합니다!\n\n카카오톡 채널로 이동합니다...`);
            }, 500);
        });
    });
    
    // 하트 애니메이션 스타일 추가
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
    // 다운로드 버튼
    // ==========================================
    const downloadButtons = document.querySelectorAll('.btn-download, .btn-meet-now');
    
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const confirmed = confirm('카카오톡 채널을 추가하시겠습니까?\n\n실제 사람들과의 매칭이 시작됩니다!');
            
            if (confirmed) {
                // 실제 구현시 카카오톡 채널 링크로 이동
                // window.location.href = 'https://open.kakao.com/...';
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
            header.style.background = 'rgba(10, 10, 15, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
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
    
    // 애니메이션 적용할 요소
    const animateElements = document.querySelectorAll(
        '.preference-section, .preview-card, .gallery-card, .feature-item, .cta-section'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ==========================================
    // 갤러리 스와이프 (모바일)
    // ==========================================
    const gallery = document.querySelector('.profile-gallery');
    
    if (gallery) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });
        
        gallery.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        gallery.addEventListener('mouseup', () => {
            isDown = false;
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
    // 콘솔 메시지
    // ==========================================
    console.log('%c💕 한국미팅', 'font-size: 24px; font-weight: bold; color: #ff4757;');
    console.log('%c프리미엄 데이트 커뮤니티가 로드되었습니다.', 'font-size: 14px; color: #888899;');
});
