import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import SignUpJobSeeker from '@/pages/signup/JobSeeker.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/signup/job_seeker',
      name: 'SignUpJobSeeker',
      component: SignUpJobSeeker,
    },
  ],
})

export default router
