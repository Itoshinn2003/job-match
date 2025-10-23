<script setup lang="ts">
import Header from '@/components/Header.vue'
import JobSeekerSignUpForm from '@/components/form/JobSeekerSignUp.vue'
import { create } from '@/api/JobSeeker'
import { useRouter } from 'vue-router'
import { endpoints } from '@/router/devise'

const router = useRouter()

async function onSubmit(formData: SignUpFormData) {
  try {
    await create({
      email: formData.email,
      password: formData.password,
      confirm_success_url: endpoints.CONFIRM_SUCCESS_URL,
    })
    router.push({ name: 'EmailSent', query: { email: formData.email } })
  } catch {
    console.log('a')
  }
}
</script>
<template>
  <Header></Header>
  <JobSeekerSignUpForm @submit="onSubmit"></JobSeekerSignUpForm>
</template>
