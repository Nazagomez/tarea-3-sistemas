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

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  try {
    if (req.method === 'GET') {
      const client = createDb();
      if (!client) return res.status(200).json(seedPublishers);
      const result = await client.execute('SELECT * FROM publishers');
      return res.status(200).json(result.rows.map(parsePublisher));
    }
    return res.status(404).json({ error: 'Not found' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
