import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import SignUpJobSeeker from '@/pages/signup/JobSeeker.vue'
import Verified from '@/pages/signup/Verified.vue'
import EmailSent from '@/pages/signup/EmailSent.vue'

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
    {
      path: '/signup/verified',
      name: 'Verified',
      component: Verified,
    },
    {
      path: '/signup/email_sent',
      name: 'EmailSent',
      component: EmailSent,
    },
  ],
})

export default router
