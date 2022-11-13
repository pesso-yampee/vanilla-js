"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const url = "/src/json/userData.json";
  const $userTable = document.querySelector(".js-userTable");
  const config = {
    childList: true,
  };
  const monitorCreatedUserTable = (mutationsList) => {
    // theadタグ要素とtbodyタグ要素が追加されたことにより、監視が2回発生している。
    // それにより、mutationsListの中に2つのRecordが追加されてる。
    // 1回目の監視の際に追加されたRecordにはtheadタグ要素に関する情報が入っているため、こちらは削除する。
    // 2回目の監視の際に追加されたRecordにはtbodyタグ要素に関する情報が入っているため、こちらのみを検証していく。
    mutationsList.splice(1, 1);

    mutationsList.forEach((mutation) => {
      const $table = mutation.target;
      const $tableHeadBlock = $table.children[0];
      const $tableBody = $tableHeadBlock.nextElementSibling;
      const $initialTableBody = $tableBody.cloneNode(true);
      const tableRow = $tableHeadBlock.childNodes[0];
      const $sortBtns = tableRow.querySelectorAll('.js-sortBtn');
      const handleSortUserTable = (e) => {
        const props = {
          event: e,
          tableBody: $tableBody,
          initialTableBody: $initialTableBody,
          dataSort: e.currentTarget.dataset.sort,
          ascendingClass: "ascending",
          descendingClass: "descending",
        };
        new SortUserTable(props);
      };

      [...$sortBtns].forEach(($sortBtn) => {
        $sortBtn.addEventListener("click", handleSortUserTable);
      });
    });
  };
  const userTableObserver = new MutationObserver(monitorCreatedUserTable);

  new CreateUserTable($userTable, url);

  userTableObserver.observe($userTable, config);
});
