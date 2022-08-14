window.addEventListener('DOMContentLoaded', () => {
  const splide = new Splide('.splide', {
    type: "fade",
    speed: 2000,
    rewind: true,
    rewindByDrag: true,
  });

  splide.mount();
});