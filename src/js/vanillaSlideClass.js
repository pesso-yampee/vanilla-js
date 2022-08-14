// vanillaJsのスライドショー（ナビゲーション無）
class NonNavigationSlider {
  constructor(slideItems, $prev, $next, event) {
    this.slideItems = slideItems;
    this.event = event;
    this.$prevBtn = $prev;
    this.$nextBtn = $next;
    this.$currentTarget = this.event.currentTarget;
    this.dataArrow = this.event.currentTarget.dataset.arrow;
    this.filterArray = [...this.slideItems].filter(element => {
      return element.classList.contains('is-show');
    });
    this.$currentSlideItem = this.filterArray[0];
    this.$prevSlideItem = this.$currentSlideItem.previousElementSibling;
    this.$nextSlideItem = this.$currentSlideItem.nextElementSibling;
  }
  
  _removeCurrentClass() {
    if (this.dataArrow) {
      this.$currentSlideItem.classList.remove('is-show');
    }
  }
  
  _addCurrentClass() {
    if (this.dataArrow === "prev") {
      this.$prevSlideItem.classList.add('is-show');
    } else if (this.dataArrow === "next") {
      this.$nextSlideItem.classList.add('is-show');
    }
  }

  _toggleDispayArrow() {
    // 前へボタンのdisplay監視
    if (this.dataArrow === "prev" && this.$currentSlideItem === this.slideItems[1]) {
      this.$prevBtn.classList.add('is-hidden');
    } else if (this.dataArrow === "next" && this.$currentSlideItem === this.slideItems[0]) {
      this.$prevBtn.classList.remove('is-hidden');
    }

    // 次へボタンのdisplay監視
    if (this.dataArrow === "next" && this.$currentSlideItem === this.slideItems[3]) {
      this.$nextBtn.classList.add('is-hidden');
    } else if (this.dataArrow === "prev" && this.$currentSlideItem === this.slideItems[4]) {
      this.$nextBtn.classList.remove('is-hidden');
    }
  }

  handleSlide() {
    this._removeCurrentClass();
    this._addCurrentClass();
    this._toggleDispayArrow();
  }
}

// vanillaJsのスライドショー（ナビゲーション有）
class NavigationSlider extends NonNavigationSlider {
  constructor(slideItems, $prev, $next, event, nav) {
    super(slideItems, $prev, $next, event);
    this.nav = nav;
    this.$clickedNavTarget = this.event.currentTarget;
    this.dataOrder = this.$clickedNavTarget.dataset.order;
    this.currentSlideItemOrder = this.$currentSlideItem.getAttribute('data-order');
    this.$currentNav = [...this.nav].filter(navItem => {
      const navItemOrder = navItem.getAttribute('data-order');
      return navItemOrder === this.currentSlideItemOrder;
    })[0];
    this.$prevNav = this.$currentNav.previousElementSibling;
    this.$nextNav = this.$currentNav.nextElementSibling;
  }

  // ナビゲーション要素からcurrent用の背景色を外す処理
  _removeCurrentClassNav() {
    // 既にn個目のナビゲーションに背景色が付与されていた場合、外す処理が実行されないようにする。
    if (this.$clickedNavTarget.classList.contains('is-active')) {
      return false;
    } else {
      this.$currentSlideItem.classList.remove('is-show');
      this.$currentNav.classList.remove('is-active');
    }
  }
  
  // ナビゲーション要素にcurrent用の背景色を付与する処理
  _addCurrentClassNav() {
    if (this.dataArrow === "prev") {
      this.$prevNav.classList.add('is-active');
    } else if (this.dataArrow === "next") {
      this.$nextNav.classList.add('is-active');
    } else {
      this.$clickedNavTarget.classList.add('is-active');
    }
  }

  _linkNavigation() {
    // n個目のナビゲーションをクリックされた場合、n個目のスライド要素を表示する。
    const $targetSlideItem = [...this.slideItems].filter(slideItem => {
      return slideItem.getAttribute('data-order') === this.dataOrder;
    })[0];

    if(this.dataArrow) {
      return false;
    } else {
      $targetSlideItem.classList.add("is-show");
    }
    
    if (this.dataOrder === '1') {
      // 最初のナビゲーションをクリックされた場合、prevボタンを非表示にする。
      this.$prevBtn.classList.add('is-hidden');
    } else if (this.dataOrder === '5') {
      // 最後のナビゲーションをクリックされた場合、nextボタンを非表示にする。
      this.$nextBtn.classList.add('is-hidden');
    } else {
      // 最初と最後以外のn個目のナビゲーションをクリックされた場合、prev, nextボタンを表示する。
      this.$prevBtn.classList.remove('is-hidden');
      this.$nextBtn.classList.remove('is-hidden');
    }
    
    if (this.dataOrder === '5' && this.$prevBtn.classList.contains('is-hidden')) {
      // prevボタンが非表示で5番目のナビゲーションがクリックされた場合、prevボタンを表示にする。
      this.$prevBtn.classList.remove('is-hidden');
    } else if (this.dataOrder === '1' && this.$nextBtn.classList.contains('is-hidden')) {
      // nextボタンが非表示で1番目のナビゲーションがクリックされた場合、prevボタンを表示にする。
      this.$nextBtn.classList.remove('is-hidden');
    } 
  }

  handleSlide() {
    super.handleSlide();
  }
  
  handleNavigation() {
    this._removeCurrentClassNav();
    this._addCurrentClassNav();
    this._linkNavigation();
  }
}