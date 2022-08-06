// ハンバーガーメニュー開閉に伴うモーダル開閉処理
class ClickHamburgerMenu {
  constructor(button, modal) {
    this.button = button;
    this.modal = modal;
  }

  transformHamburgerLine() {
    this.button.classList.toggle("is-active");
    if (this.button.classList.contains("is-active")) {
      this.button.setAttribute("data-dismiss", "modal");
    } else {
      this.button.removeAttribute("data-dismiss");
    }
  }

  toggleShowModal() {
    const $modal                  = document.querySelector(this.modal),
          focusableElementStrings = "a[href], input, button",
          focusableElements       = $modal.querySelectorAll(focusableElementStrings),
          $firstTabStop           = focusableElements[0],
          $main                   = document.querySelector(".js-main");

    $modal.classList.toggle("is-show");
    $firstTabStop.focus();

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
class HandleScroll {
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