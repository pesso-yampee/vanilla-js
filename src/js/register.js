"use strict";

// 利用規約の表示制御
window.addEventListener("DOMContentLoaded", () => {
  const triger = document.querySelector(".js-modalTriger");
  const modal = document.querySelector(".js-modal");
  const modalOverlay = document.querySelector(".js-modalOverlay");
  let ariaHiddenFlag = true;

  triger.addEventListener("click", () => {
    const props = {
      modal: modal,
      modalOverlay: modalOverlay,
      ariaHiddenFlag: ariaHiddenFlag,
    };

    const modalAnimation = new ModalAnimation(props);

    modalAnimation.observeScroll();
    ariaHiddenFlag = modalAnimation.toggleModal();
  });

  modalOverlay.addEventListener("click", (e) => {
    const props = {
      modal: modal,
      modalOverlay: e.currentTarget,
      ariaHiddenFlag: ariaHiddenFlag,
    };

    const modalAnimation = new ModalAnimation(props);

    modalAnimation.observeScroll();
    ariaHiddenFlag = modalAnimation.toggleModal();
  });
});

// inputエリアのエラーメッセージの表示制御
window.addEventListener("DOMContentLoaded", () => {
  const submit = document.querySelector('input[aria-label="submit"]');
  let flag = false;
  
  const checkInputValue = (e, flag) => {
    const formInputs = document.querySelectorAll(".js-formInput");
    const usernamePattern = /^.{0,15}$/;
    const emailPattern = /.{1,}@.*/;
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const patterns = [usernamePattern, emailPattern, passwordPattern];

    formInputs.forEach((formInput, index) => {
      const value = formInput.value;
      const errorMessage = formInput.nextElementSibling;

      if (value === "" || value.match(patterns[index]) === null) {
        e.preventDefault();
        errorMessage.classList.add("is-show");
        flag = true;
      }

      if (flag) {
        // ユーザー名を監視
        formInput.addEventListener("input", (e) => {
          const matched = e.target.value.match(patterns[index]);
          if(matched != null) {
            errorMessage.classList.remove('is-show');
          } else {
            errorMessage.classList.add('is-show');
          }
        });
      }
    });
  };

  submit.addEventListener("click", (e) => {
    checkInputValue(e, flag);
  });
});

// 利用規約に同意したら送信できるようにする処理
window.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.querySelector('input[aria-label="agree"]');
  const submit = document.querySelector('input[aria-label="submit"]');

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      submit.removeAttribute("disabled");
    } else {
      submit.setAttribute("disabled", "true");
    }
  });
});
