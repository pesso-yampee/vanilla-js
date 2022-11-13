// 画像情報を非同期で取得し、出力する処理
class OutputImage {
  constructor(slideElements, url) {
    this.slideElements = slideElements;
    this.url = url;
    this.requestServer = new Promise((resolve) => {
      this.data = fetch(this.url).then(res => {
        return res.json();
      }).then(json => {
        return json.data;
      });
      
      resolve(this.data);
    });
    
    this.fetchJsonData = (() => {
      this.requestServer.then(data => {
        this.registImageData(data);
      }).catch(error => {
        console.log(new Error("エラーが発生しました。"));
      })
    })();
    
    this.registImageData = (data) => {
      data.forEach((item, i) => {
        console.log(item);
        this.img = document.createElement('img');
        this.img.className = "kv_image";
        this.img.src = `/assets/media/images/${item.image}`;
        this.img.alt = item.alt;
        this.img.width = item.width;
        this.img.height = item.height;
        this.slideElements[i].appendChild(this.img);
      });
    };
  }
}

// vanillaJsのスライドショー（ナビゲーション無）
class NonNavigationSlider {
  constructor(slideItems, arrows, event) {
    this.slideItems = slideItems;
    this.event = event;
    this.arrows = arrows;
    this.$prevBtn = this.arrows[0];
    this.$nextBtn = this.arrows[1];
    this.$currentTarget = this.event.currentTarget;
    this.dataArrow = this.event.currentTarget.dataset.arrow;
    this.$currentSlideItem = [...this.slideItems].filter((element) => {
      return element.classList.contains("is-show");
    })[0];
    this.$prevSlideItem = this.$currentSlideItem.previousElementSibling;
    this.$nextSlideItem = this.$currentSlideItem.nextElementSibling;
  }

  _removeActiveClass() {
    if (this.dataArrow) {
      this.$currentSlideItem.classList.remove("is-show");
    }
  }

  _addActiveClass() {
    if (this.dataArrow === "prev") {
      this.$prevSlideItem.classList.add("is-show");
    } else if (this.dataArrow === "next") {
      this.$nextSlideItem.classList.add("is-show");
    }
  }

  _toggleDispayArrow() {
    // 前へボタンのdisplay監視
    if (
      this.dataArrow === "prev" &&
      this.$currentSlideItem === this.slideItems[1]
    ) {
      this.$prevBtn.classList.add("is-hidden");
    } else if (
      this.dataArrow === "next" &&
      this.$currentSlideItem === this.slideItems[0]
    ) {
      this.$prevBtn.classList.remove("is-hidden");
    }

    // 次へボタンのdisplay監視
    if (
      this.dataArrow === "next" &&
      this.$currentSlideItem === this.slideItems[3]
    ) {
      this.$nextBtn.classList.add("is-hidden");
    } else if (
      this.dataArrow === "prev" &&
      this.$currentSlideItem === this.slideItems[4]
    ) {
      this.$nextBtn.classList.remove("is-hidden");
    }
  }

  _infiniteSlideItem() {
    // 最初の要素が表示されてる状態でprevボタンが押された場合、最初の要素を非表示にし、最後のスライド要素を表示する。
    // 最後の要素が表示されてる状態でnextボタンが押された場合、最後の要素を非表示にし、最初のスライド要素を表示する。
    if (
      this.dataArrow === "prev" &&
      this.$currentSlideItem === this.slideItems[0]
    ) {
      this.slideItems[4].classList.add("is-show");
    } else if (
      this.dataArrow === "next" &&
      this.$currentSlideItem === this.slideItems[4]
    ) {
      this.slideItems[0].classList.add("is-show");
    } else if (this.dataArrow === "prev") {
      this.$prevSlideItem.classList.add("is-show");
    } else if (this.dataArrow === "next") {
      this.$nextSlideItem.classList.add("is-show");
    }
  }

  handleSlide() {
    this._removeActiveClass();
    this._infiniteSlideItem();
  }
}

// vanillaJsのスライドショー（ナビゲーション有）
class NavigationSlider extends NonNavigationSlider {
  constructor(slideItems, arrows, event, nav) {
    super(slideItems, arrows, event);
    this.nav = nav;
    this.$clickedNavBtn = this.event.currentTarget;
    this.clickedNavBtnOrder = this.$clickedNavBtn.dataset.order;
    this.currentSlideItemOrder =
      this.$currentSlideItem.getAttribute("data-order");
    this.$currentNavBtn = [...this.nav].filter((navItem) => {
      const navItemOrder = navItem.getAttribute("data-order");
      return navItemOrder === this.currentSlideItemOrder;
    })[0];
    this.$prevNavBtn = this.$currentNavBtn.previousElementSibling;
    this.$nextNavBtn = this.$currentNavBtn.nextElementSibling;
  }

