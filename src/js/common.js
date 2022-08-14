// ハンバーガーメニュー開閉
window.addEventListener("DOMContentLoaded", () => {
  const $hamburger = document.querySelector(".js-hamburger");
  const modal = ".js-modal";
  
  $hamburger.addEventListener("click", (e) => {
    const currentTarget = e.currentTarget;
    
    const clickHamburgerMenu = new ClickHamburgerMenu(currentTarget, modal);
    clickHamburgerMenu.transformHamburgerLine();
    clickHamburgerMenu.toggleShowModal();
    clickHamburgerMenu.toggleOverflow();
  });
});

/**
 * 第一引数: 
 * 第二引数: ヘッダー要素
 */
// 特定の位置に達したらヘッダーに影を追加
window.addEventListener('DOMContentLoaded', () => {
  new AddHeaderShadow('.splide', '.js-header');
});