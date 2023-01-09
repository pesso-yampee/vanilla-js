class ModalAnimation {
  constructor(props) {
    this.currentTarget = props.currentTarget ? props.currentTarget : null;
    this.modal = props.modal;
    this.modalOverlay = props.modalOverlay;
    this.ariaHiddenFlag = props.ariaHiddenFlag;
  }
  _showModal() {
    this.modal.setAttribute("aria-hidden", "false");
    this.modal.classList.add("is-show");
    this.modalOverlay.setAttribute("aria-hidden", "false");
    this.modalOverlay.classList.add("is-show");
  }

  _hideModal() {
    this.modal.setAttribute("aria-hidden", "true");
    this.modal.classList.remove("is-show");
    this.modalOverlay.setAttribute("aria-hidden", "true");
    this.modalOverlay.classList.remove("is-show");
  }

  toggleModal() {
    if (this.ariaHiddenFlag) {
      this._showModal();
      this.ariaHiddenFlag = false;
    } else {
      this._hideModal();
      this.ariaHiddenFlag = true;
    }

    return this.ariaHiddenFlag;
  }

  // 利用規約のスクロール量検知
  observeScroll() {
    this.modalInner = this.modal.children[0];
    this.modalBody = this.modalInner.children[0];
    const that = this;
    
    // スクロールが一番下に行ったらチェックボックスはcheckedになる
    this.modalBody.onscroll = function () {
      this.modalBodyClientHeight = this.clientHeight;
      this.modalBodyScrollHeight = this.scrollHeight; // 画面に表示されていないコンテンツの高さも含む
      this.scrollTop = this.scrollTop;
      this.diff = this.modalBodyScrollHeight - (this.modalBodyClientHeight + this.scrollTop);
      
      if (this.diff === 0) {
        that._toEnableInputChecked();
        that.ariaHiddenFlag = true;
      }
    }
  }

  _toEnableInputChecked() {
    this.checkbox = document.querySelector('input[aria-label="agree"]');

    this.checkbox.setAttribute("checked", "true");
    this.checkbox.removeAttribute("disabled");
  }
}

class SwitchDisplayPassword {
  constructor({ event, passwordValue }) {
    this.event = event;
    this.passwordValue = passwordValue;
  }

  switchDisplay() {
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
