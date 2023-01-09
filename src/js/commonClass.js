// ハンバーガーメニュー開閉に伴うモーダル開閉処理
class ClickHamburgerMenu {
  constructor({ triger, burgerMenuClassName }) {
    this.triger = triger;
    this.burgerMenuClassName = burgerMenuClassName;
  }

  transformHamburgerLine() {
    this.triger.classList.toggle("is-active");
    if (this.triger.classList.contains("is-active")) {
      this.triger.setAttribute("data-dismiss", "modal");
    } else {
      this.triger.removeAttribute("data-dismiss");
    }
  }

  toggleShowModal() {
    const $modal = document.querySelector(this.burgerMenuClassName);
    const focusableElementStrings = "a[href], input, button";
    const focusableElements = [...$modal.querySelectorAll(focusableElementStrings)];
    const $firstTabStop = focusableElements[0];
    // 現在フォーカスが当たっている要素の位置を取得
    const focusedItemIndex = focusableElements.indexOf(document.activeElement);
    const $main = document.querySelector(".js-main");

    $modal.classList.toggle("is-show");
    
    if ($modal.classList.contains("is-show")) {
      $main.setAttribute("area-hidden", "true");
      $modal.setAttribute("area-hidden", "false");
    } else {
      $main.removeAttribute("area-hidden");
      $modal.setAttribute("area-hidden", "true");
    }
  }

  toggleOverflow() {
    const $body = document.querySelector("body");

    $body.classList.toggle("open");
  }
}

// 特定の位置に達したらヘッダーに影を追加する処理
class AddHeaderShadow {
  constructor(targetClass, headerClass) {
    this.target = document.querySelector(targetClass);
    this.header = document.querySelector(headerClass);

    const headerHeight = this.header.clientHeight;
    const options = {
      root: null,
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
    };
    
    const toggleBoxShadow = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.header.classList.remove('is-active');
        } else {
          this.header.classList.add('is-active');
        }
      });
    }
    
    const observer = new IntersectionObserver(toggleBoxShadow, options);

    observer.observe(this.target);
  }
}