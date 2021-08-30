// node modules:
import Glide from '@glidejs/glide';
import Accordion from 'accordion-js';
import Inputmask from "inputmask";
import customSelect from 'custom-select';
import LazyLoad from 'lazyload';



document.addEventListener('DOMContentLoaded', () => {
  // https://github.com/custom-select/custom-select
  customSelect("select");

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

  new Glide('.glide', options).mount();
})