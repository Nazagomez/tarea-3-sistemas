const BASE = '/api/authors';

const seedAuthors = [
  {
    id: '1',
    author: 'Abraham Silberschatz',
    nationality: 'Israelis / American',
    birth_year: 1952,
    fields: 'Database Systems, Operating Systems',
    books: [
      { book_id: 1, title: 'Operating System Concepts' },
      { book_id: 2, title: 'Database System Concepts' }
    ]
  },
  {
    id: '2',
    author: 'Andrew S. Tanenbaum',
    nationality: 'Dutch / American',
    birth_year: 1944,
    fields: 'Distributed computing, Operating Systems',
    books: [
      { book_id: 3, title: 'Computer Networks' },
      { book_id: 4, title: 'Modern Operating Systems' }
    ]
  }
];

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function json(data, status = 200) {
  return new Response(data === undefined ? null : JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() }
  });
}

function parseAuthor(row) {
  if (!row) return row;
  return { ...row, books: row.books ? JSON.parse(row.books) : [] };
}

async function findAuthor(db, id) {
  if (!db) {
    return seedAuthors.find((author) => String(author.id) === String(id)) || null;
  }
  const row = await db.prepare('SELECT * FROM authors WHERE id = ?').bind(id).first();
  return parseAuthor(row);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }
    if (!pathname.startsWith(BASE)) {
      return new Response('Not found', { status: 404, headers: corsHeaders() });
    }
    const id = pathname.slice(BASE.length).replace(/^\/+/, '') || null;
    const db = env && env.DB;
    try {
      if (request.method === 'GET' && !id) {
        if (!db) return json(seedAuthors);
        const { results } = await db.prepare('SELECT * FROM authors').all();
        return json(results.map(parseAuthor));
      }
      if (request.method === 'GET' && id) {
        const author = await findAuthor(db, id);
        if (!author) return new Response('Author not found', { status: 404, headers: corsHeaders() });
        return json(author);
      }
      return new Response('Not found', { status: 404, headers: corsHeaders() });
    } catch (err) {
      if (!db) {
        if (!id) return json(seedAuthors);
        const author = seedAuthors.find((item) => String(item.id) === String(id));
        if (!author) return new Response('Author not found', { status: 404, headers: corsHeaders() });
        return json(author);
      }
      return new Response('Server error: ' + err.message, { status: 500, headers: corsHeaders() });
    }
  }
};
