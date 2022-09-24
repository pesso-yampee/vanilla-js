class CreateNewsPost {
  constructor(url, $newUIContents) {
    this.url = url;
    this.newUIContents = $newUIContents;
    this._fetchPostData();
  }

  _requestServer() {
    return fetch(this.url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json.postData;
      });
  }

  _fetchPostData() {
    this._requestServer()
      .then((data) => {
        this._createPost(data);
      })
      .catch(() => {
        this.Error = "サーバがぶっ壊れています。";
        this._createErrorText(this.Error);
      });
  }

  _getCurrentDate() {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();

    let currentMonth = this.currentDate.getMonth() + 1;
    let currentDay = this.currentDate.getDate();

    currentMonth = currentMonth.toString().padStart(2, "0");
    currentDay = currentDay.toString().padStart(2, "0");

    this.result = Number(this.currentYear + currentMonth + currentDay);

    return this.result;
  }

  _cloneNewsUIContents() {
    this.flag = document.createDocumentFragment();
    this.newUIContentsParent = this.newUIContents.parentNode;

    for (let i = 0; i < this.dataLength; i++) {
      this.cloneContents = this.newUIContents.cloneNode(true);
      this.flag.appendChild(this.cloneContents);
    }

    this.newUIContentsParent.appendChild(this.flag);
  }

  _jadgeWithin3days() {
    return this.currentDate - this.date;
  }

  /* 
    第一引数: 連想配列の要素
    第二引数: 連想配列の長さ
  */
  _createPostImage(object, index) {
    this.imgSrc = object.img.src;
    this.imgAlt = object.img.alt;
    this.$postImageWrap = document.createElement("div");
    this.$postImage = document.createElement("img");
    this.$postImageWrap.className = "newsUI_description_imageWrap";
    this.$postImage.className = "newsUI_description_image";
    this.$postImage.src = "/assets/media/images/" + this.imgSrc;
    this.$postImage.alt = this.imgAlt;
    this.$postImageWrap.appendChild(this.$postImage);
    if (index === 0) {
      this.latestNewUIContents[0].classList.add("is-active");
    }

    this.latestNewUIContents[index].id = object.category;
    this.latestNewUIContents[index].appendChild(this.$postImageWrap);
  }

  _createPostDecorations() {
    if (this.jadgeDate <= 3 || this.comment > 0) {
      this.$postDecorations = document.createElement("div");
      this.$postDecorations.className = "newsUI_description_decorations";
    }

    if (this.jadgeDate <= 3) {
      this.$postNew = document.createElement("div");
      this.$postNewText = document.createElement("span");
      this.$postNew.className = "newsUI_description_label";
      this.$postNewText.className = "newsUI_description_label_text";
      this.$postNewText.textContent = "new";
      this.$postNew.appendChild(this.$postNewText);
      this.$postDecorations.appendChild(this.$postNew);
    }

    if (this.comment > 0) {
      this.$postComment = document.createElement("div");
      this.$postCommentIcon = document.createElement("span");
      this.$postCommentNum = document.createElement("span");
      this.$postComment.className = "newsUI_description_comment";
      this.$postCommentIcon.className = "newsUI_description_comment_icon";
      this.$postCommentNum.className = "newsUI_description_comment_num";
      this.$postCommentNum.textContent = this.comment;
      this.$postComment.appendChild(this.$postCommentIcon);
      this.$postComment.appendChild(this.$postCommentNum);
      this.$postDecorations.appendChild(this.$postComment);
    }
  }

  /* 
    第一引数: 連想配列の要素
  */
  _createPostDescription(object) {
    object.posts.forEach((post) => {
      this.category = post.category;
      this.text = post.text;
      this.date = Number(post.date);
      this.comment = post.comment;
      this.jadgeDate = this._jadgeWithin3days();
      this.$postItem = document.createElement("li");
      this.$postBody = document.createElement("div");
      this.$postText = document.createElement("a");

      this.$postItem.className = "newsUI_description_item";
      this.$postBody.className = "newsUI_description_body";
      this.$postText.className = "newsUI_description_text";
      this.$postText.textContent = this.text;

      this._createPostDecorations();

      this.$postBody.appendChild(this.$postText);
      this.$postBody.appendChild(this.$postDecorations);
      this.$postItem.appendChild(this.$postBody);
      this.postList.appendChild(this.$postItem);
    });
  }

  _createPost(data) {
    this.data = data;
    this.dataLength = this.data.length;
    this.flag = document.createDocumentFragment();
    this.currentDate = this._getCurrentDate();
    this._cloneNewsUIContents();
    this.latestNewUIContents = [
      ...document.querySelectorAll(".js-newUIContents"),
    ];
    this.latestNewUIContents.splice(-1, 1);

    this.data.forEach((object, i) => {
      this._createPostImage(object, i);
      this.postList = this.latestNewUIContents[i].children[0];
      this._createPostDescription(object);
    });
  }

  _createErrorText(error) {
    this.newUIContents.classList.add('is-active');
    this.child = this.newUIContents.children[0];
    this.errorElement = document.createElement('p');
    this.errorElement.className = "newsUI_error";
    this.errorElement.textContent = error;
    this.child.appendChild(this.errorElement);
  }
}

class SwitchNews {
  constructor(e) {
    this.target = e.currentTarget;
    this.id = this.target.id;
    this.newUIContents = document.querySelectorAll(".js-newUIContents");
    this.currentNewsCategory = [...this.newUIContents].filter(($newUIContent) => {
      return $newUIContent.id === this.id;
    })[0];
    this._switchCurrentNewsTab();
  }

  _switchCurrentNewsTab() {
    [...this.newUIContents].forEach($newUIContent => {
      if ($newUIContent.classList.contains('is-active')) {
        $newUIContent.classList.remove('is-active');
      } else {
        return;
      }
    });
    if (this.target.checked) {
      this.currentNewsCategory.classList.add('is-active');
    }
  }
};