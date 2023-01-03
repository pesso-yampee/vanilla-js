"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const checkAgree = document.querySelector('input[aria-label="agree"]');
  const valueMatchedArray = [];

  // 利用規約の表示制御
  const controlDisplayTermsOfService = (() => {
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
  })();

  const getSubmitFlag = (array) => {
    let submitFlag;

    const formInputValidate = array.every((formInputValue) => {
      return formInputValue != null;
    });

    if (!formInputValidate) {
      submitFlag = false;
    } else {
      submitFlag = true;
    }

    return submitFlag;
  };

  const toggleEnableSubmit = (submitStatus, agreeStatus = null) => {
    const submit = document.querySelector(".register_submit");
    console.log(agreeStatus);
    if (!agreeStatus) {
      submit.classList.add("is-nonActive");
      return;
    }

    if (submitStatus) {
      submit.classList.remove("is-nonActive");
    } else {
      submit.classList.add("is-nonActive");
    }
  };

  // inputエリアのエラーメッセージの表示制御
  const controlDisplayErrorMessage = ((agree) => {
    const formInputs = document.querySelectorAll(".js-formInput");
    const pattern = {
      username: /^.{0,15}$/,
      email: /.{1,}@.*/,
      password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
    };
    const patternArray = [pattern.username, pattern.email, pattern.password];

    const toggleShowErrorMessage = (text, result) => {
      if (result != null) {
        text.classList.remove("is-show");
      } else {
        text.classList.add("is-show");
      }
    };

    formInputs.forEach((formInput, index) => {
      const errorMessage = formInput.parentNode.nextElementSibling;
      valueMatchedArray.push(formInput.value.match(patternArray[index]));

      // 必須項目の入力内容を監視
      formInput.addEventListener("input", (e) => {
        const matched = e.target.value.match(patternArray[index]);
        valueMatchedArray[index] = matched;
        toggleShowErrorMessage(errorMessage, matched);

        if (checkAgree.getAttribute("checked") === null) return;

        toggleEnableSubmit(getSubmitFlag(valueMatchedArray));
      });
    });

    // 初期化
    toggleEnableSubmit(getSubmitFlag(valueMatchedArray));
  })(checkAgree);

  // 利用規約に同意したら送信できるようにする処理
  const enableToSubmitHandler = ((agree) => {
    agree.addEventListener("change", () => {
      toggleEnableSubmit(getSubmitFlag(valueMatchedArray), agree.checked);
    });
  })(checkAgree);

  // パスワードの表示切り替え処理
  const switchDisplayPassword = (() => {
    const btn = document.getElementById("js-passwordBtn");
    const input = btn.previousElementSibling;
    let passwordValue;

    const switchStatusHander = ({ event, passwordValue }) => {
      const current = event.currentTarget;
      let input = current.previousElementSibling;

      if (!passwordValue) {
        return;
      }

      if (current.classList.contains("is-active")) {
        input.setAttribute("type", "password");
      } else {
        input.setAttribute("type", "text");
      }

      current.classList.toggle("is-active");
    };

    const getPasswordValue = (event) => {
      return event.target.value;
    };

    input.addEventListener("change", (e) => {
      passwordValue = getPasswordValue(e);
    });

    btn.addEventListener("click", (e) => {
      const props = {
        event: e,
        passwordValue: passwordValue,
      };
      switchStatusHander({ ...props });
    });
  })();
});
