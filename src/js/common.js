(() => {
  function toggleShowBurgerMenu() {
    const $hamburger = document.querySelector(".js-hamburger");
    const burgerMenuClassName = ".js-burgerMenu";

    $hamburger.addEventListener("click", (e) => {
      const props = {
        triger: e.currentTarget,
        burgerMenuClassName: burgerMenuClassName,
      };

      const clickHamburgerMenu = new ClickHamburgerMenu({ ...props });
      clickHamburgerMenu.transformHamburgerLine();
      clickHamburgerMenu.toggleShowModal();
      clickHamburgerMenu.toggleOverflow();
    });
  }
  toggleShowBurgerMenu();

  function controlFocusTrap() {
    const focusTrap = document.getElementById("js-focusTrap");
    if (focusTrap === null) return;
    focusTrap.addEventListener("focus", () => {
      $hamburger.focus();
    });
  }
  controlFocusTrap();
  
  function addHeaderShadow() {
    /**
     * 第一引数:
     * 第二引数: ヘッダー要素
     */
    // 特定の位置に達したらヘッダーに影を追加
    new AddHeaderShadow(".newsUI", ".js-header");
  }
  addHeaderShadow();
})();
