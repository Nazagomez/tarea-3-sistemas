import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { authorsApi, booksSite, reviewsSite } from './api.js'
import seedAuthors from './seed.json'

export default function AuthorDetail() {
  const { id } = useParams()
  const [author, setAuthor] = useState({
    id: '',
    author: '',
    nationality: '',
    birth_year: '',
    fields: '',
    books: []
  })
  useEffect(() => {
    fetch(authorsApi + '/api/authors/' + id, { headers: { Accept: 'application/json' } })
      .then((response) => response.json())
      .then((result) => setAuthor(result && result.id ? result : seedAuthors.find((item) => String(item.id) === String(id))))
      .catch(() => setAuthor(seedAuthors.find((item) => String(item.id) === String(id))))
  }, [id])
  return (
    <div className="row">
      <div className="eleven column" style={{ marginTop: '5%' }}>
        <h4>{author.author}</h4>
        <h5>Author's details</h5>
        <form>
          <div className="row">
            <div className="six columns">
              <label>ID</label>
              <input className="u-full-width" type="text" value={author.id} readOnly />
            </div>
            <div className="six columns">
              <label>Nationality</label>
              <input className="u-full-width" type="text" value={author.nationality} readOnly />
            </div>
          </div>
          <div className="row">
            <div className="six columns">
              <label>Birth Year</label>
              <input className="u-full-width" type="text" value={author.birth_year} readOnly />
            </div>
            <div className="six columns">
              <label>Fields</label>
              <input className="u-full-width" type="text" value={author.fields} readOnly />
            </div>
          </div>
        </form>
        <h5>Books</h5>
        <ul>
          {(author.books || []).map((book) => (
            <li key={book.book_id}>
              <a href={booksSite + '#/books/' + book.book_id}>{book.title}</a>
              {' — '}
              <a href={reviewsSite + '#/book/' + book.book_id}>Reviews</a>
            </li>
          ))}
        </ul>
        <Link className="button button-primary" to="/authors">Back</Link>
      </div>
    </div>
  )
}
