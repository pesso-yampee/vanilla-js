const postData = [
  {
    category: "news",
    posts: [
      {
        text: "山陽新幹線広島－博多間、19日始発から終日運休",
        date: "20220922",
        comment: 32,
      },
      {
        text: "鹿児島県出水市に緊急安全確保",
        date: "20220912",
        comment: 0,
      },
      {
        text: "台風 暴風になると身動き取れない",
        date: "20220916",
        comment: 10,
      },
    ],
    img: {
      src: "news_image01.jpg",
      alt: "news",
    },
  },
  {
    category: "economy",
    posts: [
      {
        text: "台風影響 鉄道&フライト情報",
        date: "20220922",
        comment: 4,
      },
      {
        text: "鹿児島など集配停止も 輸送に影響",
        date: "20220922",
        comment: 8,
      },
      {
        text: "コンビニ3社 一部店舗で計画休業",
        date: "20220916",
        comment: 12,
      },
    ],
    img: {
      src: "news_image02.jpg",
      alt: "economy",
    },
  },
  {
    category: "entertainment",
    posts: [
      {
        text: "「座王」快進撃 千原ジュニア語る",
        date: "20220917",
        comment: 0,
      },
      {
        text: "ハロプロレジェンド 再び動き活発",
        date: "20220922",
        comment: 8,
      },
      {
        text: "乃木坂46清宮レイ 一部活動を休止",
        date: "20220922",
        comment: 0,
      },
    ],
    img: {
      src: "news_image03.jpg",
      alt: "entertainment",
    },
  },
  {
    category: "sports",
    posts: [
      {
        text: "出場わずか15秒 中島翔哉が退場",
        date: "20220909",
        comment: 76,
      },
      {
        text: "岡崎ゴール 低空ダイビングヘッド",
        date: "20220917",
        comment: 10,
      },
      {
        text: "バド協会幹部 横領の隠ぺい主導か",
        date: "20220910",
        comment: 0,
      },
    ],
    img: {
      src: "news_image04.jpg",
      alt: "sports",
    },
  },
  {
    category: "domestic",
    posts: [
      {
        text: "台風14号の最新情報 備えや注意点",
        date: "20220918",
        comment: 130,
      },
      {
        text: "最強クラスの台風 上陸する恐れも",
        date: "20220911",
        comment: 0,
      },
      {
        text: "台風 暴風になると身動き取れない",
        date: "20220922",
        comment: 0,
      },
    ],
    img: {
      src: "news_image05.jpg",
      alt: "domestic",
    },
  },
];
const $newUIContents = document.querySelector('.js-newUIContents');

new CreateNewsPost(postData, $newUIContents);

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