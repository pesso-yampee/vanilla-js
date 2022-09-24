// スライドショーを実行する処理
window.addEventListener("DOMContentLoaded", () => {
  const arrows = document.querySelectorAll("[data-arrow]");
  const slideItems = document.querySelectorAll(".js-slideItem");
  const slideNav = document.querySelectorAll(".js-slideNav");
  const url = "https://myjson.dit.upm.es/api/bins/au7u";

  new OutputImage(slideItems, url);
  new AutoplaySlider(slideItems, slideNav);

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
      const event = e;
      const navigationSlider = new NavigationSlider(
        slideItems,
        arrows,
        event,
        slideNav
      );

      navigationSlider.handleSlide();
    });
  });

  slideNav.forEach((navItem) => {
    navItem.addEventListener("click", (e) => {
      const event = e;
      const navigationSlider = new NavigationSlider(
        slideItems,
        arrows,
        event,
        slideNav
      );

      navigationSlider.handleSlide();
    });
  });
});
