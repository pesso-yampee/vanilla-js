"use strict";

window.addEventListener("load", () => {
  const checkAgree = document.querySelector('input[aria-label="agree"]');
  const valueMatchedArray = [];

  const controlDisplayTermsOfService = (() => {
    const triger = document.querySelector(".js-modalTriger");
    const modal = document.querySelector(".js-modal");
    const modalOverlay = document.querySelector(".js-modalOverlay");
    const modalClose = document.getElementById("js-modalClose");
    let ariaHiddenFlag = true;

    const showModal = () => {
      const props = {
        modal: modal,
        modalOverlay: modalOverlay,
        ariaHiddenFlag: ariaHiddenFlag,
      };
      const modalAnimation = new ModalAnimation(props);
      modalAnimation.observeScroll();
      ariaHiddenFlag = modalAnimation.toggleModal();
    };

    triger.addEventListener("click", showModal);
    
    const hideModal = (e) => {
      const props = {
        currentTarget: e.currentTarget,
        modal: modal,
        modalOverlay: modalOverlay,
        ariaHiddenFlag: ariaHiddenFlag,
      };
      const modalAnimation = new ModalAnimation(props);
      ariaHiddenFlag = modalAnimation.toggleModal();
    };
    
    modalClose.addEventListener("click", hideModal);
  })();

  const getSubmitFlag = (array) => {
    let submitFlag;
    // すべての入力欄が正しい表記で記載されているかどうかを判定
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
  const controlDisplayErrorMessage = ((agree, array) => {
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
      array.push(formInput.value.match(patternArray[index]));

      // 必須項目の入力内容を監視
      formInput.addEventListener("input", (e) => {
        const matched = e.target.value.match(patternArray[index]);
        const checked = agree.getAttribute("checked");
        array[index] = matched;
        toggleShowErrorMessage(errorMessage, matched);

        if (checked === null) return;

        toggleEnableSubmit(getSubmitFlag(array), checked);
      });
    });

    // 初期化
    toggleEnableSubmit(getSubmitFlag(array), agree.checked);
  })(checkAgree, valueMatchedArray);

  // 利用規約に同意したら送信できるようにする処理
  const enableToSubmitHandler = ((agree, array) => {
    // 利用規約を最後まで読み終わった後も判定
    const observeChecked = (mutations) => {
      const record = mutations[0];
      const checkedFlag = record.target.checked;
      if (checkedFlag) {
        toggleEnableSubmit(getSubmitFlag(array), checkedFlag);
      }
    };
    const observer = new MutationObserver(observeChecked);
    const options = {
      attributes: true,
    };
    observer.observe(agree, options);

    agree.addEventListener("change", () => {
      toggleEnableSubmit(getSubmitFlag(array), agree.checked);
    });
  })(checkAgree, valueMatchedArray);

  // パスワードの表示切り替え処理
  const switchDisplayPasswordHandler = (() => {
    const btn = document.getElementById("js-passwordBtn");
    const input = btn.previousElementSibling;
    let passwordValue;

    input.addEventListener("change", (e) => {
      passwordValue = e.target.value;
    });
  
    btn.addEventListener("click", (e) => {
      const props = {
        event: e,
        passwordValue: passwordValue,
      };
      const switchDisplayPassword = new SwitchDisplayPassword({ ...props });
      switchDisplayPassword.switchDisplay();
    });
  })();
});
