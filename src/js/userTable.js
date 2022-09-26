window.addEventListener('DOMContentLoaded', () => {
  const url = "https://myjson.dit.upm.es/api/bins/4ga2";
  const $userTableList = document.querySelector('.js-userTableList');
  
  new CreateUserTable($userTableList, url);
});