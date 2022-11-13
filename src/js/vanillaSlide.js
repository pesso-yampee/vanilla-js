// スライドショーを実行する処理
window.addEventListener("DOMContentLoaded", () => {
  const arrows = document.querySelectorAll("[data-arrow]");
  const slideItems = document.querySelectorAll(".js-slideItem");
  const slideNav = document.querySelectorAll(".js-slideNav");
  const url = "/src/json/slideData.json";

  new OutputImage(slideItems, url);

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
