import Glide from '@glidejs/glide';

// import 'jquery/dist/jquery';
// import '@popperjs/core';

// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/alert';
// import 'bootstrap/js/dist/button';
// import 'bootstrap/js/dist/carousel';
// import 'bootstrap/js/dist/collapse';
// // import 'bootstrap/js/dist/dropdown';/////////////////////////////////
// import 'bootstrap/js/dist/modal';
// // import 'bootstrap/js/dist/tooltip';/////////////////////////////////
// // import 'bootstrap/js/dist/popover';/////////////////////////////////
// import 'bootstrap/js/dist/scrollspy';
// import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/toast';


document.addEventListener('DOMContentLoaded', () => {
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