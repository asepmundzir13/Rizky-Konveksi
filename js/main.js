
/* Category Slider */ 
let sliderWrapper = document.body.querySelector('#carousel-box-wrapper');

let slider = activateSlide(sliderWrapper);
slider.init();

/* Burger Menu - Sidenav Mobile */
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });