class ControlDisplayErrorMessage {
  constructor({ text = null, result = null, submitStatus }) {
    this.text = text;
    this.result = result;
    this.submitStatus = submitStatus;
  }
  toggleShowMessage() {
    if (this.result != null) {
      this.text.classList.remove("is-show");
    } else {
      this.text.classList.add("is-show");
    }
  }

  toggleEnableSubmit() {
    this.submit = document.querySelector(".form_submit");
    if (this.submitStatus) {
      this.submit.classList.remove("is-inactive");
    } else {
      this.submit.classList.add("is-inactive");
    }
  }
}

class SwitchDisplayPassword {
  constructor({ event, passwordValue }) {
    this.event = event;
    this.passwordValue = passwordValue;
    this._switch();
  }

  _switch() {
    if (!this.passwordValue) return;

    this.current = this.event.currentTarget;
    this.input = this.current.previousElementSibling;

    if (this.current.classList.contains("is-active")) {
      this.input.setAttribute("type", "password");
    } else {
      this.input.setAttribute("type", "text");
    }

    this.current.classList.toggle("is-active");
  }
}
