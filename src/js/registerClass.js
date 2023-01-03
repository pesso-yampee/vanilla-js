class ModalAnimation {
  constructor(props) {
    this.modal = props.modal;
    this.modalOverlay = props.modalOverlay;
    this.ariaHiddenFlag = props.ariaHiddenFlag;
  }
  _showModal(element) {
    element.setAttribute("aria-hidden", "false");
    element.classList.add("is-show");
  }

  _hideModal(element) {
    element.setAttribute("aria-hidden", "true");
    element.classList.remove("is-show");
  }

  toggleModal() {
    if(this.ariaHiddenFlag) {
      this._showModal(this.modal);
      this._showModal(this.modalOverlay);
      this.ariaHiddenFlag = false;
    } else {
      this._hideModal(this.modal);
      this._hideModal(this.modalOverlay);
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
    this.modalBody.onscroll = function() {
      this.modalBodyClientHeight = this.clientHeight;
      this.modalBodyScrollHeight = this.scrollHeight; // 画面に表示されていないコンテンツの高さも含む
      this.scrollTop = this.scrollTop;
      this.diff = this.modalBodyScrollHeight - (this.modalBodyClientHeight + this.scrollTop);
      
      if (this.diff === 0) {
        setTimeout(() => {
          that._hideModal(that.modal);
          that._hideModal(that.modalOverlay);
          that.ariaHiddenFlag = true;

          that._toEnableInputChecked();
        }, 500);
      }
    };
  }

  _toEnableInputChecked() {
    this.checkbox = document.querySelector('input[aria-label="agree"]');

    this.checkbox.setAttribute("checked", "true");
    this.checkbox.removeAttribute("disabled");
  };
}