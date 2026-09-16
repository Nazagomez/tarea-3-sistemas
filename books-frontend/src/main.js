import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './css/normalize.css'
import './css/skeleton.css'
import BookList from './BookList.vue'
import BookDetail from './BookDetail.vue'

const routes = [
  { path: '/', component: BookList },
  { path: '/books', component: BookList },
  { path: '/books/:id', component: BookDetail, props: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

let app = createApp(App)
app.use(router)
app.mount('#app')
