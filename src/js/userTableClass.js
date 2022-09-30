"use strict";

class CreateUserTable {
  constructor($userTableList, url) {
    this.userTableList = $userTableList;
    this.url = url;
    this._fetchData();
  }

  _requestServer() {
    return new Promise((resolve, reject) => {
      this.request = new XMLHttpRequest();
      this.request.open("GET", this.url, true);
      this.request.onload = () => {
        if (200 <= this.request.status && this.request.status < 300) {
          setTimeout(() => {
            resolve(this.request);
          }, 3000);
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
    this.frag = document.createDocumentFragment();
    this.ID = document.createElement("dt");
    this.IDText = document.createElement("span");
    this.IDSortBtn = document.createElement("button");
    this.name = document.createElement("dd");
    this.sex = document.createElement("dd");
    this.age = document.createElement("dd");
    this.ID.className = "userTable_term heading";
    this.IDText.className = "userTable_term_text";
    this.IDSortBtn.className = "userTable_term_sortBtn";
    this.name.className = "userTable_description heading";
    this.sex.className = "userTable_description heading";
    this.age.className = "userTable_description heading";
    this.IDText.textContent = "ID";
    this.name.textContent = "名前";
    this.sex.textContent = "性別";
    this.age.textContent = "年齢";
    this.ID.appendChild(this.IDText);
    this.ID.appendChild(this.IDSortBtn);
    this.frag.appendChild(this.ID);
    this.frag.appendChild(this.name);
    this.frag.appendChild(this.sex);
    this.frag.appendChild(this.age);

    for (let i = 0; i < this.userData.length; i++) {
      const id = document.createElement("dt");
      const name = document.createElement("dd");
      const sex = document.createElement("dd");
      const age = document.createElement("dd");
      
      id.className = "userTable_term";
      name.className = "userTable_description";
      sex.className = "userTable_description";
      age.className = "userTable_description";
      id.textContent =  userData[i].id;
      name.textContent = userData[i].name;
      sex.textContent = userData[i].sex;
      age.textContent = userData[i].age;
      this.frag.appendChild(id);
      this.frag.appendChild(name);
      this.frag.appendChild(sex);
      this.frag.appendChild(age);
    }

    this.userTableList.appendChild(this.frag);
  }
}

class HandleSortUserTable {
  constructor(e) {
    this.event = e;
    this.CurrentTarget = this.event.currentTarget;
    this._switchAppearanceSortBtn();
  }
  
  _switchAppearanceSortBtn() {
    this.ascending = this.CurrentTarget.classList.contains('ascending');
    this.descending = this.CurrentTarget.classList.contains('descending');
    
    if (!this.descending && !this.ascending) {
      this.CurrentTarget.classList.add("ascending");
    } else if (this.ascending) {
      this.CurrentTarget.classList.remove("ascending");
      this.CurrentTarget.classList.add("descending");
    } else if (this.descending) {
      this.CurrentTarget.classList.remove("descending");
    }
  }
}
