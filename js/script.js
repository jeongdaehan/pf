'use strict';

const body = document.body;
const headerBox = document.querySelector('header .box');
const switchBtns = document.querySelectorAll('header .switch button');
const originalY = headerBox.offsetTop;

// 페이지 로드시 저장된 테마 확인
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dk');
  switchBtns.forEach((el) => el.classList.toggle('on'));
}

window.addEventListener('scroll', () => {
  if (scrollY >= originalY) {
    headerBox.classList.add('sticky');
  } else {
    headerBox.classList.remove('sticky');
  }
});

switchBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    switchBtns.forEach((el) => el.classList.toggle('on'));
    body.classList.toggle('dk');

    // 테마 상태 저장
    if (body.classList.contains('dk')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
});
