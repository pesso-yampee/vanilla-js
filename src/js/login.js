const valueMatchedArray = [];
const pattern = {
  username: /^.{1,15}$/,
  password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
};
const patternArray = [pattern.username, pattern.password];
const formInputs = document.querySelectorAll(".js-formInput");
const passwordBtn = document.getElementById("js-passwordBtn");
const passwordInput = passwordBtn.previousElementSibling;
let passwordValue;

formInputs.forEach((formInput, index) => {
  const errorMessage = formInput.parentNode.nextElementSibling;
  valueMatchedArray.push(formInput.value.match(patternArray[index]));

  // 必須項目の入力内容を監視
  formInput.addEventListener("input", (e) => {
    const value = e.target.value;
    const floatingLabel = e.target.nextElementSibling;
    const matched = value.match(patternArray[index]);
    valueMatchedArray[index] = matched;

    const props = {
      text: errorMessage,
      result: matched,
      submitStatus: getSubmitFlag(valueMatchedArray),
    };
    const controlDisplayErrorMessage = new ControlDisplayErrorMessage({
      ...props,
    });
    controlDisplayErrorMessage.toggleShowMessage();
    controlDisplayErrorMessage.toggleEnableSubmit();

    // 一文字でも入力されていたらfloating labels常時活性化
    if (value.length > 0) {
      floatingLabel.classList.add("is-active");
    } else {
      floatingLabel.classList.remove("is-active");
    }
  });
});

// // ブラウザバックして入力欄に値がある場合、floating labels実装
window.addEventListener("pageshow", (e) => {
  const values = [];
  const floatingLabels = [];
  const entries = performance.getEntriesByType("navigation");
  let backForwardFlag = false;

  formInputs.forEach((formInput) => {
    values.push(formInput.value);
    floatingLabels.push(formInput.nextElementSibling);
  });

  entries.forEach((entry) => {
    if (entry.type === "back_forward") {
      backForwardFlag = true;
    }
  });
  floatingLabels.forEach(label => {
    if (!backForwardFlag) {
      return;
    }
    if (values.length != 0) {
      label.classList.add("is-active");
    } else {
      label.classList.remove("is-active");
    }
  })
});

// 入力欄の値を取得する処理
passwordInput.addEventListener("change", (e) => {
  passwordValue = e.target.value;
});

// パスワードの表示切り替え処理
passwordBtn.addEventListener("click", (e) => {
  const props = {
    event: e,
    passwordValue: passwordValue,
  };
  new SwitchDisplayPassword({ ...props });
});

function getSubmitFlag(array) {
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
}
