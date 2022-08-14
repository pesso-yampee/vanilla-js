window.addEventListener('DOMContentLoaded', () => {
  const arrows = document.querySelectorAll('[data-arrow]');
  const $prev = document.querySelector('[data-arrow="prev"]');
  const $next = document.querySelector('[data-arrow="next"]');
  const slideItems = document.querySelectorAll('.js-slideItem');
  const slideNav = document.querySelectorAll('.js-slideNav');

  arrows.forEach((arrow) => {
    arrow.addEventListener('click', (e) => {
      const event = e;
      const slider = new NavigationSlider(slideItems, $prev, $next, event, slideNav);
      
      slider.handleSlide();
      slider.handleNavigation();
    });
  });

  slideNav.forEach((navItem) => {
    navItem.addEventListener('click', (e) => {
      const event = e;
      const slider = new NavigationSlider(slideItems, $prev, $next, event, slideNav);
      
      slider.handleNavigation();
      slider.handleSlide();
    });
  });
});