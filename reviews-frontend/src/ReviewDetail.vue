<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h4>{{review.book_title}}</h4>
      <h5>Review details</h5>
      <form>
        <div class="row">
          <div class="six columns">
            <label>ID</label>
            <input class="u-full-width" type="text" v-model="review.id" readonly>
          </div>
          <div class="six columns">
            <label>Reviewer</label>
            <input class="u-full-width" type="text" v-model="review.reviewer" readonly>
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label>Rating</label>
            <input class="u-full-width" type="text" :value="review.rating + '/5'" readonly>
          </div>
          <div class="six columns">
            <label>Book</label>
            <a :href="bookLink">
              <input class="u-full-width" type="button" :value="review.book_title" readonly>
            </a>
          </div>
        </div>
        <div class="row">
          <div class="twelve columns">
            <label>Comment</label>
            <textarea class="u-full-width" v-model="review.comment" readonly></textarea>
          </div>
        </div>
        <router-link class="button button-primary" to="/reviews">Back</router-link>
      </form>
    </div>
  </div>
</template>
<script>
import { reviewsApi, booksSite } from './api.js'
import seedReviews from './seed.json'
export default {
  props: ['id'],
  data() {
    return {
      review: {'id':'','book_id':'','book_title':'','reviewer':'','rating':'','comment':''}
    }
  },
  computed: {
    bookLink() {
      return booksSite + '#/books/' + this.review.book_id
    }
  },
  created() {
    this.findReview(this.id)
  },
  methods: {
    findReview(id) {
      fetch(reviewsApi + '/api/reviews/' + id,
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((result) => {
          this.review = result && result.id ? result : seedReviews.find((item) => String(item.id) === String(id))
        })
        .catch(() => {
          this.review = seedReviews.find((item) => String(item.id) === String(id))
        })
    }
  }
}
</script>
