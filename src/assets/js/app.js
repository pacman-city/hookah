// node modules:
import Glide from '@glidejs/glide';
// import Accordion from 'accordion-js';
// import Inputmask from "inputmask";
import customSelect from 'custom-select';
// import LazyLoad from 'lazyload';





document.addEventListener('DOMContentLoaded', () => {
  // https://github.com/custom-select/custom-select

  const range = document.querySelector('input[type="range"]');
  const rangeBg = document.querySelector('#range');
  const rangeOutput = document.querySelector('.choose__hours');
  const price = document.querySelector('.choose__price');

  range.addEventListener('input', function() {
    rangeBg.style.width = `${(this.value - 1) * 25}%`;
    rangeOutput.innerText = `${this.value} hours`;
    price.innerText = `$${this.value * 105 + 5}`;
  });

  // ----------------------------------------------------------- slider:
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

  // new Glide('.glide', options).mount();


  customSelect('#cattering-select');

  const catteringSelect = document.querySelector('#cattering-select');
  const catteringSelectSpan = document.querySelector('.choose .custom-select-opener span');
  const chooseParagraph = document.querySelector('.choose__paragraph');

  catteringSelect.addEventListener('change', function() {
    catteringSelectSpan.setAttribute('data-value', this.value);
    catteringSelectSpan.innerText = '';
    chooseParagraph.innerText = this.options[this.selectedIndex].innerText;
    chooseParagraph.style = '';
    setTimeout(() => chooseParagraph.style = 'animation: clr 0.3s ease-out forwards')
  });

  const mediaQueryList = window.matchMedia(`screen and (min-width: 768px)`);
  if (mediaQueryList.matches) {
    document.querySelectorAll('.choose .custom-select-option')[1].click();
  }

})