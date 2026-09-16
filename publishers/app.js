function parseRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/'
  const parts = hash.split('/').filter(Boolean)
  if (parts[0] === 'publishers' && parts[1]) {
    return { name: 'detail', id: parts[1] }
  }
  return { name: 'list' }
}

function render(html) {
  document.getElementById('app').innerHTML = html
}

function listView(publishers) {
  const items = publishers.map(function (publisher) {
    return '<li><a href="#/publishers/' + publisher.id + '">' + publisher.publisher + '</a></li>'
  }).join('')
  render(
    '<div class="row"><div style="margin-top: 5%">' +
    '<h3>Publishers Information</h3>' +
    'This section presents information about publishers' +
    '<ul>' + items + '</ul>' +
    '</div></div>'
  )
}

function detailView(publisher) {
  const books = (publisher.books || []).map(function (book) {
    return '<li><a href="' + booksSite + '#/books/' + book.book_id + '">' + book.title + '</a>' +
      ' — <a href="' + reviewsSite + '#/book/' + book.book_id + '">Reviews</a></li>'
  }).join('')
  render(
    '<div class="row"><div class="eleven column" style="margin-top: 5%">' +
    '<h4>' + publisher.publisher + '</h4>' +
    '<h5>Publisher\'s details</h5>' +
    '<form>' +
    '<div class="row">' +
    '<div class="six columns"><label>ID</label>' +
    '<input class="u-full-width" type="text" value="' + publisher.id + '" readonly></div>' +
    '<div class="six columns"><label>Country</label>' +
    '<input class="u-full-width" type="text" value="' + publisher.country + '" readonly></div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="six columns"><label>Founded</label>' +
    '<input class="u-full-width" type="text" value="' + publisher.founded + '" readonly></div>' +
    '<div class="six columns"><label>Genere</label>' +
    '<input class="u-full-width" type="text" value="' + publisher.genere + '" readonly></div>' +
    '</div>' +
    '</form>' +
    '<h5>Books</h5><ul>' + books + '</ul>' +
    '<a class="button button-primary" href="#/publishers">Back</a>' +
    '</div></div>'
  )
}

function loadSeed(thenList, thenDetail, id) {
  fetch('./seed.json')
    .then(function (response) { return response.json() })
    .then(function (seed) {
      if (id) {
        thenDetail(seed.find(function (item) { return String(item.id) === String(id) }))
        return
      }
      thenList(seed)
    })
}

function load() {
  const route = parseRoute()
  if (route.name === 'detail') {
    fetch(publishersApi + '/api/publishers/' + route.id, { headers: { Accept: 'application/json' } })
      .then(function (response) { return response.json() })
      .then(function (result) {
        if (result && result.id) {
          detailView(result)
          return
        }
        loadSeed(listView, detailView, route.id)
      })
      .catch(function () { loadSeed(listView, detailView, route.id) })
    return
  }
  fetch(publishersApi + '/api/publishers', { headers: { Accept: 'application/json' } })
    .then(function (response) { return response.json() })
    .then(function (result) {
      if (Array.isArray(result)) {
        listView(result)
        return
      }
      loadSeed(listView, detailView)
    })
    .catch(function () { loadSeed(listView, detailView) })
}

window.addEventListener('hashchange', load)
load()
