'use strict';

const headerBox = document.querySelector('header .box');

const originalY = headerBox.offsetTop;

window.addEventListener('scroll', () => {
  if (scrollY >= originalY) {
    headerBox.classList.add('sticky');
  } else {
    headerBox.classList.remove('sticky');
  }
});
