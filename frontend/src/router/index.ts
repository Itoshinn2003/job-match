import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import SignUpJobSeeker from '@/pages/signup/JobSeeker.vue'
import SignInJobSeeker from '@/pages/signin/JobSeeker.vue'
import Verified from '@/pages/signup/Verified.vue'
import EmailSent from '@/pages/signup/EmailSent.vue'
import JobSeekerProfile from '@/pages/jobseeker/Profile.vue'

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
      path: '/signin/job_seeker',
      name: 'SignInJobSeeker',
      component: SignInJobSeeker,
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
    {
      path: '/jobseeker/profile/:id',
      name: 'JobSeekerProfile',
      component: JobSeekerProfile,
    },
  ],
})

export default router
