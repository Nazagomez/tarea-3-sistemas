import { createClient } from '@libsql/client';

const seedPublishers = [
  {
    id: '1',
    publisher: 'John Wiley & Sons',
    country: 'United States',
    founded: 1807,
    genere: 'Academic',
    books: [
      { book_id: 1, title: 'Operating System Concepts' },
      { book_id: 2, title: 'Database System Concepts' }
    ]
  },
  {
    id: '2',
    publisher: 'Pearson Education',
    country: 'United Kingdom',
    founded: 1844,
    genere: 'Education',
    books: [
      { book_id: 3, title: 'Computer Networks' },
      { book_id: 4, title: 'Modern Operating Systems' }
    ]
  }
];

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function parsePublisher(row) {
  if (!row) return row;
  return { ...row, books: row.books ? JSON.parse(row.books) : [] };
}

function createDb() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    return null;
  }
  return createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
  });
}

async function findPublisher(id) {
  const client = createDb();
  if (!client) {
    return seedPublishers.find((item) => String(item.id) === String(id)) || null;
  }
  const result = await client.execute({
    sql: 'SELECT * FROM publishers WHERE id = ?',
    args: [id]
  });
  return parsePublisher(result.rows[0]);
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  const { id } = req.query;
  try {
    if (req.method === 'GET') {
      const publisher = await findPublisher(id);
      if (!publisher) return res.status(404).json({ error: 'Publisher not found' });
      return res.status(200).json(publisher);
    }
    return res.status(404).json({ error: 'Not found' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
