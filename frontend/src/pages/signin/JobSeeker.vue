<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import { useSubmitState } from '@/composables/submitState'
import JobSeekerSignUpForm from '@/components/form/JobSeekerSign.vue'
import { signIn } from '@/api/JobSeeker'
import { useRouter } from 'vue-router'
import { useJobSeekerAuthStore } from '@/stores/auth'

const router = useRouter()
const { isSubmitting, startSubmitting, finishSubmitting, setValidationError } = useSubmitState()
const jobseekerAuth = useJobSeekerAuthStore()
async function onSubmit(formData: JobSeekerFormData) {
  startSubmitting()
  try {
    const res = await signIn({
      email: formData.email,
      password: formData.password,
    })
    jobseekerAuth.setCredentials(res.headers)
    router.push({ name: 'JobSeekerProfile' })
  } catch (error: any) {
    setValidationError(error.response.data.errors)
  } finally {
    finishSubmitting()
  }
}
</script>
<template>
  <Header></Header>
  <JobSeekerSignUpForm @submit="onSubmit" title="ログイン" :isSubmitting="isSubmitting"
    ><router-link :to="{ name: 'ForgotPassword' }"
      >パスワードを忘れた場合</router-link
    ></JobSeekerSignUpForm
  >
</template>
