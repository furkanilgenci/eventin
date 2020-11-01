import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import Events from '../views/events/index.vue'
import CreateEvent from '../views/events/create.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
  },
  {
    path: '/events/create',
    name: 'Create Event',
    component: CreateEvent,
  },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  mode: 'history',
  scrollBehavior() {
    window.scrollTo(0, 0);
    return { x: 0, y: 0 }
  },
})

export default router
