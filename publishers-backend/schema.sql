DROP TABLE IF EXISTS publishers;
CREATE TABLE publishers (
  id TEXT PRIMARY KEY,
  publisher TEXT,
  country TEXT,
  founded INTEGER,
  genere TEXT,
  books TEXT
);
INSERT INTO publishers (id, publisher, country, founded, genere, books) VALUES
('1', 'John Wiley & Sons', 'United States', 1807, 'Academic',
 '[{"book_id":1,"title":"Operating System Concepts"},{"book_id":2,"title":"Database System Concepts"}]'),
('2', 'Pearson Education', 'United Kingdom', 1844, 'Education',
 '[{"book_id":3,"title":"Computer Networks"},{"book_id":4,"title":"Modern Operating Systems"}]');
