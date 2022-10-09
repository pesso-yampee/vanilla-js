"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const url = "https://myjson.dit.upm.es/api/bins/4ga2";
  const $userTable = document.querySelector(".js-userTable");
  const sortStatus = {
    asceding: "ascending",
    descending: "descending"
  }
  const config = {
    childList: true,
  };
  const monitorCreatedUserTable = (mutationsList) => {
    let mutationCount = 0;
    // theadタグ要素とtbodyタグ要素が追加されたことにより、監視が2回発生している。
    // それにより、mutationsListの中に2つのRecordが追加されてる。
    // 1回目の監視の際に追加されたRecordにはtheadタグ要素に関する情報が入っているため、こちらは削除する。
    // 2回目の監視の際に追加されたRecordにはtbodyタグ要素に関する情報が入っているため、こちらのみを検証していく。
    mutationsList.splice(1, 1);

    mutationsList.forEach((mutation) => {
      const $tableHeadBlock = mutation.addedNodes[0];
      const $tableBody = $tableHeadBlock.nextElementSibling;
      const tableRow = $tableHeadBlock.childNodes[0];
      const tableHead = tableRow.childNodes[0];
      const $sortBtn = tableHead.childNodes[1];
      
      $sortBtn.addEventListener("click", (e) => {
        new HandleSortUserTable(e, $tableBody, sortStatus, mutationCount);
        mutationCount++;
      });
    });
  };
  const observer = new MutationObserver(monitorCreatedUserTable);
  
  new CreateUserTable($userTable, url);

  observer.observe($userTable, config);
});
