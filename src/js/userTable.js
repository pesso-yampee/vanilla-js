"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const url = "https://myjson.dit.upm.es/api/bins/4ga2";
  const $userTableList = document.querySelector(".js-userTableList");

  new CreateUserTable($userTableList, url);

  const config = {
    childList: true,
  };

  const callback = (mutationsList) => {
    mutationsList.forEach((mutation) => {
      const childrNodes = mutation.addedNodes;
      const $headingID = childrNodes[0];
      const $sortBtn = $headingID.children[1];
      
      $sortBtn.addEventListener("click", (e) => {
        new HandleSortUserTable(e);
      });
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe($userTableList, config);
});