  // ナビゲーション要素からアクティブな状態を外す処理
  _removeActiveClassNavigation() {
    // クリックしたナビゲーション要素が既にアクティブ状態の場合、外す処理が実行されないようにする。
    if (this.$clickedNavBtn.classList.contains("is-active")) {
      return false;
    } else {
      this.$currentSlideItem.classList.remove("is-show");
      this.$currentNavBtn.classList.remove("is-active");
    }
  }

  // ナビゲーション要素をアクティブな状態にする処理
  _addActiveClassNavigation() {
    if (this.dataArrow === "prev") {
      this.$prevNavBtn.classList.add("is-active");
    } else if (this.dataArrow === "next") {
      this.$nextNavBtn.classList.add("is-active");
    } else {
      this.$clickedNavBtn.classList.add("is-active");
    }
  }

  // スライド要素とナビゲーション要素を同期する処理
  _linkNavigation() {
    // n個目のナビゲーション要素をクリックされた場合、n個目のスライド要素を表示する。
    const $targetSlideItem = [...this.slideItems].filter((slideItem) => {
      return slideItem.getAttribute("data-order") === this.clickedNavBtnOrder;
    })[0];

    if (this.dataArrow) {
      return false;
    } else {
      $targetSlideItem.classList.add("is-show");
    }
  }

  _nonInfiniteNavigation() {
    // 最初のナビゲーションをクリックされた場合、prevボタンを非表示にする。
    // 最後のナビゲーションをクリックされた場合、nextボタンを非表示にする。
    // 最初と最後以外のn個目のナビゲーションをクリックされた場合、prev, nextボタンを表示する。
    if (this.clickedNavBtnOrder === "1") {
      this.$prevBtn.classList.add("is-hidden");
    } else if (this.clickedNavBtnOrder === "5") {
      this.$nextBtn.classList.add("is-hidden");
    } else {
      this.$prevBtn.classList.remove("is-hidden");
      this.$nextBtn.classList.remove("is-hidden");
    }

    // prevボタンが非表示で5番目のナビゲーション要素がクリックされた場合、prevボタンを表示にする。
    // nextボタンが非表示で1番目のナビゲーション要素がクリックされた場合、prevボタンを表示にする。
    if (
      this.clickedNavBtnOrder === "5" &&
      this.$prevBtn.classList.contains("is-hidden")
    ) {
      this.$prevBtn.classList.remove("is-hidden");
    } else if (
      this.clickedNavBtnOrder === "1" &&
      this.$nextBtn.classList.contains("is-hidden")
    ) {
      this.$nextBtn.classList.remove("is-hidden");
    }
  }

  _infiniteNavigation() {
    // 最初のナビゲーション要素がアクティブな状態でprevボタンが押された場合、最後のナビゲーション要素をアクティブな状態にする。
    // 最後のナビゲーション要素がアクティブな状態でnextボタンが押された場合、最初のナビゲーション要素をアクティブな状態にする。
    if (
      this.dataArrow === "prev" &&
      this.$currentSlideItem === this.slideItems[0]
    ) {
      this.nav[4].classList.add("is-active");
    } else if (
      this.dataArrow === "next" &&
      this.$currentSlideItem === this.slideItems[4]
    ) {
      this.nav[0].classList.add("is-active");
    } else {
      this._addActiveClassNavigation();
    }
  }

  handleSlide() {
    super.handleSlide();
    this._removeActiveClassNavigation();
    this._infiniteNavigation();
    this._linkNavigation();
  }
}

// 自動スライドショーを実行する処理
class AutoplaySlider {
  constructor(slideItems, nav) {
    this.slideItems = slideItems;
    this.nav = nav;
    this.delay = 1000;
    this.interval = 3000;

    setTimeout(() => {
      setInterval(this._toggleActiveClassAuto.bind(this), this.interval);
    }, this.delay);
  }

  // ナビゲーション要素とスライド要素からアクティブな状態を付けたり外したりする処理
  _toggleActiveClassAuto() {
    // setIntervalメソッドの中で特定の関数を実行する前に、毎回、現在アクティブな状態になっているスライド要素とナビゲーション要素を見つけないといけない。
    const $currentSlideItem = [...this.slideItems].filter((slideItem) => {
      return slideItem.classList.contains("is-show");
    })[0];
    const $firstSlideItem = this.slideItems[0];
    const $currentNavBtn = [...this.nav].filter((navigation) => {
      return navigation.classList.contains("is-active");
    })[0];
    const $firstNavBtn = this.nav[0];
    const $nextSlideItem = $currentSlideItem.nextElementSibling;
    const $nextNavBtn = $currentNavBtn.nextElementSibling;
    const currentSlideItemOrder = $currentSlideItem.getAttribute("data-order");

    $currentSlideItem.classList.toggle("is-show");
    $currentNavBtn.classList.toggle("is-active");

    // 一番最後のスライド要素に達したら一番最初のスライド要素に戻る
    if (currentSlideItemOrder === "5") {
      $firstSlideItem.classList.toggle("is-show");
      $firstNavBtn.classList.toggle("is-active");
    } else {
      $nextSlideItem.classList.toggle("is-show");
      $nextNavBtn.classList.toggle("is-active");
    }
  }
}
