<script setup lang="ts">
import Header from '@/components/Header.vue'
import JobSeekerSignUpForm from '@/components/form/JobSeekerSignUp.vue'
import { create } from '@/api/JobSeeker'
import { useRouter } from 'vue-router'

type SignUpFormData = {
  email: string
  password: string
}

const CONFIRM_SUCCESS_URL = 'http://localhost:3000/signup/verified'
const router = useRouter()

async function onSubmit(formData: SignUpFormData) {
  try {
    await create({
      email: formData.email,
      password: formData.password,
      confirm_success_url: CONFIRM_SUCCESS_URL,
    })
    console.log('a')
    router.push('/signup/email_sent')
  } catch {
    console.log('a')
  }
}
</script>
<template>
  <Header></Header>
  <JobSeekerSignUpForm @submit="onSubmit"></JobSeekerSignUpForm>
</template>
