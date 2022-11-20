window.addEventListener('DOMContentLoaded', () => {
  const url = "/src/json/newsData.json";
  const $newUIContents = document.querySelector('.js-newUIContents');
  const newsTabs = document.querySelectorAll('input[name="newsCategory"]');
  
  new CreateNewsPost(url, $newUIContents);
  
  newsTabs.forEach(newsTab => {
    newsTab.addEventListener("change", (e) => {
      new SwitchNews(e);
    });
  });
});