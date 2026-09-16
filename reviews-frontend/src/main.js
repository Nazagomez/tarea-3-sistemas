import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './css/normalize.css'
import './css/skeleton.css'
import ReviewList from './ReviewList.vue'
import ReviewDetail from './ReviewDetail.vue'
import BookReviews from './BookReviews.vue'

const routes = [
  { path: '/', component: ReviewList },
  { path: '/reviews', component: ReviewList },
  { path: '/reviews/:id', component: ReviewDetail, props: true },
  { path: '/book/:bookId', component: BookReviews, props: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

let app = createApp(App)
app.use(router)
app.mount('#app')
