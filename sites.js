const SITES = {
  home: './home.html',
  books: './books/',
  authors: './authors/',
  publishers: './publishers/',
  reviews: './reviews/'
};

function loadSite(url) {
  document.getElementById('content').src = url;
}

window.loadSite = loadSite;
