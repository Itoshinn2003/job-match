<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import JobSeekerSignUpForm from '@/components/form/JobSeekerSign.vue'
import { signIn } from '@/api/JobSeeker'
import { useRouter } from 'vue-router'
import { useJobSeekerAuthStore } from '@/stores/auth'

const router = useRouter()
const isSubmitting = ref(false)
const validationError = ref('')
const jobseekerAuth = useJobSeekerAuthStore()
async function onSubmit(formData: JobSeekerFormData) {
  isSubmitting.value = true
  try {
    const res = await signIn({
      email: formData.email,
      password: formData.password,
    })
    jobseekerAuth.setCredentials(res.headers)
    router.push({ name: 'JobSeekerProfile', params: { id: '1' } })
  } catch (error: any) {
    validationError.value = error.response.data.errors
  } finally {
    isSubmitting.value = false
  }
}
</script>
<template>
  <Header></Header>
  <JobSeekerSignUpForm
    @submit="onSubmit"
    title="ログイン"
    :isSubmitting="isSubmitting"
    :validationError="validationError"
  ></JobSeekerSignUpForm>
</template>
