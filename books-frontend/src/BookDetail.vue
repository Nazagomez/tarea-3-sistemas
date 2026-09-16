<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h4>{{book.title}}</h4>
      <h5>Book's details</h5>
      <form>
        <div class="row">
          <div class="six columns">
            <label for="idInput">ID</label>
            <input class="u-full-width" type="text" v-model="book.id" readonly>
          </div>
          <div class="six columns">
            <label for="copyrightInput">Copyright</label>
            <input class="u-full-width" type="text" v-model="book.copyright" readonly>
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="editionInput">Edition</label>
            <input class="u-full-width" type="text" v-model="book.edition" readonly>
          </div>
          <div class="six columns">
            <label for="languageInput">Language</label>
            <input class="u-full-width" type="text" v-model="book.language" readonly>
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="authorInput">Author</label>
            <a :href="authorLink">
              <input class="u-full-width" type="button" :value="book.author" readonly>
            </a>
          </div>
          <div class="six columns">
            <label for="publisherInput">Publisher</label>
            <a :href="publisherLink">
              <input class="u-full-width" type="button" :value="book.publisher" readonly>
            </a>
          </div>
        </div>
        <a class="button" :href="reviewsLink" style="margin-right: 10px">Reviews</a>
        <router-link class="button button-primary" style="margin-top: 20px" to="/books">Back</router-link>
      </form>
    </div>
  </div>
</template>
<script>
import { booksApi, authorsSite, publishersSite, reviewsSite } from './api.js'
import seedBooks from './seed.json'
export default {
  props: ['id'],
  data() {
    return {
      book: {'id':'','title':'','edition':'','copyright':'','language':'','author':'','author_id':'','publisher':'','publisher_id':''}
    }
  },
  computed: {
    authorLink() {
      return authorsSite + '#/authors/' + this.book.author_id
    },
    publisherLink() {
      return publishersSite + '#/publishers/' + this.book.publisher_id
    },
    reviewsLink() {
      return reviewsSite + '#/book/' + this.book.id
    }
  },
  created() {
    this.findBook(this.id)
  },
  methods: {
    findBook(id) {
      fetch(booksApi + '/api/books/' + id,
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((result) => {
          this.book = result && result.id ? result : seedBooks.find((item) => String(item.id) === String(id))
        })
        .catch(() => {
          this.book = seedBooks.find((item) => String(item.id) === String(id))
        })
    }
  }
}
</script>
