<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h3>Books Information</h3>
      This section presents information about books
      <ul>
        <li v-for="book in books" :key="book.id">
          <router-link :to="'/books/'+book.id">{{book.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { booksApi } from './api.js'
import seedBooks from './seed.json'
export default {
  data() {
    return {
      books: []
    }
  },
  methods: {
    allBooks() {
      fetch(booksApi + '/api/books',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((result) => {
          this.books = Array.isArray(result) ? result : seedBooks
        })
        .catch(() => {
          this.books = seedBooks
        })
    }
  },
  mounted() {
    this.allBooks()
  }
}
</script>
