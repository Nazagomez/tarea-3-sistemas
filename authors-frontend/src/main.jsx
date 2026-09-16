import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './css/normalize.css'
import './css/skeleton.css'
import AuthorList from './AuthorList.jsx'
import AuthorDetail from './AuthorDetail.jsx'

function App() {
  return (
    <div id="app" className="container">
      <Routes>
        <Route path="/" element={<AuthorList />} />
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/authors/:id" element={<AuthorDetail />} />
      </Routes>
    </div>
  )
}

createRoot(document.getElementById('app')).render(
  <HashRouter>
    <App />
  </HashRouter>
)
