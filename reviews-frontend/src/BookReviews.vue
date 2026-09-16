<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h3>Reviews for this book</h3>
      <ul>
        <li v-for="review in reviews" :key="review.id">
          <router-link :to="'/reviews/'+review.id">
            {{review.reviewer}} ({{review.rating}}/5): {{review.comment}}
          </router-link>
        </li>
      </ul>
      <a class="button" :href="bookLink" style="margin-right: 10px">Open book</a>
      <router-link class="button button-primary" to="/reviews">All reviews</router-link>
    </div>
  </div>
</template>
<script>
import { reviewsApi, booksSite } from './api.js'
import seedReviews from './seed.json'
export default {
  props: ['bookId'],
  data() {
    return {
      reviews: []
    }
  },
  computed: {
    bookLink() {
      return booksSite + '#/books/' + this.bookId
    }
  },
  methods: {
    findReviews() {
      fetch(reviewsApi + '/api/reviews/book/' + this.bookId,
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((result) => {
          this.reviews = Array.isArray(result) ? result : seedReviews.filter((item) => String(item.book_id) === String(this.bookId))
        })
        .catch(() => {
          this.reviews = seedReviews.filter((item) => String(item.book_id) === String(this.bookId))
        })
    }
  },
  mounted() {
    this.findReviews()
  }
}
</script>
