import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { authorsApi } from './api.js'
import seedAuthors from './seed.json'

export default function AuthorList() {
  const [authors, setAuthors] = useState([])
  useEffect(() => {
    fetch(authorsApi + '/api/authors', { headers: { Accept: 'application/json' } })
      .then((response) => response.json())
      .then((result) => setAuthors(Array.isArray(result) ? result : seedAuthors))
      .catch(() => setAuthors(seedAuthors))
  }, [])
  return (
    <div className="row">
      <div style={{ marginTop: '5%' }}>
        <h3>Authors Information</h3>
        This section presents information about the authors of books
        <ul>
          {authors.map((author) => (
            <li key={author.id}>
              <Link to={'/authors/' + author.id}>{author.author}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
