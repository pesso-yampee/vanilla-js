"use strict";

class CreateUserTable {
  constructor($user_table, url) {
    this.user_table = $user_table;
    this.url = url;
    this._fetchData();
  }

  _requestServer() {
    return new Promise((resolve, reject) => {
      this.request = new XMLHttpRequest();
      this.request.open("GET", this.url, true);
      this.request.onload = () => {
        if (200 <= this.request.status && this.request.status < 300) {
          resolve(this.request);
          // setTimeout(() => {
          // }, 3000);
        } else {
          reject(new Error(this.request.statusText));
        }
      };
      this.request.onerror = () => {
        reject(new Error(this.request.statusText));
      };
      this.request.send();
    });
  }

  _fetchData() {
    this._requestServer()
      .then((value) => {
        this.json = JSON.parse(value.responseText);
        return this.json;
      })
      .then((data) => {
        this.suffledData = this._shuffleData(data.userData);
        this._createTableList(this.suffledData);
      })
      .catch(() => {
        console.log(new Error("サーバーがぶっ壊れています。"));
      });
  }

  _shuffleData(data) {
    this.cloneArray = [...data];

    this.result = this.cloneArray.reduce((_, current, index) => {
      this.random = Math.floor(Math.random() * (index + 1));
      this.cloneArray[index] = this.cloneArray[this.random];
      this.cloneArray[this.random] = current;
      return this.cloneArray;
    });

    return this.result;
  }

  _createTableList(userData) {
    this.userData = userData;
    this.thead = document.createElement("thead");
    this.thSortBtn = document.createElement("button");
    this.tbody = document.createElement("tbody");
    this.tr = document.createElement("tr");
    this.trFrag = document.createDocumentFragment();
    this.tdFrag = document.createDocumentFragment();
    this.thead.className = "user_table_headBlock";
    this.tr.className = "user_table_row";
    this.thSortBtn.className = "user_table_head_sortBtn";
    this.tbody.className = "user_table_body";

    for (let i = 0; i < this.userData.length - 1; i++) {
      const th = document.createElement("th");
      const thText = document.createElement("span");
      th.className = "user_table_head";
      thText.className = "user_table_head_text";

      if (i === 0) {
        thText.textContent = "ID";
      } else if (i === 1) {
        thText.textContent = "名前";
      } else if (i === 2) {
        thText.textContent = "性別";
      } else if (i === 3) {
        thText.textContent = "年齢";
      }

      if (i === 0) {
        th.appendChild(thText);
        th.appendChild(this.thSortBtn);
      } else {
        th.appendChild(thText);
      }

      this.trFrag.appendChild(th);
    }
    this.tr.appendChild(this.trFrag);
    this.thead.appendChild(this.tr);
    this.user_table.appendChild(this.thead);

    for (let i = 0; i < this.userData.length; i++) {
      const tr = document.createElement("tr");
      const id = document.createElement("td");
      const name = document.createElement("td");
      const sex = document.createElement("td");
      const age = document.createElement("td");

      tr.className = "user_table_row";
      id.className = "user_table_description";
      name.className = "user_table_description";
      sex.className = "user_table_description";
      age.className = "user_table_description";
      id.setAttribute("data-id", userData[i].id);
      age.setAttribute("data-age", userData[i].age);
      id.textContent = userData[i].id;
      name.textContent = userData[i].name;
      sex.textContent = userData[i].sex;
      age.textContent = userData[i].age;
      tr.appendChild(id);
      tr.appendChild(name);
      tr.appendChild(sex);
      tr.appendChild(age);

      this.tdFrag.appendChild(tr);
    }
    this.tbody.appendChild(this.tdFrag);
    this.user_table.appendChild(this.tbody);
  }
}

class HandleSortUserTable {
  constructor(e, tableBody, sortStatus, mutationCount) {
    this.event = e;
    this.tableBody = tableBody;
    this.sortStatus = sortStatus;
    this.mutationCount = mutationCount;
    this.ascendingClassName = this.sortStatus.ascending;
    this.descendingClassName = this.sortStatus.descending;
    this.CurrentTarget = this.event.currentTarget;
    this._switchAppearanceSortBtn();
  }

  _switchAppearanceSortBtn() {
    this.flag = 0;
    this.ascending = this.CurrentTarget.classList.contains(
      this.ascendingClassName
    );
    this.descending = this.CurrentTarget.classList.contains(
      this.descendingClassName
    );

    if (!this.descending && !this.ascending) {
      this.CurrentTarget.classList.add(this.ascendingClassName);
      this.flag = 1;
      this._sort(this.flag);
    } else if (this.ascending) {
      this.CurrentTarget.classList.remove(this.ascendingClassName);
      this.CurrentTarget.classList.add(this.descendingClassName);
      this.flag = 2;
      this._sort(this.flag);
    } else if (this.descending) {
      this.CurrentTarget.classList.remove(this.descendingClassName);
      this.flag = 0;
      this._sort(this.flag);
    }
  }

  _sort(flag) {
    this.children = this.tableBody.children;
    this.frag = document.createDocumentFragment();
    let initialChildren;
    
    if (this.mutationCount === 0) {
      initialChildren = this.children;
    }

    console.log(initialChildren);

    if (flag === 0) {
      [...initialChildren].forEach((child) => {
        this.frag.appendChild(child);
      });
    } else if (flag === 1) {
      this.sortedChildren = [...this.children].sort((prev, next) => {
        this.prevId = prev.childNodes[0].dataset.id;
        this.nextId = next.childNodes[0].dataset.id;
        return this.prevId - this.nextId;
      });
    } else if (flag === 2) {
      this.sortedChildren = [...this.children].sort((prev, next) => {
        this.prevId = prev.childNodes[0].dataset.id;
        this.nextId = next.childNodes[0].dataset.id;
        return this.nextId - this.prevId;
      });
    }

    if (flag != 0) {
      this.sortedChildren.forEach((element) => {
        this.frag.appendChild(element);
      });
    }
    
    this.tableBody.appendChild(this.frag);
  }
}

// クリックしたらユーザーテーブルの要素を取得する
// 取得した要素を配列に格納する
