(() => {
  const valueMatchedArray = [];
  const pattern = {
    email: /.{1,}@.*/,
    password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
  };
  const patternArray = [pattern.email, pattern.password];
  const formInputs = document.querySelectorAll(".js-formInput");
  const passwordBtn = document.getElementById("js-passwordBtn");
  const passwordInput = passwordBtn.previousElementSibling.previousElementSibling;
  const submitBtn = document.getElementById("js-submit");
  let passwordValue;
  
  function checkExistToken() {
    const token = localStorage.getItem("token");

    if (token) {
      window.location.href = "/src/index.html";
    }
    return;
  }
  checkExistToken();
  
  // 必須項目の入力内容を監視
  function observeInputValue() {
    formInputs.forEach((formInput, index) => {
      const errorMessage = formInput.parentNode.nextElementSibling;
      valueMatchedArray.push(formInput.value.match(patternArray[index]));
  
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
        const observeFormStatus = new ObserveFormStatus({
          ...props,
        });
        observeFormStatus.toggleShowMessage();
        observeFormStatus.toggleEnableSubmit();
    
        // 一文字でも入力されていたらfloating labels常時活性化
        if (value.length > 0) {
          floatingLabel.classList.add("is-active");
        } else {
          floatingLabel.classList.remove("is-active");
        }
      });
    });
  }
  observeInputValue();
  
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
  
  // // ブラウザバックして入力欄に値がある場合、floating labels実装
  window.addEventListener("pageshow", () => {
    const entries = performance.getEntriesByType("navigation");
    new ObserveInputValueWhenBrowserBack(entries, formInputs);
  });
  
  class ObserveInputValueWhenBrowserBack {
    constructor(entries, inputs) {
      this.entries = entries;
      this.inputs = inputs;
      this.values = [];
      this.floatingLabels = [];
      this.entries = performance.getEntriesByType("navigation");
      this.backForwardFlag = false;
      this._checkBrowserBack();
      this._toggleActiveFloatingLabel();
    }
  
    _checkBrowserBack() {
      this.entries.forEach((entry) => {
        if (entry.type === "back_forward") {
          this.backForwardFlag = true;
        }
      });
    }
  
    _toggleActiveFloatingLabel() {
      this.inputs.forEach((input) => {
        this.values.push(input.value);
        this.floatingLabels.push(input.nextElementSibling);
      });
  
      this.floatingLabels.forEach((label) => {
        if (!this.backForwardFlag) {
          return;
        }
        if (this.values.length != 0) {
          label.classList.add("is-active");
        } else {
          label.classList.remove("is-active");
        }
      });
    }
  }
  
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
  
  // 送信処理
  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const validationResult = await validationSubmit();
    const token = validationResult.token;
    const okFlag = validationResult.ok;
  
    if (okFlag) {
      window.location.href = "/src/index.html";
    } else {
      console.log(true);
      window.location.href = "/src/login/fail/index.html";
      return;
    }
    localStorage.setItem("token", token); // ローカルストレージは本来使用してはいけない。
    const storage = window.localStorage;
  });
  
  function getInputValues() {
    const emailValue = document.querySelector('input[name="email"]').value;
    const passwordValue = document.querySelector('input[name="password"]').value;
    const obj = new Object();
    obj.email = emailValue;
    obj.password = passwordValue;
  
    return obj;
  }
  
  async function validationSubmit() {
    const values = getInputValues();
  
    const submitFlag = await checkUserInfo(values);
  
    return new Promise((resolve, reject) => {
      if (submitFlag) {
        const token = chance.apple_token();
        resolve({
          token: token,
          ok: true,
          code: 200,
        });
      } else {
        reject({ ok: false, code: 401 });
        // ログインに失敗したページに遷移
        window.location.href = "/src/login/fail.html";
      }
    });
  }
  
  async function checkUserInfo(obj) {
    const correctValues = {
      email: "example@xxx.com",
      password: "N302aoe3",
    };
    const emailFlag = obj.email === correctValues.email ? true : false;
    const passwordFlag = obj.password === correctValues.password ? true : false;
  
    if (emailFlag && passwordFlag) {
      return true;
    } else {
      return false;
    }
  }
})();