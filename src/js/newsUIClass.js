class CreateNewsPost {
  constructor(postData, $newUIContents) {
    this.postData = postData;
    this.newUIContents = $newUIContents;
    this._requestServer();
    this._fetchPostData();
  }

  _requestServer() {
    this.promise = new Promise((resolve) => {
      resolve(this.postData);
    });
  }

  _fetchPostData() {
    this.promise
      .then((data) => {
        this._createPostItem(data);
      })
      .catch(() => {
        this.Error = new Error("サーバがぶっ壊れています。");
        // this._createErrorText(this.Error);
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

  _cloneNewsUIContents(lengh) {
    this.length = lengh;
    this.flag = document.createDocumentFragment();
    this.newUIContentsParent = this.newUIContents.parentNode;

    for (let i = 0; i < this.length; i++) {
      this.cloneContents = this.newUIContents.cloneNode(true);
      this.flag.appendChild(this.cloneContents);
    }

    this.newUIContentsParent.appendChild(this.flag);
  }

  _jadgeWithin3days(currentDate, postDate) {
    return currentDate - postDate;
  }

  _createPostImage(dataItem, index, latestNewUIContents) {
    this.imgSrc = dataItem.img.src;
    this.imgAlt = dataItem.img.alt;
    this.$postImageWrap = document.createElement("div");
    this.$postImage = document.createElement("img");
    this.$postImageWrap.className = "newsUI_description_imageWrap";
    this.$postImage.className = "newsUI_description_image";
    this.$postImage.src = "/assets/media/images/" + this.imgSrc;
    this.$postImage.alt = this.imgAlt;
    this.$postImageWrap.appendChild(this.$postImage);
    if (index === 0) {
      latestNewUIContents[0].classList.add('is-active');
    }
    
    latestNewUIContents[index].id = dataItem.category;
    latestNewUIContents[index].appendChild(this.$postImageWrap);
  }

  _createPostItem(data) {
    this.data = data;
    this.dataLength = this.data.length;
    this.flag = document.createDocumentFragment();
    this.currentDate = this._getCurrentDate();
    this._cloneNewsUIContents(this.dataLength);
    this.latestNewUIContents = [...document.querySelectorAll('.js-newUIContents')];
    this.latestNewUIContents.splice(-1, 1);
    
    this.data.forEach((dataItem, i) => {
      this._createPostImage(dataItem, i, this.latestNewUIContents);
      this.postList = this.latestNewUIContents[i].children[0];

      dataItem.posts.forEach((posts, i) => {
        this.category = posts.category;
        this.text = posts.text;
        this.date = Number(posts.date);
        this.comment = posts.comment;
        this.jadgeDate = this._jadgeWithin3days(this.currentDate, this.date);
        this.$postItem = document.createElement("li");
        this.$postBody = document.createElement("div");
        this.$postText = document.createElement("a");
        
        this.$postItem.className = "newsUI_description_item";
        this.$postBody.className = "newsUI_description_body";
        this.$postText.className = "newsUI_description_text";
        this.$postText.textContent = this.text;
        
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

        this.$postBody.appendChild(this.$postText);
        this.$postBody.appendChild(this.$postDecorations);
        this.$postItem.appendChild(this.$postBody);
        this.postList.appendChild(this.$postItem);
      });
    });
  }
  
  _createErrorText() {}
}