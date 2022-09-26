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
        let userData = data.userData;

        userData = this._shuffleData(userData);
        this._createList(userData);
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

  _createList(userData) {
    this.userDataLength = userData.length;
    this.parent = this.userTableList.parentNode;
    this.frag = document.createDocumentFragment();
    this.fragDd = document.createDocumentFragment();
    this.dt = document.createElement("dt");
    this.dt.className = "userTable_term";
    this.objectKeys = Object.keys(userData[1]);
    this.objectLength = this.objectKeys.length;

    for (let i = 0; i < this.objectLength - 1; i++) {
      this.dd = document.createElement("dd");
      this.dd.className = "userTable_description";
      this.fragDd.appendChild(this.dd);
    }

    this.userTableList.appendChild(this.dt);
    this.userTableList.appendChild(this.fragDd);

    for (let i = 0; i < this.userDataLength; i++) {
      this.cloneNode = this.userTableList.cloneNode(true);
      this.userID = userData[i].id;
      this.userName = userData[i].name;
      this.userSex = userData[i].sex;
      this.userAge = userData[i].age;
      this.cloneDt = this.cloneNode.querySelector("dt");
      this.cloneDds = [...this.cloneNode.querySelectorAll("dd")];
      this.cloneDt.textContent = this.userID;
      this.cloneDds[0].textContent = this.userName;
      this.cloneDds[1].textContent = this.userSex;
      this.cloneDds[2].textContent = this.userAge;
      this.frag.appendChild(this.cloneNode);
    }

    this.dt = this.userTableList.querySelector("dt");
    this.dds = [...this.userTableList.querySelectorAll("dd")];
    this.dt.textContent = "ID";
    this.dds[0].textContent = "名前";
    this.dds[1].textContent = "性別";
    this.dds[2].textContent = "年齢";
    this.userTableList.classList.add("heading");
    this.parent.appendChild(this.frag);
  }
}
