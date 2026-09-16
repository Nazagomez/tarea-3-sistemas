<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h3>Reviews Information</h3>
      This section presents reader reviews of books
      <ul>
        <li v-for="review in reviews" :key="review.id">
          <router-link :to="'/reviews/'+review.id">
            {{review.book_title}} — {{review.reviewer}} ({{review.rating}}/5)
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { reviewsApi } from './api.js'
import seedReviews from './seed.json'
export default {
  data() {
    return {
      reviews: []
    }
  },
  methods: {
    allReviews() {
      fetch(reviewsApi + '/api/reviews',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((result) => {
          this.reviews = Array.isArray(result) ? result : seedReviews
        })
        .catch(() => {
          this.reviews = seedReviews
        })
    }
  },
  mounted() {
    this.allReviews()
  }
}
</script>
