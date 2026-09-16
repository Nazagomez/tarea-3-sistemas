const { neon } = require('@neondatabase/serverless');

const seedBooks = [
  { id: '1', title: 'Operating System Concepts', edition: '9th', copyright: 2012, language: 'ENGLISH', pages: 976, author: 'Abraham Silberschatz', author_id: 1, publisher: 'John Wiley & Sons', publisher_id: 1 },
  { id: '2', title: 'Database System Concepts', edition: '6th', copyright: 2010, language: 'ENGLISH', pages: 1376, author: 'Abraham Silberschatz', author_id: 1, publisher: 'John Wiley & Sons', publisher_id: 1 },
  { id: '3', title: 'Computer Networks', edition: '5th', copyright: 2010, language: 'ENGLISH', pages: 960, author: 'Andrew S. Tanenbaum', author_id: 2, publisher: 'Pearson Education', publisher_id: 2 },
  { id: '4', title: 'Modern Operating Systems', edition: '4th', copyright: 2014, language: 'ENGLISH', pages: 1136, author: 'Andrew S. Tanenbaum', author_id: 2, publisher: 'Pearson Education', publisher_id: 2 }
];

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function json(data, statusCode = 200) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    body: data === undefined ? '' : JSON.stringify(data)
  };
}

function bookId(event) {
  const parts = event.path.split('/').filter(Boolean);
  const idx = parts.indexOf('books');
  return parts[idx + 1] || null;
}

function seedFind(id) {
  return seedBooks.find((book) => String(book.id) === String(id));
}

async function findBook(id) {
  if (!process.env.DATABASE_URL) {
    return seedFind(id);
  }
  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`SELECT * FROM books WHERE id = ${id}`;
  return rows[0];
}

async function listBooks() {
  if (!process.env.DATABASE_URL) {
    return seedBooks;
  }
  const sql = neon(process.env.DATABASE_URL);
  return sql`SELECT * FROM books ORDER BY id::integer`;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders(), body: '' };
  }
  const id = bookId(event);
  try {
    if (event.httpMethod === 'GET' && !id) {
      const rows = await listBooks();
      return json(rows);
    }
    if (event.httpMethod === 'GET' && id) {
      const book = await findBook(id);
      if (!book) return json({ error: 'Book not found' }, 404);
      return json(book);
    }
    return json({ error: 'Not found' }, 404);
  } catch (err) {
    return json({ error: 'Server error: ' + err.message }, 500);
  }
};
