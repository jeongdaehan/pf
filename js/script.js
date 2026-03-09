'use strict';

const body = document.body;
const headerBox = document.querySelector('header .box');
const switchBtns = document.querySelectorAll('.mode-toggle');
const menuBtn = document.querySelector('.menu-btn');
const gnb = document.querySelector('#gnb');
const gnbLinks = document.querySelectorAll('#gnb a');
const sections = document.querySelectorAll('main section');

let originalY = headerBox.offsetTop;

let resizeTimer;

// [공통 닫기 함수] - 중복 코드를 줄이기 위해 함수로 만듭니다.
function closeMenu() {
  gnb.classList.remove('mobile-open');
  menuBtn.classList.remove('active');
  body.style.overflow = 'auto';
}

window.addEventListener('resize', () => {
  // 1. 창 크기 조절이 시작되면 body에 클래스를 붙여 모든 애니메이션을 즉시 중단시킵니다.
  document.body.classList.add('stop-transitions');

  // [추가] 리사이즈 시 헤더의 원래 위치 값을 다시 계산합니다.
  // 단, sticky가 붙어있을 때는 위치가 0이 되므로 제거된 상태에서 측정해야 정확합니다.
  if (!headerBox.classList.contains('sticky')) {
    originalY = headerBox.offsetTop;
  }

  // 2. PC 화면으로 돌아왔을 때 메뉴가 꼬이는 것을 방지 (기존 로직)
  if (window.innerWidth > 600) {
    closeMenu(); // 공통 함수 사용
  }

  // 3. 사용자가 창 크기 조절을 멈추고 0.1초 뒤에 다시 애니메이션을 활성화합니다.
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('stop-transitions');
  }, 100);
});

// [테마 초기화] 페이지 로드시 저장된 테마 확인
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dk');
  switchBtns.forEach((el) => el.classList.toggle('on'));
}

// [스크롤 이벤트] 스티키 헤더 및 배경 여백 처리
window.addEventListener('scroll', () => {
  if (window.scrollY >= originalY) {
    headerBox.classList.add('sticky');
  } else {
    headerBox.classList.remove('sticky');
  }
});

// [다크모드 토글]
switchBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    switchBtns.forEach((el) => el.classList.toggle('on'));
    body.classList.toggle('dk');

    if (body.classList.contains('dk')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
});

// [모바일 메뉴 토글]
menuBtn.addEventListener('click', () => {
  gnb.classList.toggle('mobile-open');
  menuBtn.classList.toggle('active');

  // 스크롤 락 (Scroll Lock)
  if (gnb.classList.contains('mobile-open')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = 'auto';
  }
});

// [클릭시 닫기]
// #gnb(전체 배경)를 클릭했을 때, 클릭된 대상(e.target)이
// 정확히 #gnb 자체일 때만(글자가 아닐 때) 메뉴를 닫습니다.
gnb.addEventListener('click', (e) => {
  if (e.target === gnb) {
    closeMenu();
  }
});

// [기존 메뉴 링크 클릭시 닫기]
gnbLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// [Intersection Observer] 현재 섹션 표시
const observerOptions = {
  root: null,
  rootMargin: '-40% 0% -40% 0%',
  threshold: 0,
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      gnbLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));
