import Glide from '@glidejs/glide';
import customSelect from 'custom-select';
// https://github.com/custom-select/custom-select

import Modal from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
  const setHeaderTabs = () => {
    const tabRentals = document.querySelector('.header__wrapper a:first-of-type');
    const tabCattering = document.querySelector('.header__wrapper a:last-of-type');
    tabRentals.classList.remove('active');
    tabRentals.classList.add('page-tab-secondary');
    tabCattering.classList.add('active');
    tabRentals.classList.remove('page-tab-secondary');
  };

  const setSlider = () => {
    const options = {
      type: 'carousel',
      startAt: 0,
      perView: 3,
      dragThreshold: false,
      gap: 30,
      autoplay: false,
      keyboard: false,
      animationDuration: 400,
      animationTimingFunc: "ease-in-out",
      breakpoints: {
        1200: {
          perView: 1,
        }
      }
    };
    new Glide('.glide', options).mount();
  };

  const setCutteringForm = () => {
    // Изолируем select от всех остальных:
    customSelect('#cattering-select', {
      containerClass: 'custom-select-cattering',
    });

    const range = document.querySelector('input[type="range"]');
    const rangeBg = document.querySelector('#range');
    const rangeOutput = document.querySelector('.choose__hours');
    const price = document.querySelector('.choose__price');

    range.addEventListener('input', function() {
      rangeBg.style.width = `${(this.value - 1) * 25}%`;
      rangeOutput.innerText = `${this.value} hours`;
      price.innerText = `$${this.value * 105 + 5}`;
    });

    // добавляем data-value в кастомный select и выбранный текст в параграф:
    const select = document.querySelector('#cattering-select');
    const selectSpan = document.querySelector('.choose .custom-select-opener span');
    const paragraph = document.querySelector('.choose__paragraph');

    select.addEventListener('change', function() {
      selectSpan.setAttribute('data-value', this.value);
      selectSpan.innerText = '';
      paragraph.innerText = this.options[this.selectedIndex].innerText;
      paragraph.style = '';
      setTimeout(() => paragraph.style = 'animation: clr 0.3s ease-out forwards')
    });

    // обновления на breakpoint:
    const option = document.querySelector('.choose .custom-select-option:last-of-type');

    const handler768 = () => {
      if (mediaQueryList768.matches) {
        option.dataset.value = '15 & more hookahs';
      } else {
        option.dataset.value = '15 & more';
      }
    };
    const mediaQueryList768 = window.matchMedia(`screen and (max-width: 767.98px)`);
    if (!mediaQueryList768.matches) document.querySelectorAll('.choose .custom-select-option')[1].click();
    mediaQueryList768.addEventListener('change', handler768);

    const handler1200 = () => (mediaQueryList1200.matches) ? option.dataset.value = '15 & more' : option.dataset.value = '15 & more hookahs';
    const mediaQueryList1200 = window.matchMedia(`screen and (max-width: 1200px`);
    (mediaQueryList1200.matches) ? option.dataset.value = '15 & more': option.dataset.value = '15 & more hookahs';
    mediaQueryList1200.addEventListener('change', handler1200);
  }

  // date-time:
  document.querySelectorAll('[data-date-time]').forEach(item => item.addEventListener('click', function() {
    this.setAttribute('type', 'datetime-local');
  }));

  // setting up scripts for exact page as needed:
  const isCutteringPage = document.querySelector('.cattering');
  if (isCutteringPage) {
    setHeaderTabs();
    setCutteringForm();
  } else {
    setSlider();
    document.querySelectorAll('[data-logo]').forEach(item => {
      item.style.cursor = 'default';
      item.addEventListener('click', (e) => e.preventDefault());
    })
  }

  new Modal(['order', 'cattering', 'thanks', 'error']);

  // modal-drop-down:
  const dropTrigger = document.querySelectorAll('.modal-order__dropDown-trigger');
  dropTrigger.forEach(item => {
    item.addEventListener('click', function() {
      const dropDown = this.closest('.modal-order__dropDown');
      dropDown.classList.toggle('open');
      const inputs = dropDown.querySelectorAll('input');
      if (dropDown.classList.contains('open')) {
        inputs.forEach(item => item.setAttribute('tabindex', 0));
        dropDown.setAttribute('aria-expanded', true);
      } else {
        inputs.forEach(item => item.setAttribute('tabindex', -1));
        dropDown.setAttribute('aria-expanded', false);
      }
    });
  });

  // data-next:
  const nextBtn = document.querySelector('[data-next]');
  const firstStep = document.querySelectorAll('.modal-order__step1');
  const lastStep = document.querySelectorAll('.modal-order__step2');

  // modal steps change:
  nextBtn.addEventListener('click', function() {
    const isValid = this.closest('form').reportValidity();
    if (isValid) {
      firstStep.forEach(item => item.style.display = 'none');
      lastStep.forEach(item => item.style.display = 'block');
    }
  })

})