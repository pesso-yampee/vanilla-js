const url = "https://myjson.dit.upm.es/api/bins/94hm";
const $newUIContents = document.querySelector('.js-newUIContents');
const newsTabs = document.querySelectorAll('input[name="newsCategory"]');

new CreateNewsPost(url, $newUIContents);

newsTabs.forEach(newsTab => {
  newsTab.addEventListener("change", (e) => {
    new SwitchNews(e);
  });
});