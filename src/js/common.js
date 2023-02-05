(() => {
  function checkExistToken() {
    const token = localStorage.getItem("token");
    const loginBtn = document.querySelector(".js-login");

    if (!loginBtn) return;

    if (token) {
      loginBtn.firstElementChild.textContent = "ログアウト";
      loginBtn.classList.remove("js-login");
      loginBtn.classList.add("js-logout");
      return;
    }
  }
  checkExistToken();

  const logoutBtn = document.querySelector(".js-logout")
    ? document.querySelector(".js-logout")
    : null;

  if (logoutBtn != null) {
    // ローカルストレージからトークンを削除する処理
    logoutBtn.addEventListener("click", (e) => {
      localStorage.removeItem("token");
    });
  }

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

  // 特定の位置に達したらヘッダーに影を追加
  new AddHeaderShadow(".js-intersectTarget", ".js-header");

  // 100vh対策
  function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  window.addEventListener("load", setVh);
  window.addEventListener("resize", setVh);
})();
