DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  book_id TEXT,
  book_title TEXT,
  reviewer TEXT,
  rating INTEGER,
  comment TEXT
);
INSERT INTO reviews (id, book_id, book_title, reviewer, rating, comment) VALUES
('1', '1', 'Operating System Concepts', 'Maria Lopez', 5, 'A complete and classic textbook for operating systems.'),
('2', '1', 'Operating System Concepts', 'Carlos Ruiz', 4, 'Very complete, although a bit dense for beginners.'),
('3', '2', 'Database System Concepts', 'Ana Perez', 5, 'The classic reference for database systems.'),
('4', '3', 'Computer Networks', 'Luis Mora', 4, 'Clear explanations of computer networks and protocols.'),
('5', '4', 'Modern Operating Systems', 'Sofia Chen', 5, 'An excellent companion to Silberschatz for OS concepts.');
