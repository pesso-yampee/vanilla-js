const url = "https://myjson.dit.upm.es/api/bins/94hm";
const $newUIContents = document.querySelector('.js-newUIContents');

new CreateNewsPost(url, $newUIContents);

const newsTabs = document.querySelectorAll('input[name="newsCategory"]');

newsTabs.forEach(newsTab => {
  newsTab.addEventListener("change", (e) => {
    const target = e.currentTarget;
    filteringNewsContents(target);
  });
});

const filteringNewsContents = (target) => {
  const id = target.id;
  const newUIContents = document.querySelectorAll(".js-newUIContents");
  const currentNewsCategory = [...newUIContents].filter(($newUIContent) => {
    return $newUIContent.id === id;
  })[0];

  [...newUIContents].forEach(newUIContent => {
    if (newUIContent.classList.contains('is-active')) {
      newUIContent.classList.remove('is-active');
    } else {
      return;
    }
  });
  
  if (target.checked) {
    currentNewsCategory.classList.add('is-active');
  }
};