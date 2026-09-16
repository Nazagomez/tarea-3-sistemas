const BASE = '/api/reviews';

const seedReviews = [
  { id: '1', book_id: '1', book_title: 'Operating System Concepts', reviewer: 'Maria Lopez', rating: 5, comment: 'A complete and classic textbook for operating systems.' },
  { id: '2', book_id: '1', book_title: 'Operating System Concepts', reviewer: 'Carlos Ruiz', rating: 4, comment: 'Very complete, although a bit dense for beginners.' },
  { id: '3', book_id: '2', book_title: 'Database System Concepts', reviewer: 'Ana Perez', rating: 5, comment: 'The classic reference for database systems.' },
  { id: '4', book_id: '3', book_title: 'Computer Networks', reviewer: 'Luis Mora', rating: 4, comment: 'Clear explanations of computer networks and protocols.' },
  { id: '5', book_id: '4', book_title: 'Modern Operating Systems', reviewer: 'Sofia Chen', rating: 5, comment: 'An excellent companion to Silberschatz for OS concepts.' }
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

function parsePath(pathname) {
  const rest = pathname.slice(BASE.length).replace(/^\/+/, '');
  if (!rest) return { id: null, bookId: null };
  const parts = rest.split('/').filter(Boolean);
  if (parts[0] === 'book' && parts[1]) return { id: null, bookId: parts[1] };
  return { id: parts[0], bookId: null };
}

function seedList(bookId) {
  if (!bookId) return seedReviews;
  return seedReviews.filter((review) => String(review.book_id) === String(bookId));
}

async function listReviews(db, bookId) {
  if (!db) return seedList(bookId);
  if (bookId) {
    const { results } = await db.prepare('SELECT * FROM reviews WHERE book_id = ?').bind(bookId).all();
    return results;
  }
  const { results } = await db.prepare('SELECT * FROM reviews').all();
  return results;
}

async function findReview(db, id) {
  if (!db) return seedReviews.find((review) => String(review.id) === String(id)) || null;
  return db.prepare('SELECT * FROM reviews WHERE id = ?').bind(id).first();
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
    const { id, bookId } = parsePath(pathname);
    const db = env && env.DB;
    try {
      if (request.method === 'GET' && bookId) {
        return json(await listReviews(db, bookId));
      }
      if (request.method === 'GET' && !id) {
        return json(await listReviews(db));
      }
      if (request.method === 'GET' && id) {
        const review = await findReview(db, id);
        if (!review) return json({ error: 'Review not found' }, 404);
        return json(review);
      }
      return new Response('Not found', { status: 404, headers: corsHeaders() });
    } catch (err) {
      if (bookId) return json(seedList(bookId));
      if (!id) return json(seedReviews);
      const review = seedReviews.find((item) => String(item.id) === String(id));
      if (!review) return json({ error: 'Review not found' }, 404);
      return json(review);
    }
  }
};
