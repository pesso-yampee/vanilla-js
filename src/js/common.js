// ハンバーガーメニュー開閉
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

// フォーカストラップ制御
const focusTrap = document.getElementById('js-focusTrap');
focusTrap.addEventListener("focus", () => {
	$hamburger.focus();
});

/**
 * 第一引数: 
 * 第二引数: ヘッダー要素
 */
// 特定の位置に達したらヘッダーに影を追加
window.addEventListener('DOMContentLoaded', () => {
  new AddHeaderShadow('.newsUI', '.js-header');
});