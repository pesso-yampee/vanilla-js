// 利用規約を読まずにはチェックボックスをチェックしてはいけない
// デフォルトでpointer-event: noneにしておく必要がある
// 利用規約を完全に読んだらpointer-event: visibleにしないといけない

// 利用規約の表示制御
window.addEventListener("DOMContentLoaded", () => {
  const triger = document.querySelector(".js-modalTriger");
  const modal = document.querySelector(".js-modal");
  const modalOverlay = document.querySelector(".js-modalOverlay");
  let ariaHiddenFlag = true;

  function showModal(element) {
    element.setAttribute("aria-hidden", "false");
    element.classList.add("is-show");
  }

  function hideModal(element) {
    element.setAttribute("aria-hidden", "true");
    element.classList.remove("is-show");
  }

  // 利用規約のスクロール量検知
  const observeScroll = (element) => {
    const modalInner = element.children[0];
    const modalBody = modalInner.children[0];
    const modalBodyClientHeight = modalBody.clientHeight;
    const modalBodyScrollHeight = modalBody.scrollHeight; // 画面に表示されていないコンテンツの高さも含む
    
    // スクロールが一番下に行ったらチェックボックスはcheckedになる
    modalBody.onscroll = function() {
      const scrollTop = this.scrollTop;
      const diff = modalBodyScrollHeight - (modalBodyClientHeight + scrollTop);
      
      if (diff === 0) {
        setTimeout(() => {
          hideModal(element);
          hideModal(modalOverlay);
          ariaHiddenFlag = true;
  
          toEnableInputChecked();
          toEnableSubmit();
        }, 500);
      }
    };

    const toEnableInputChecked = () => {
      const checkbox = document.querySelector('input[aria-label="agree"]');

      checkbox.setAttribute("checked", "true");
      checkbox.classList.add('is-active');
    };

    const toEnableSubmit = () => {
      const submit = document.querySelector('input[aria-label="submit"]');
      
      submit.removeAttribute("disabled");
    };
  };
  observeScroll(modal);
  
  triger.addEventListener("click", () => {
    if (ariaHiddenFlag) {
      showModal(modal);
      showModal(modalOverlay);
      ariaHiddenFlag = false;
    }
  });
  
  modalOverlay.addEventListener("click", (e) => {
    if (!ariaHiddenFlag) {
      hideModal(modal);
      hideModal(e.currentTarget);
      ariaHiddenFlag = true;
    }
  });
});

// 利用規約に同意したら送信できる
window.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.querySelector('input[aria-label="agree"]');
  const submit = document.querySelector('input[aria-label="submit"]');

  checkbox.addEventListener('change', () => {
    if(checkbox.checked) {
      submit.removeAttribute("disabled");
    } else {
      submit.setAttribute("disabled", "true");
    }
  })
});