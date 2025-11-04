import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import SignUpJobSeeker from '@/pages/signup/JobSeeker.vue'
import SignInJobSeeker from '@/pages/signin/JobSeeker.vue'
import Verified from '@/pages/signup/Verified.vue'
import EmailSent from '@/pages/signup/EmailSent.vue'
import JobSeekerProfile from '@/pages/jobseeker/Profile.vue'
import ForgotPassword from '@/pages/signin/JobSeekerForgotPassword.vue'
import ResetPassword from '@/pages/signin/JobSeekerResetPassword.vue'

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
    {
      path: '/signin/forgot_password',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/signin/reset_password',
      name: 'ResetPassword',
      component: ResetPassword,
    },
  ],
})

export default router
