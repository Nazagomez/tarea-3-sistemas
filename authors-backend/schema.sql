DROP TABLE IF EXISTS authors;
CREATE TABLE authors (
  id TEXT PRIMARY KEY,
  author TEXT,
  nationality TEXT,
  birth_year INTEGER,
  fields TEXT,
  books TEXT
);
INSERT INTO authors (id, author, nationality, birth_year, fields, books) VALUES
('1', 'Abraham Silberschatz', 'Israelis / American', 1952, 'Database Systems, Operating Systems',
 '[{"book_id":1,"title":"Operating System Concepts"},{"book_id":2,"title":"Database System Concepts"}]'),
('2', 'Andrew S. Tanenbaum', 'Dutch / American', 1944, 'Distributed computing, Operating Systems',
 '[{"book_id":3,"title":"Computer Networks"},{"book_id":4,"title":"Modern Operating Systems"}]');
