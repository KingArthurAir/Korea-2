// 한국 미팅 - 인터랙티브 스크립트

document.addEventListener('DOMContentLoaded', function() {
    
    // 선호도 버튼 선택 기능
    const preferenceGroups = document.querySelectorAll('.preference-group');
    
    preferenceGroups.forEach(group => {
        const buttons = group.querySelectorAll('.buttons button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // 같은 그룹의 다른 버튼들에서 active 클래스 제거
                buttons.forEach(btn => btn.classList.remove('active'));
                // 클릭된 버튼에 active 클래스 추가
                this.classList.add('active');
            });
        });
    });
    
    // 프로필 카드 클릭 이벤트
    const profileCards = document.querySelectorAll('.profile-card');
    
    profileCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('.name').textContent;
            const ageLocation = this.querySelector('.age-location').textContent;
            
            // 카카오톡 연결 (실제로는 백엔드 연동 필요)
            alert(`${name} (${ageLocation})님과의 매칭을 시작합니다!\n\n카카오톡으로 연결됩니다...`);
            
            // 실제 구현시에는 백엔드 API 호출 또는 카카오톡 링크로 이동
            // window.location.href = 'https://open.kakao.com/...';
        });
    });
    
    // CTA 버튼 클릭 이벤트
    const ctaButtons = document.querySelectorAll('.cta-btn, .download-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 카카오톡 채널 추가 또는 앱 다운로드 페이지로 이동
            const confirmDownload = confirm('카카오톡 채널을 추가하시겠습니까?\n\n실제 사람들과의 매칭이 시작됩니다!');
            
            if (confirmDownload) {
                // 실제 구현시에는 카카오톡 링크로 이동
                // window.location.href = 'https://open.kakao.com/...';
                alert('카카오톡 채널: @한국미팅\n\n채널을 추가해주세요!');
            }
        });
    });
    
    // 스크롤 시 헤더 효과
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.3)';
        }
        
        lastScroll = currentScroll;
    });
    
    // 프로필 카드 스와이프 효과 (모바일)
    let touchStartX = 0;
    let touchEndX = 0;
    
    profileCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        card.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(card);
        });
    });
    
    function handleSwipe(card) {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 왼쪽 스와이프
                card.style.transform = 'translateX(-100px) rotate(-10deg)';
                card.style.opacity = '0.5';
            } else {
                // 오른쪽 스와이프
                card.style.transform = 'translateX(100px) rotate(10deg)';
                card.style.opacity = '0.5';
            }
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.opacity = '';
            }, 300);
        }
    }
    
    // 페이드인 애니메이션 (스크롤 시)
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
    
    // 애니메이션 적용할 요소들
    const animateElements = document.querySelectorAll('.profile-card, .feature, .cta-section');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    console.log('🇰🇷 한국 미팅 웹사이트가 로드되었습니다!');
});
