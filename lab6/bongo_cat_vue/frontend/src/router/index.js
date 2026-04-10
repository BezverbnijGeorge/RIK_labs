import { createRouter, createWebHistory } from 'vue-router'
import Cat from '../views/Cat.vue'
import CatGame from '../views/CatGame.vue'
import Statistics from '../views/Statistics.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', component: CatGame },
  { path: '/stats', component: Statistics },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
